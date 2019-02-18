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
    home_id int(5),
    work_id int(5),
    school_id int(5),
    isAdmin boolean not null default 0,
    PRIMARY KEY (id),
    UNIQUE KEY (email),
    KEY (home_id),
    KEY (work_id),
    KEY (school_id),
    FOREIGN KEY (home_id) REFERENCES locations (id),
    FOREIGN KEY (work_id) REFERENCES locations (id),
    FOREIGN KEY (school_id) REFERENCES locations (id)
);


CREATE TABLE activities
(
	id int NOT NULL auto_increment,
    act_name varchar(50),
    act_desc varchar(1000),
    act_href varchar(150),
    act_img_href varchar(300),
    jan_avail boolean not null default 0,
    feb_avail boolean not null default 0,
    mar_avail boolean not null default 0,
    apr_avail boolean not null default 0,
    may_avail boolean not null default 0,
    jun_avail boolean not null default 0,
    jul_avail boolean not null default 0,
    aug_avail boolean not null default 0,
    sep_avail boolean not null default 0,
    oct_avail boolean not null default 0,
    nov_avail boolean not null default 0,
    dec_avail boolean not null default 0,
    latitude DECIMAL(7,4),
    longitude DECIMAL(7,4),
    smog_county int(5),
    PRIMARY KEY (id),
    KEY (smog_county),
    FOREIGN KEY (smog_county) REFERENCES locations (id)
);