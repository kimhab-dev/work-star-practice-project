const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt')
const user = require('../models/user');

const register = async (body) => {
    const email = await user.findByEmail(body.email);
    if (email.length != 0) {
        throw new Error("Email already in use.");

    }

    const hashPassword = await bcrypt.hash(body.password, 10);
    const data = {
        full_name: body.full_name,
        email: body.email,
        password: hashPassword
    }
    const id = await user.register(data);
    const row = await user.getById(id);
    return row;
}

const getAll = async () => {
    const rows = await user.getAll();
    return rows;
}

const login = async (body) => {
    // check by email
    const row = await user.findByEmail(body.email);
    if (body.email == '' || body.password === '') {
        throw new Error("Email or password cannot null.");
    }
    if (row.length === 0) {
        throw new Error("invalid email or password");
    }

    // compare password with hash password in db
    const isPassMatch = await bcrypt.compare(body.password, row[0].password);

    if (body.email != row[0].email || !isPassMatch) {
        throw new Error("invalid email or password");

    }

    // get data when login success
    const [data] = await user.getById(row[0].id);

    const token = jwt.sign(
        { id: data.id, name: data.name },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
    );

    await user.addToken({ token, id: data.id })

    return {
        user: data,
        token: token
    };

}

const getProfile = async (id) => {
    const row = await user.getById(id);
    return row;
}

const logout = async (id) => {
    await user.logout(id);
    return { message: "Logout successfully" }
}

module.exports = { register, getAll, login, getProfile, logout }