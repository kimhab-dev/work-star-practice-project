const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const jwtConfig = require('../config/jwt')
const user = require('../models/user');
const mailService = require('../services/mailService')

const register = async (body) => {
    if (!body.email || !body.password) {
        throw new Error("Email orr password is required.");

    }
    const email = await user.findByEmail(body.email);
    if (email.length != 0) {
        throw new Error("Email already in use.");

    }
    const hashPassword = await bcrypt.hash(body.password, 10);

    const verificationToken = await crypto.randomBytes(32).toString('hex');
    // best recommand we sould store time be UTC
    const verificationTokenExpires = new Date(Date.now() + 2 * 60 * 1000);

    const data = {
        full_name: body.full_name,
        email: body.email,
        password: hashPassword,
        verificationToken,
        verificationTokenExpires
    }

    await mailService.sendVerificationEmail(body.email, verificationToken);

    const id = await user.register(data);
    const row = await user.getById(id);
    return row;
}

const getAll = async () => {
    const rows = await user.getAll();
    return rows;
}

const login = async (body) => {
    if (body.email == '' || body.password === '') {
        throw new Error("Email or password cannot null.");
    }

    const row = await user.findByEmail(body.email);
    if (row.length === 0) {
        throw new Error("invalid email or password");
    }

    if (!row[0].isVerifyEmail) {
        throw new Error("You need to verify your email.");
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

const verificationEmail = async (token) => {
    if (!token) {
        throw new Error("Token is require.");
    }
    const row = await user.findByTokenVerification(token);
    if (row.length === 0) {
        throw new Error("Invalid token or expire token.");
    }
    if (row[0].isVerifyEmail) {
        throw new Error("this email already verified.");
    }
    if (!row[0].verification_expires || new Date(row[0].verification_expires) < new Date()) {
        throw new Error("token is expire.");
    }

    await user.verifyEmail(row[0].id);

    return { message: "Verify email successfully." }
}

const resendVerification = async (email) => {
    if (!email) {
        throw new Error("Email is required.");
    }
    const row = await user.findByEmail(email);
    if (row.length == 0) {
        throw new Error("Not yet have account. please register.");

    }
    if (row[0].isVerifyEmail) {
        throw new Error("this email already verified.");
    }
    const verificationToken = await crypto.randomBytes(32).toString('hex');
    // best recommand we sould store time be UTC
    const verificationTokenExpires = new Date(Date.now() + 2 * 60 * 1000);

    await user.resendVerificatoin({
        verificationToken,
        verificationTokenExpires,
        id: row[0].id
    });

    await mailService.sendVerificationEmail(email, verificationToken);

    return { message: "Resend verification successfully." }

}

module.exports = {
    register,
    getAll,
    login,
    getProfile,
    logout,
    verificationEmail,
    resendVerification
}