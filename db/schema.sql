DROP DATABASE IF EXISTS clearair_db;
CREATE DATABASE clearair_db;
USE clearair_db;

CREATE TABLE locations
(
    id int(5) NOT NULL auto_increment,
    PRIMARY KEY (id),
    location_name varchar(40)
);

CREATE TABLE users
(
	id int NOT NULL auto_increment,
	email varchar(50) NOT NULL,
    first_name varchar(40),
    last_name varchar(40),
    password_hash varchar(255),
    salt varchar(255),
    home_id int(5),
    work_id int(5),
    school_id int(5),
    PRIMARY KEY (id),
    UNIQUE KEY (email),
    KEY (home_id),
    KEY (work_id),
    KEY (school_id),
    FOREIGN KEY (home_id) REFERENCES locations (id),
    FOREIGN KEY (work_id) REFERENCES locations (id),
    FOREIGN KEY (school_id) REFERENCES locations (id)
);