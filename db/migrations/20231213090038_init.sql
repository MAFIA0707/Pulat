-- migrate:up

CREATE TABLE users (
  id integer PRIMARY KEY AUTO_INCREMENT,
  role ENUM ('admin', 'user', 'deliver', 'moderator'),
  email varchar(255) UNIQUE,
  hashed_password varchar(255),
  hashed_token varchar(255),
  name varchar(255),
  phone varchar(255),
  created_at datetime DEFAULT NOW(),
  updated_at datetime DEFAULT NOW()
);

CREATE TABLE products (
  id integer PRIMARY KEY AUTO_INCREMENT,
  created_at datetime DEFAULT NOW(),
  updated_at datetime DEFAULT NOW(),
  name_uz varchar(255),
  name_ru varchar(255),
  desc_short_uz varchar(255),
  desc_short_ru varchar(255),
  desc_uz text,
  desc_ru text,
  images text,
  view_count integer,
  orders_count integer,
  discount_in_percent float,
  price integer,
  remaining_count integer
);

CREATE TABLE categories (
  id integer PRIMARY KEY AUTO_INCREMENT,
  created_at datetime DEFAULT NOW(),
  updated_at datetime DEFAULT NOW(),
  name_uz varchar(255),
  name_ru varchar(255),
  desc_short_uz varchar(255),
  desc_short_ru varchar(255),
  images varchar(255),
  view_count integer,
  parent_id integer
);

CREATE TABLE favorites (
  id integer PRIMARY KEY AUTO_INCREMENT,
  user_id integer,
  product_id integer
);

CREATE TABLE carts (
  id integer PRIMARY KEY AUTO_INCREMENT,
  user_id integer,
  product_id integer,
  count integer
);

CREATE TABLE events (
  id integer PRIMARY KEY AUTO_INCREMENT,
  created_at datetime DEFAULT NOW(),
  updated_at datetime DEFAULT NOW(),
  name varchar(255)
);

CREATE TABLE reviews (
  id integer PRIMARY KEY AUTO_INCREMENT,
  created_at datetime DEFAULT NOW(),
  updated_at datetime DEFAULT NOW(),
  user_id integer,
  content text,
  image text,
  product_id integer,
  rating integer,
  answer_to integer
);

CREATE TABLE addresses (
  id integer PRIMARY KEY AUTO_INCREMENT,
  created_at datetime DEFAULT NOW(),
  updated_at datetime DEFAULT NOW(),
  region varchar(255),
  city varchar(255),
  street varchar(255),
  house varchar(255),
  room varchar(255),
  name varchar(255),
  user_id integer
);

CREATE TABLE attributes (
  id integer PRIMARY KEY AUTO_INCREMENT,
  created_at datetime DEFAULT NOW(),
  updated_at datetime DEFAULT NOW(),
  name_uz varchar(255),
  name_ru varchar(255)
);

CREATE TABLE attribute_value (
  id integer PRIMARY KEY AUTO_INCREMENT,
  created_at datetime DEFAULT NOW(),
  updated_at datetime DEFAULT NOW(),
  name_uz varchar(255),
  name_ru varchar(255),
  attribute_id integer
);

CREATE TABLE orders (
  id integer PRIMARY KEY AUTO_INCREMENT,
  created_at datetime DEFAULT NOW(),
  updated_at datetime DEFAULT NOW(),
  address_id integer,
  user_id integer,
  product_id integer,
  status ENUM('packing', 'on_the_way', 'finished'),
  count integer,
  delivery_id integer
);

CREATE TABLE delivery (
  id integer PRIMARY KEY AUTO_INCREMENT,
  created_at datetime DEFAULT NOW(),
  updated_at datetime DEFAULT NOW(),
  deliver_id integer,
  note varchar(255),
  delivery_fee integer
);

CREATE TABLE categories_products (
  categories_id integer,
  products_id integer,
  PRIMARY KEY (categories_id, products_id)
);

ALTER TABLE categories_products ADD FOREIGN KEY (categories_id) REFERENCES categories (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE categories_products ADD FOREIGN KEY (products_id) REFERENCES products (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE categories ADD FOREIGN KEY (parent_id) REFERENCES categories (id) ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE favorites ADD FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE favorites ADD FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE carts ADD FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE carts ADD FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE products_events (
  products_id integer,
  events_id integer,
  PRIMARY KEY (products_id, events_id)
);

ALTER TABLE products_events ADD FOREIGN KEY (products_id) REFERENCES products (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE products_events ADD FOREIGN KEY (events_id) REFERENCES events (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE reviews ADD FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE reviews ADD FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE SET NULL ON UPDATE CASCADE; 

ALTER TABLE reviews ADD FOREIGN KEY (answer_to) REFERENCES reviews (id) ON DELETE ON UPDATE CASCADE;

ALTER TABLE addresses ADD FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE;

CREATE TABLE categories_attributes (
  categories_id integer,
  attributes_id integer,
  PRIMARY KEY (categories_id, attributes_id)
);

ALTER TABLE categories_attributes ADD FOREIGN KEY (categories_id) REFERENCES categories (id) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE categories_attributes ADD FOREIGN KEY (attributes_id) REFERENCES attributes (id) ON DELETE CASCADE ON UPDATE CASCADE;


CREATE TABLE products_attribute_value (
  products_id integer,
  attribute_value_id integer,
  PRIMARY KEY (products_id, attribute_value_id)
);

ALTER TABLE products_attribute_value ADD FOREIGN KEY (products_id) REFERENCES products (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE products_attribute_value ADD FOREIGN KEY (attribute_value_id) REFERENCES attribute_value (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE attribute_value ADD FOREIGN KEY (attribute_id) REFERENCES attributes (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE orders ADD FOREIGN KEY (address_id) REFERENCES addresses (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE;
                                                                         
ALTER TABLE orders ADD FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE orders ADD FOREIGN KEY (delivery_id) REFERENCES delivery (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE delivery ADD FOREIGN KEY (deliver_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CAS;

-- migrate:down

DROP DATABASE ecommerce 
 