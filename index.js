// need inquirer as main application runner
// need a db folder

const inquirer = require('inquirer')
const connections = require('./connections/index')
// const db = require('./db')
const { log, table } = require('console');

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

            default:
            quit();
        }
    });
}

// function to view all departments
async function viewDepartments() {
   
    const find = await connections.findDepartments()
        .then(( rows ) => {
            let deparments = rows

        })
        .then(() => employeeApp())
}
// function to view all employees
function viewEmployees() {
    db.viewEmployees()
        .then(({ rows }) => {
            let employees = rows;
            console.table(employee)
        })
        .then(() => employeeApp())
};
// function to view all roles
function viewRoles() {
    db.viewRoles()
        .then(({ rows }) => {
            let roles = rows;
            console.table(role)
        })
        .then(() => employeeApp())
};
// function to add employees
function addEmployee() {
    prompt([
        {
            name: 'Employee_First_Name',
            message: 'Enter first name'
        },
        {
            name: 'Employee_Last_Name',
            message: 'Enter last name'
        },
        {
            type: list,
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
// function to add roles
function addRole() {
    db.viewDepartments().then(({ rows }) => {
        let departments = rows;
        const departmentAreas = departments.map(({ id, name }) => ({
            name: name,
            value: id,
        }))
    })
    prompt([
        {
            name: 'Role',
            message: 'Enter New Role'
        },
        {
            name: 'Role_Salary',
            message: 'Enter New Role Salary'
        },
        {
            name: 'Department',
            type: 'list',
            message: 'Which department does this role belong to?',
            choice: departmentAreas
        },
    ]).then((res) => {
        let name = res;
        db.addRole(name)
            .then(() => console.log('Added New Role'))
            .then(() => employeeApp())
    })
}
// function to add departments
function addDepartment() {
    prompt([
        {
            name: 'Department',
            message: 'Enter New Department',
        },
    ]).then((res) => {
        let name = res;
        db.addDepartment(name)
            .then(() => console.log('Added New Department!'))
            .then(() => employeeApp())
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
