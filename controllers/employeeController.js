var employeeModel = require('../models/employeeModel');
const path = require('path');

module.exports = {
    getAllEmployees: function(req, res) {
        const acceptHeader = req.headers.accept || '';
        if (acceptHeader.includes('text/html')) {
            res.sendFile(path.join(__dirname, '../public/employee/employees.html'));
        } else {
            employeeModel.getAllEmployees(function(err, employees) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).json(employees);
                }
            });
        }
    },

    addEmployee: function(req, res) {
        var newEmployee = req.body;

        const requiredFields = ['Name', 'Post', 'Start_work'];
        for (const field of requiredFields) {
            if (!newEmployee[field]) {
                return res.status(400).send(`Missing required field: ${field}`);
            }
        }

        employeeModel.addEmployee(newEmployee, function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send("Employee added successfully");
            }
        });
    },

    getEmployee: function(req, res) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send("Invalid employee ID");
        }

        const acceptHeader = req.headers.accept || '';
        if (acceptHeader.includes('text/html')) {
            res.sendFile(path.join(__dirname, '../public/employee/employees.html'));
        } else {
            employeeModel.getEmployee(id, function(err, employee) {
                if (err) {
                    res.status(500).send(err);
                } else if (!employee) {
                    res.status(404).send({ error: "Employee not found" });
                } else {
                    res.status(200).json(employee);
                }
            });
        }
    },

    updateEmployee: function(req, res) {
        var id = req.params.id;
        var updatedEmployee = req.body;
        employeeModel.updateEmployee(id, updatedEmployee, function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send("Employee updated successfully");
            }
        });
    },

    deleteEmployee: function(req, res) {
        var id = req.params.id;
        employeeModel.deleteEmployee(id, function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send("Employee deleted successfully");
            }
        });
    }
};
