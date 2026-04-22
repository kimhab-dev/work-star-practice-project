const pool = require('../config/db');

const register = async (user) => {
    const sql = 'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)';
    const data = [user.full_name, user.email, user.password];
    const [result] = await pool.query(sql, data);
    return result.insertId;
}

const getById = async (id) => {
    const [row] = await pool.query('SELECT id, full_name, email FROM users WHERE id = ?', id);
    return row;
}

const getAll = async () => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
}

const findByEmail = async (email) => {
    const [row] = await pool.query('SELECT id, email, password FROM users WHERE email = ?', [email]);
    return row;
}

const addToken = async (user) => {
    const data = [user.token, user.id];
    await pool.query('UPDATE users SET token = ? WHERE id = ?', data);
}

const findByToken = async (token) => {
    const [row] = await pool.query('SELECT * FROM users WHERE token = ?', [token]);
    return row;

}

const logout = async (id) => {
    await pool.query('UPDATE users SET token = null WHERE id = ?', [id]);
}
module.exports = { register, getById, getAll, findByEmail, addToken, findByToken, logout };