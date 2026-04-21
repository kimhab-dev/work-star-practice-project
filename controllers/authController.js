const response = require('../utils/respone');
const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const row = await authService.register(req.body);
        response.success(res, row[0], "Register successfully.")
    } catch (error) {
        response.error(res, "Register fail.", error.message)
    }
}

const getAll = async (req, res) => {
    try {
        const rows = await authService.getAll();
        return res.json({
            result: true,
            message: "Get data successfully",
            data: rows
        })
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const row = await authService.login(req.body);
        console.log(row);

        response.success(res, row, "Login successfully.")
    } catch (error) {
        console.log(error);
        response.error(res, "Login fail.", error.message)
    }
}

const getProfile = async (req, res) => {
    console.log('controller');

}

module.exports = { register, getAll, login, getProfile }
