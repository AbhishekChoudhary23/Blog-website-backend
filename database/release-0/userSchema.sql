use demo1;

CREATE TABLE users (
    id VARCHAR(40) PRIMARY KEY DEFAULT (UUID()),
    user_id varchar(15) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_no int NOT NULL UNIQUE,
    created_at timestamp NOT NULL default current_timestamp,
    deleted_at timestamp default null,
    is_archived bool default false,
    role ENUM('ADMIN', 'VIEWER') NOT NULL,
    password varchar(255) not null
);

select * from users;

drop table users;