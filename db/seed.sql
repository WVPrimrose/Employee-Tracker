\c employee_db

INSERT INTO department
(name)
VALUES
('Marketing'),
('Accounting'),
('Human Resources'),
('Administration');
INSERT INTO role
(title, salary, department_id)
VALUES
('Marketing Associate', 30000, 1)
('Senior Marketing Lead' 50000, 1)
('Accountant', 60000, 2)
('Senior Accountant Manager' 100000, 2)
('HR Expert', 5000000, 3)
('Senior HR Expert', 800000, 3)
('Front End Adminstrator', 20000, 4)
('Exectutive Administrator' 1000000, 4)
INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES