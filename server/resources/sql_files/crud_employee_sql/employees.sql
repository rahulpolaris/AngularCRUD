 DROP TABLE IF EXISTS `employees_passwords`;
 DROP TABLE IF EXISTS `employees`;
 CREATE TABLE IF NOT EXISTS employees (
     emp_id VARCHAR(120) NOT NULL ,
     firstname VARCHAR(150) NOT NULL,
     lastname VARCHAR(150), 
     email VARCHAR(150) NOT NULL,
     phone VARCHAR(15) NOT NULL,
     date_of_birth DATE,
     country VARCHAR(50),
     state VARCHAR(90),
     city VARCHAR(90),
     PRIMARY KEY (emp_id)
 );

INSERT INTO employees (emp_id,firstname,lastname,email,phone,date_of_birth,country,state,city) VALUES
('7a699170-c820-4ff4-9797-9e0fdeea0c60','admin',null,'admins@mail.com','admin',null,null,null,null),
('3156cc5d-b861-42b2-84eb-d55bf36d6112','raman','ashok','raman@mail.com','9955885596','1996-03-22','India','New Delhi','East Delhi'),
('9a81ec6d-57f3-4fb1-b8ff-d5806d8b95c6','baman','tomar','baman@mail.com','9958645296','1995-03-22','India','Bihar','Patna'),
('f66461e2-eb8f-442e-b709-7a25fda2b039','aman','singh','aman@mail.com','1258645296','1994-06-19','India','Karnataka','Bannur'),
('fe23f372-63aa-42d9-ab1e-abda9387132b','Shubham','Mishra','baman@mail.com','9639645296','1997-05-12','India','Lakshadweep','Kavaratti');




 CREATE TABLE IF NOT EXISTS employees_passwords(
    pd_id INT unsigned NOT NULL AUTO_INCREMENT,
    password VARCHAR(250) NOT NULL,
    employee_id VARCHAR(120) NOT NULL,
    PRIMARY KEY (pd_id),
    FOREIGN KEY (employee_id) REFERENCES employees(emp_id) ON DELETE CASCADE
 );
 INSERT INTO `employees_passwords` (password, employee_id) VALUES
 
 ('adminsspecialpassword','7a699170-c820-4ff4-9797-9e0fdeea0c60'),
 ('Testpassword1!','3156cc5d-b861-42b2-84eb-d55bf36d6112'),
 ('Testpassword1!','9a81ec6d-57f3-4fb1-b8ff-d5806d8b95c6'),
 ('Testpassword1!','f66461e2-eb8f-442e-b709-7a25fda2b039'),
 ('Testpassword1!','fe23f372-63aa-42d9-ab1e-abda9387132b');

select employees.firstname,employees_passwords.password  from employees_passwords INNER JOIN employees ON employees_passwords.employee_id = employees.emp_id;

CREATE TABLE IF NOT EXISTS employee_files(
    file_id INT unsigned NOT NULL AUTO_INCREMENT,
    type VARCHAR(50) NOT NULL,
    location TEXT NOT NULL,
    size VARCHAR(60) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    emp_id VARCHAR(120) NOT NULL,
    PRIMARY KEY (file_id),
    FOREIGN KEY (emp_id) REFERENCES employees(emp_id) ON DELETE CASCADE

    
);
