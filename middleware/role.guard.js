
function roleGuard(...roles){
        return function(req, res, next) {
          if (!req.user.role  || !roles.includes(req.user.role)) {
            return res.status(403).send("ruxsat berilmadi.");
          }
      
          next();
        };
      };


module.exports = roleGuard

