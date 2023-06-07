-- Testing help
DROP DATABASE IF EXISTS mydatabase;

-- Create the database
CREATE DATABASE mydatabase;

-- Connect to the database
\c mydatabase;

-- Create the products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    descr VARCHAR(255) NOT NULL
);

-- Insert sample products into table
INSERT INTO products (title, price, descr)
VALUES
    ('GTX 9080 Ti', 150.00, 'absolute unit of a card. in box. never used, only for mining crypto.'),
    ('CRT TV Cars Edition', 75.00, 'great for emulating games and playing your retro roms. shhhhh!'),
    ('X1 Carbon ThinkPad', 90.00, 'refurbished, clean, fast - brand new never used!');