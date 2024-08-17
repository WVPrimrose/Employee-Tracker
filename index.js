// need inquirer as main application runner
// need a db folder

const inquirer = require('inquirer')
const connections = require('./connections/index')
const pool = require('./connections/connections')
const { log, table } = require('console');
const db = pool.connect()

// shows all the following choices: viewing employees, roles and departments, creating, updating, and removing employees, and creating departments
function employeeApp() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'firstQuestion',
            message: 'Welcome to the Employee Tracker.  What would you like to do?',
            choices: [
                {
                    name: 'View All Employees',
                    value: 'View_Employees',
                },
                {
                    name: 'View All Roles',
                    value: 'View_Roles',
                },
                {
                    name: 'View All Departments',
                    value: 'View_Departments',
                },
                {
                    name: 'Create New Employee',
                    value: 'Create_New_Employee',
                },
                {
                    name: 'Create New Role',
                    value: 'Create_New_Role',
                },
                {
                    name: 'Create New Department',
                    value: 'Create_New_Department',
                },
                {
                    name: 'Update Employee Role',
                    value: 'Update_Employee_Role',
                },
                {
                    name: 'Remove Employee',
                    value: 'Remove_Employee',
                },
                {
                    name: 'Quit',
                    value: 'Quit',
                },
            ],
        },
        // Switch case if user choices for the following functions   
    ]).then((res) => {
        console.log(res)
        let choice = res.firstQuestion;
        switch (choice) {
            case 'View_Departments':
                viewDepartments()
                break;
            case 'View_Roles':
                viewRoles()
                break;
            case 'View_Employees':
                viewEmployees()
                break;
            case 'Create_New_Department':
                addDepartment()
                break;
            case 'Create_New_Role':
                addRole()
                break;
            default:
                quit();
        }
    });
}

// function to view all departments
async function viewDepartments() {
    const sql = `SELECT id, name AS title FROM department`;
    const getDepartments = await pool.query(sql, (err, { rows }) => {
        if (err) {
            console.error(err)
            return err;
        }
        console.log('\n')
        console.table(rows)
        console.log('\n')
        employeeApp()
    })
    console.log(getDepartments, 'departments')
    
    return getDepartments
}
// function to view all roles
async function viewRoles() {
    const sql = `SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department on role.department_id = department.id`;;
    const viewRoles = await pool.query(sql, (err, { rows }) => {
        if (err) {
            console.error(err)
            return err;
        }
        console.log('\n');
        console.table(rows)
        console.log('\n')
        employeeApp()
    })
};
// function to view all employees
async function viewEmployees() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;`
    
    const viewEmployees = await pool.query(sql, (err, { rows }) => {
        if (err) {
            console.error(err)
            return err;
        }
        console.log('\n')
        console.table(rows)
        console.log('\n')
        employeeApp()
    })
};
// function to add departments
async function addDepartment() {
    // want to ask the name of new department
    const enterDepartment = await inquirer.prompt([
        {
            name: 'name',
            message: 'Enter new department',
            type: 'input'
        },
    ])
    console.log(enterDepartment.name)
    // have a command to insert new data
    const sql = `INSERT INTO department (name) VALUES ($1)`;
    const addDepartment = pool.query(sql, [enterDepartment.name], (err) => {
        if (err) {
            // have a function to catch the error message
            console.error(err)
            return err;
        }
        viewDepartments()
    })
}
// function to add roles
async function addRole() {
    
    const enterRole = await inquirer.prompt([
        {
            name: 'role',
            message: 'Enter New Role',
            type: 'input'
        },
        {
            name: 'salary',
            message: 'Enter New Role Salary',
            type: 'input'
        },
    ])
    
    async function listDepartments() {
        let departments =  await viewDepartments()
        console.log(departments)
        return departments.map(({ id, name}) => ({
            name: name,
            value: id,
        }));
    }
    const departmentChoices = await listDepartments()

    const belongDepartment = await inquirer.prompt([
        {
            name: 'department',
            type: 'list',
            message: 'Which department does this role belong to?',
            choices: listDepartments()
        },
    ])
    const sql = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`;
    const addRole = pool.query(sql, [enterRole.role, enterRole.salary, enterRole.department], (err) => {
        if (err) {
            // have a function to catch the error message
            console.error(err)
            return err;
        }
        viewRoles()
    })
}

// function to add employees
async function addEmployee() {
    const enterEmployee= await inquirer.prompt([
        {
            name: 'Employee_First_Name',
            message: 'Enter first name',
            type: 'input'
        },
        {
            name: 'Employee_Last_Name',
            message: 'Enter last name',
            type: 'input'
        },
        {
            type: 'list',
            name: 'Role',
            message: 'Enter Role',
            choices: roleChoices
        },
        {
            name: 'Manager',
            message: 'Enter designated Manager'
        },
    ]).then((res) => {
        let firstName = res.first_name;
        let lastName = res.last_name;
    })
    db.viewRoles().then(({ rows }) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id,
        }));
    })
    db.viewEmployees().then(({ rows }) => {
        let employees = rows;
        const managerChoices = employees.map(
            ({ id, first_name, })
        )
    })
}
// function to update employee role
function updateEmployeeRole() {
    prompt([
        {
            name: 'Employee_Role_Update',
            message: 'Who`s role do you want to update?'
        }
    ])
}
// function to remove employee
// function to quit application
function quit() {
    console.log('Thank you for your time!  Come back next time!');
    process.exit();
}

employeeApp()
