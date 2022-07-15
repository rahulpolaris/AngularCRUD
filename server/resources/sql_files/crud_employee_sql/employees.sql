
 DROP TABLE IF EXISTS `employees`;
 CREATE TABLE IF NOT EXISTS employees (
     id INT unsigned NOT NULL AUTO_INCREMENT,
     firstname VARCHAR(150) NOT NULL,
     lastname VARCHAR(150), 
     email VARCHAR(150) NOT NULL,
     phone VARCHAR(15) NOT NULL,
     date_of_birth DATE,
     country VARCHAR(50),
     state VARCHAR(90),
     city VARCHAR(90),
     PRIMARY KEY (id)
 );

INSERT INTO employees (firstname,lastname,email,phone,date_of_birth,country,state,city) VALUES
('raman','ashok','raman@mail.com','9955885596','1996-03-22','India','New Delhi','East Delhi'),
('baman','tomar','baman@mail.com','9958645296','1995-03-22','India','Bihar','Patna'),
('aman','singh','aman@mail.com','1258645296','1994-06-19','India','Karnataka','Bannur'),
('Shubham','Mishra','baman@mail.com','9639645296','1997-05-12','India','Lakshadweep','Kavaratti');
