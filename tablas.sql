CREATE TABLE users
(
    id int AUTO_INCREMENT not null,
    email varchar(50) not null,
    passowrd varchar(60) not null,
    fullname varchar(50) not null,
    PRIMARY KEY (id)
)
create table posts
(
    id int AUTO_INCREMENT not null,
    id_user int not null,
    post mediumtext not null,
    create_at timestamp DEFAULT CURRENT_TIMESTAMP,
   
    PRIMARY KEY (id),
    FOREIGN KEY (id_user) REFERENCES users (id)
)