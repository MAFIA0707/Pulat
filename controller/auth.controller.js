const { hashSync, compareSync } = require("bcrypt");
const db = require("../config/db.config");
const { sign } = require("jsonwebtoken");
const env = require("../config/env.config");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  try {
    const { email, password, name, phone } = req.body;
    const [[user]] = await db.query("SELECT * FROM users WHERE email=?", [
      email,
    ]);
    if (user) {
      const error = new Error(`This user exists:${email}`);
      error.status = 406;
      throw error;
    }

    const hashedPassword = hashSync(password, 1);
    const obyektObj = {
      email,
      hashed_password: hashedPassword,
      name,
      phone,
      role: "user",
    };

    const [{ insertId }] = await db.query("INSERT INTO users SET ?", obyektObj);
    const accessToken = sign(
      { id: insertId, role: "user" },
      env.ACCESS_TOKEN_SECRETS,
      { expiresIn: "1d" }
    );
    const refreshToken = sign(
      { id: insertId, role: "user" },
      env.REFRESH_TOKEN_SECRETS,
      { expiresIn: "2d" }
    );
    res.json({ refreshToken, accessToken });
  } catch (error) {
    console.error(error.message);
    res
      .status(error.status || 500)
      .json({ error: "user not create: " + error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("email and password have to show");
      error.status = 400;
      throw error;
    }

    const [[user]] = await db.query("SELECT * FROM users WHERE email=?", email);
    if (!user) {
      const error = new Error(`This  ${email} user with email not found`);
      error.status = 404;
      throw error;
    }

    const isRightPassword = compareSync(password, user.hashed_password);
    if (!isRightPassword) {
      const error = new Error(`email or password mistakes`);
      error.status = 400;
      throw error;
    }

    const accesToken = sign(
      { id: user.id, role: user.role },
      env.ACCESS_TOKEN_SECRETS,
      { expiresIn: "1d" }
    );
    const refreshToken = sign(
      { id: user.id, role: user.role },
      env.REFRESH_TOKEN_SECRETS,
      { expiresIn: "2d" }
    );
    const hashedRefreshToken = hashSync(refreshToken, 1);
    await db.query("UPDATE users SET hashed_token=? WHERE id=?", [
      hashedRefreshToken,
      user.id,
    ]);
    res.json({ refreshToken, accesToken });
  } catch (error) {
    res.send({ error: error.message });
  }
}

async function refresh(req, res) {
  try {
    const { refreshToken: refreshTokenClinet } = req.body;
    if (!refreshTokenClinet) {
      const error = new Error("refresh token must be write");
      error.status = 404;
      throw error;
    }

    const blockedToken = jwt.verify(
      refreshTokenClinet,
      env.REFRESH_TOKEN_SECRETS
    );
    const { id, role } = blockedToken;
    const [[user]] = await db.query("SELECT * FROM users WHERE id=? ", id);
    const sameToken = compareSync(refreshTokenClinet, user.hashed_token);
    if (!sameToken) {
      const error = new Error("invalid Jwt");
      error.status = 400;
      throw error;
    }

    const accesToken = sign(
      { id: user.id, role: user.role },
      env.ACCESS_TOKEN_SECRETS,
      { expiresIn: "1d" }
    );
    const refreshToken = sign(
      { id: user.id, role: user.role },
      env.ACCESS_TOKEN_SECRETS,
      { expiresIn: "2d" }
    );
    res.json({ refreshToken, accesToken });
    hashedRefreshToken = hashSync(refreshToken, 1);
    db.query("UPDATE users SET hashed_token=? WHERE id=?", [
      hashedRefreshToken,
      id,
    ]);
  } catch (error) {
    console.log(error);
    res.json({ error: "error confirmed:" + error.message });
  }
}

async function logout(req, res, next) {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
}

module.exports = {
  register,
  refresh,
  login,
  logout,
};
