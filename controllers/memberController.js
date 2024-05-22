var memberModel = require('../models/memberModel');
const path = require('path');

module.exports = {
    getAllMembers: function(req, res) {
        const acceptHeader = req.headers.accept || '';
        if (acceptHeader.includes('text/html')) {
            res.sendFile(path.join(__dirname, '../public/member/members.html'));
        } else {
            memberModel.getAllMembers(function(err, members) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).json(members);
                }
            });
        }
    },

    addMember: function (req, res) {
        var newMember = req.body;

        const requiredFields = ['Fname', 'Lname', 'PhoneNumber'];
        for (const field of requiredFields) {
            if (!newMember[field]) {
                return res.status(400).send(`Missing required field: ${field}`);
            }
        }

        memberModel.addMember(newMember, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send("Member added successfully");
            }
        });
    },

    getMember: function(req, res) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send("Invalid member ID");
        }

        const acceptHeader = req.headers.accept || '';
        if (acceptHeader.includes('text/html')) {
            res.sendFile(path.join(__dirname, '../public/member/members.html'));
        } else {
            memberModel.getMember(id, function(err, member) {
                if (err) {
                    res.status(500).send(err);
                } else if (!member) {
                    res.status(404).send({ error: "Member not found" });
                } else {
                    res.status(200).json(member);
                }
            });
        }
    
    },

    updateMember: function (req, res) {
        var id = req.params.id;
        var updatedMember = req.body;
        memberModel.updateMember(id, updatedMember, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send("Member updated successfully");
            }
        });
    },

    deleteMember: function (req, res) {
        var id = req.params.id;
        memberModel.deleteMember(id, function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send("Member deleted successfully");
            }
        });
    }
};
