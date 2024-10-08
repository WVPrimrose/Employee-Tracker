// required packages and files to run application

const inquirer = require('inquirer')
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
                    name: 'View All Departments',
                    value: 'View_Departments',
                },
                {
                    name: 'View All Roles',
                    value: 'View_Roles',
                },
                {
                    name: 'View All Employees',
                    value: 'View_Employees',
                },
                {
                    name: 'Create New Department',
                    value: 'Create_New_Department',
                },
                {
                    name: 'Create New Role',
                    value: 'Create_New_Role',
                },
                {
                    name: 'Create New Employee',
                    value: 'Create_New_Employee',
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
            case 'Create_New_Employee':
                addEmployee()
                break;
            default:
                quit();
        }
    });
}

// function to view all departments
async function viewDepartments() {
    const sql = `SELECT id, name AS title FROM department`;
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, result) => {
            if (err) {
                console.error(err)
                reject(err);
            } else {
                console.log('\n');
                console.table(result.rows);
                console.log('\n');
                resolve(result.rows)
            }
        })
    })
}
// function to view all roles
async function viewRoles() {
    const sql = `SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department on role.department_id = department.id`;
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, result) => {
            if (err) {
                console.error(err)
                reject(err);
            } else {
                console.log('\n');
                console.table(result.rows)
                console.log('\n')
                resolve(result.rows)
            }
        })
    })
};
// function to view all employees
async function viewEmployees() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;`

    return new Promise((resolve, reject) => {

        pool.query(sql, (err, result) => {
            if (err) {
                console.error(err)
                reject(err);
            } else {
                console.log('\n')
                console.table(result.rows)
                console.log('\n')
                resolve(result.rows)
            }
        })
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
        let departments = await viewDepartments()
        console.log(departments)
        return departments.map(({ id, title }) => ({
            name: title,
            value: id,
        }));
    }
    const departmentChoices = await listDepartments()

    const belongDepartment = await inquirer.prompt([
        {
            name: 'department',
            type: 'list',
            message: 'Which department does this role belong to?',
            choices: departmentChoices
        },
    ])
    const sql = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`;
    const addRole = pool.query(sql, [enterRole.role, enterRole.salary, belongDepartment.department], (err) => {
        if (err) {
            // have a function to catch the error message
            console.error(err)
            return err;
        }
    })
    viewRoles()
}

// function to add employees
async function addEmployee() {
    const enterEmployee = await inquirer.prompt([
        {
            name: 'first_name',
            message: 'Enter first name',
            type: 'input'
        },
        {
            name: 'last_name',
            message: 'Enter last name',
            type: 'input'
        },
    ])

    async function listRoles() {
        let roles = await viewRoles()
        console.log(roles)
        return roles.map(({ title, id }) => ({
            name: title,
            value: id,
        }));
    }
    const roleChoices = await listRoles()

    const whichRole = await inquirer.prompt([

        {
            type: 'list',
            name: 'role',
            message: 'Enter Role',
            choices: roleChoices
        },
    ])

    async function listManagers() {
        let managers = await viewEmployees()
        console.log(managers)
        return managers.map(({ first_name, last_name, id }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
        }));
    }

    const managerChoices = await listManagers()

    const whichManager = await inquirer.prompt([
        {
            name: 'manager',
            message: 'Enter designated Manager',
            type: 'list',
            choices: managerChoices
        },
    ])

    const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES($1, $2, $3, $4)`

    const addEmployee = pool.query(sql, [enterEmployee.first_name, enterEmployee.last_name, whichRole.role, whichManager.manager], (err) => {
        if (err) {
            // have a function to catch the error message
            console.error(err)
            return err;
        }
        viewEmployees()
    })
}


// function to update employee role
async function updateEmployeeRole() {
    // want to select an employee from the following choices
    // want to select a role which to update
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
