INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_MODERATOR');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');

INSERT INTO categories(name) VALUES('CATEGORY_HRANA');
INSERT INTO categories(name) VALUES('CATEGORY_ALKOHOLNA_PICA');
INSERT INTO categories(name) VALUES('CATEGORY_BEZALKOHOLNA_PICA');
INSERT INTO categories(name) VALUES('CATEGORY_TOPLI_NAPITCI');


INSERT INTO items(categories_id,name,price) VALUES(1,'tost',9.99);
INSERT INTO items(categories_id,name,price) VALUES(1,'sladoled',12.99);
INSERT INTO items(categories_id,name,price) VALUES(2,'piva',13.99);
INSERT INTO items(categories_id,name,price) VALUES(2,'vino',17.99);
INSERT INTO items(categories_id,name,price) VALUES(3,'cedevita',9.99);
INSERT INTO items(categories_id,name,price) VALUES(3,'voda',5.00);
INSERT INTO items(categories_id,name,price) VALUES(4,'kava',17.99);
INSERT INTO items(categories_id,name,price) VALUES(4,'čaj',12.99);

INSERT INTO users(username,email,password) VALUES('test','test@test.com','$2a$10$dIRAtTENMIstqDpW3YjH/ufSgyfuQMvJ7PTvz0QtijvwHKV3FeaCi');

INSERT INTO user_roles(user_id,role_id) VALUES(1,1);
INSERT INTO user_roles(user_id,role_id) VALUES(1,2);
INSERT INTO user_roles(user_id,role_id) VALUES(1,3);