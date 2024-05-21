import Roles from "../models/RoleModel.js";

export const getRoles = async (req, res) => {
    try {
        const response = await Roles.findAll({
            attributes: ['roleId', 'roleName']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getRoleById = async (req, res) => {
    try {
        const response = await Roles.findOne({
            attributes: ['roleId', 'roleName'],
            where: {
                roleId: req.params.id
            }
        });
        if (!response) {
            return res.status(404).json({ msg: "Role not found" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createRole = async (req, res) => {
    const { roleName } = req.body;
    try {
        await Roles.create({
            roleName: roleName
        });
        res.status(201).json({ msg: "Role created successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const updateRole = async (req, res) => {
    const role = await Roles.findOne({
        where: {
            roleId: req.params.id
        }
    });
    if (!role) {
        return res.status(404).json({ msg: "Role not found" });
    }
    const { roleName } = req.body;
    try {
        await Roles.update({
            roleName: roleName
        }, {
            where: {
                roleId: role.roleId
            }
        });
        res.status(200).json({ msg: "Role updated successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deleteRole = async (req, res) => {
    const role = await Roles.findOne({
        where: {
            roleId: req.params.id
        }
    });
    if (!role) {
        return res.status(404).json({ msg: "Role not found" });
    }
    try {
        await Roles.destroy({
            where: {
                roleId: role.roleId
            }
        });
        res.status(200).json({ msg: "Role deleted successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
