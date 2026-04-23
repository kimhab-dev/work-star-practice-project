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
        response.success(res, row, "Login successfully.")
    } catch (error) {
        console.log(error);
        response.error(res, "Login fail.", error.message)
    }
}

const getProfile = async (req, res) => {
    try {
        const userInfo = await authService.getProfile(req.user);
        response.success(res, userInfo[0], "Get profile successfully.")

    } catch (error) {
        response.error(res, "Get profile fials.", error.message)
    }

}

const logout = async (req, res) => {
    try {
        const result = await authService.logout(req.user);
        response.success(res, result.message)
    } catch (error) {
        response.error(res, "Logout fial.", error.message)
    }
}

const verificationEmail = async (req, res) => {
    try {
        const result = await authService.verificationEmail(req.query.token);
        response.success(res, result.message);
    } catch (error) {
        response.error(res, "Verify email fial.", error.message);
    }
}

module.exports = { register, getAll, login, getProfile, logout, verificationEmail }
