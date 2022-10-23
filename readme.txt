CREATE TABLE users (
id VARCHAR NOT NULL PRIMARY KEY,
email VARCHAR NOT NULL,
password VARCHAR NOT NULL,
gender VARCHAR,
phone VARCHAR,
date_of_birth DATE,
picture TEXT,
created_at TIMESTAMP,
updated_at TIMESTAMP
);
