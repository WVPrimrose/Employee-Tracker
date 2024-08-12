const pool = require('./connections');

// function to view all employees: first name, last name, roles, departments, salaries, managers

// function to view all departments
async function findDepartments(){
    const sql = `SELECT id, name AS title FROM department`;
    const departments = await pool.query(sql, (err, { rows }) => {
        if (err) {
            return err;
        }
        console.table(rows)
        return rows
    }) 
    console.log(departments)
    return departments
}
// function to view all roles with join by department

// function to view all departments

// function to create new department

// function to create new employee

// function to create new role

// function to update employee's role

// Optional: function to delete employee

module.exports = {findDepartments}
