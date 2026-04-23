const nodemailer = require('nodemailer');

const transpoter = nodemailer.createTransport({
    host: 'localhost',
    service: 'gmail',
    auth: {
        user: "kimhabsok9@gmail.com",
        pass: "yozkcxkhfnmyvtfu"
    }
});

module.exports = transpoter;