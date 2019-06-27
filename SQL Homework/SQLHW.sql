drop table if exists departments;
drop table if exists dept_emp;
drop table if exists dept_manager;
drop table if exists salaries;
drop table if exists titles;
drop table if exists employees;

drop table if exists Departments;
drop table if exists Dept_Emp;
drop table if exists Dept_Manager;
drop table if exists Salaries;
drop table if exists Titles;
drop table if exists Employees;


drop table if exists Dept_Manager;





-- Exported from QuickDBD: https://www.quickdatatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/WDc55E
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

CREATE TABLE "dept_manager" (
    "dept_no" varchar(5)   NOT NULL,
    "emp_no" int  NOT NULL,
    "from_date" date   NOT NULL,
	"to_date" date NOT NULL
);


CREATE TABLE "dept_emp" (
    "emp_no" int   NOT NULL,
    "dept_no" varchar(5)   NOT NULL,
    "from_date" date   NOT NULL,
    "to_date" date   NOT NULL
);

CREATE TABLE "departments" (
    "dept_no" varchar(5)   NOT NULL,
    "dept_name" varchar(20)   NOT NULL,
    PRIMARY KEY (
        "dept_no"
     )
);

CREATE TABLE "employees" (
    "emp_no" int   NOT NULL,
    "birth_date" date   NOT NULL,
    "first_name" varchar(20)   NOT NULL,
    "last_name" varchar(20)   NOT NULL,
    "gender" char   NOT NULL,
    "hire_date" date   NOT NULL,
    PRIMARY KEY (
        "emp_no"
     )
);

CREATE TABLE "salaries" (
    "emp_no" int   NOT NULL,
    "salary" int   NOT NULL,
    "from_date" date   NOT NULL,
    "to_date" date   NOT NULL
);

CREATE TABLE "titles" (
    "emp_no" int   NOT NULL,
    "title" varchar(23)   NOT NULL,
    "from_date" date   NOT NULL,
    "to_date" date   NOT NULL
);

COPY Dept_Manager FROM 'C:\Users\mhabi\Google Drive\COLNYC201904DATA3\homework\09-SQL\Instructions\data\dept_manager.csv' DELIMITER ',' CSV HEADER;

COPY Departments FROM 'C:\Users\mhabi\Google Drive\COLNYC201904DATA3\homework\09-SQL\Instructions\data\departments.csv' DELIMITER ',' CSV HEADER;

COPY dept_emp FROM 'C:\Users\mhabi\Google Drive\COLNYC201904DATA3\homework\09-SQL\Instructions\data\dept_emp.csv' DELIMITER ',' CSV HEADER;

COPY employees FROM 'C:\Users\mhabi\Google Drive\COLNYC201904DATA3\homework\09-SQL\Instructions\data\employees.csv' DELIMITER ',' CSV HEADER;

COPY salaries FROM 'C:\Users\mhabi\Google Drive\COLNYC201904DATA3\homework\09-SQL\Instructions\data\salaries.csv' DELIMITER ',' CSV HEADER;

COPY titles FROM 'C:\Users\mhabi\Google Drive\COLNYC201904DATA3\homework\09-SQL\Instructions\data\titles.csv' DELIMITER ',' CSV HEADER;


ALTER TABLE "dept_manager" ADD FOREIGN KEY("dept_no")
REFERENCES "departments" ("dept_no");

ALTER TABLE "dept_manager" ADD FOREIGN KEY("emp_no")
REFERENCES "employees" ("emp_no");

ALTER TABLE "dept_emp" ADD FOREIGN KEY("emp_no")
REFERENCES "employees" ("emp_no");

ALTER TABLE "dept_emp" ADD FOREIGN KEY("dept_no")
REFERENCES "departments" ("dept_no");

ALTER TABLE "salaries" ADD FOREIGN KEY("emp_no")
REFERENCES "employees" ("emp_no");

ALTER TABLE "titles" ADD FOREIGN KEY("emp_no")
REFERENCES "employees" ("emp_no");






-- List the following details of each employee: employee number, last name, first name, gender, and salary.
Select emp.emp_no, emp.last_name, emp.first_name, emp.gender, sal.salary
from employees as emp
join salaries as sal
on emp.emp_no = sal.emp_no;


-- List employees who were hired in 1986.
Select *
From employees
where date_part('year', hire_date) = 1986;


-- List the manager of each department with the following information: department number, department name, 
-- the manager's employee number, last name, first name, and start and end employment dates.



select deptm.dept_no, dept.dept_name, emp.emp_no, emp.last_name, emp.first_name, deptm.from_date, deptm.to_date 
from dept_manager as deptm 
join departments as dept
on deptm.dept_no = dept.dept_no
join employees as emp
on emp.emp_no = deptm.emp_no;




-- List the department of each employee with the following information: 
-- employee number, last name, first name, and department name.

select emp.emp_no, emp.first_name, emp.last_name, dept.dept_name
from dept_emp as depte
join employees as emp
on emp.emp_no = depte.emp_no
join departments as dept
on dept.dept_no = depte.dept_no
where date_part ('year', depte.to_date) = 9999;

select * from dept_emp


-- List all employees whose first name is "Hercules" and last names begin with "B."

Select * 
From employees
Where first_name = 'Hercules' and last_name like 'B%';

-- List all employees in the Sales department, including their employee number, last name, first name, and department name.

select emp.emp_no, emp.first_name, emp.last_name, dept.dept_name
from dept_emp as depte
join employees as emp
on emp.emp_no = depte.emp_no
join departments as dept
on dept.dept_no = depte.dept_no
where dept.dept_name = 'Sales'


-- List all employees in the Sales and Development departments, 
-- including their employee number, last name, first name, and department name.

select emp.emp_no, emp.first_name, emp.last_name, dept.dept_name
from dept_emp as depte
join employees as emp
on emp.emp_no = depte.emp_no
join departments as dept
on dept.dept_no = depte.dept_no
where dept.dept_name = 'Sales' or dept.dept_name = 'Development';



-- In descending order, list the frequency count of employee last names, i.e., how many employees share each last name.
select last_name, count(last_name)
from employees
group by (last_name)
order by count (last_name) desc
