// need inquirer as main application runner
// need a db folder

const inquirer = require('inquirer')
const db = require('./db')

// shows all the following choices: viewing employees, roles and departments, creating, updating, and removing employees, and creating departments
function employeeApp() {
    prompt([
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
                    name: 'Update Employee',
                    value: 'Update_Employee',
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
    ]) .then((res) => {
        let choice = res.choice;
        switch (key) {
            case value:
                
                break;
        
            default:
                break;
        }
    });
}

// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 