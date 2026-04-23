const path = require('path');
const transporter = require('../config/mailer');

const sendVerificationEmail = async (to, token) => {
    const verificationLink = `http://localhost:3000/api/auth/verify-email?token=${token}`;

    try {
        await transporter.sendMail({
            from: `"Workstar Restaurant" <noreply@myapp.com>`,
            to,
            subject: 'Confirm your email address',
            // Attaching the logo so it can be viewed in the email client
            attachments: [{
                filename: 'workstar-logo.png',
                path: path.join(__dirname, '../logo/workstar-logo.png'),
                cid: 'workstarlogo' // Must match the src="cid:..." in the HTML
            }],
            html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          background-color: #f4f7f9;
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .wrapper {
          width: 100%;
          background-color: #f4f7f9;
          padding: 40px 0;
        }
        .container {
          max-width: 560px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .header {
          padding: 40px 20px 20px;
          text-align: center;
          background-color: #ffffff;
        }
        .logo-img {
          width: 80px;
          height: auto;
        }
        .content {
          padding: 0 40px 40px;
          text-align: center;
          color: #374151;
        }
        h1 {
          font-size: 24px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 16px;
        }
        p {
          font-size: 16px;
          line-height: 1.6;
          color: #4b5563;
          margin-bottom: 24px;
        }
        .btn-container {
          margin: 32px 0;
        }
        .button {
          background-color: #4F46E5;
          color: #ffffff !important;
          padding: 14px 32px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          display: inline-block;
        }
        .divider {
          height: 1px;
          background-color: #e5e7eb;
          margin: 30px 40px;
        }
        .footer {
          padding: 0 40px 40px;
          text-align: center;
          font-size: 12px;
          color: #9ca3af;
        }
        .link-text {
          color: #4F46E5;
          text-decoration: none;
          word-break: break-all;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <img src="cid:workstarlogo" alt="Workstar Restaurant Logo" class="logo-img">
          </div>
          <div class="content">
            <h1>Verify your email</h1>
            <p>Welcome to <strong>Workstar Restaurant</strong>! We are excited to have you. Please confirm your email address to activate your account and access all our features.</p>
            
            <div class="btn-container">
              <a href="${verificationLink}" class="button">Confirm Email Address</a>
            </div>
            
            <p style="font-size: 14px; color: #6b7280;">
              This link will expire in <strong>1 hour</strong>. <br>
              If you did not create an account, you can safely ignore this email.
            </p>
          </div>
          
          <div class="divider"></div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} Workstar Restaurant Inc. | Phnom Penh, Cambodia</p>
            <p>If you’re having trouble clicking the button, copy and paste this URL into your browser:</p>
            <p><a href="${verificationLink}" class="link-text">${verificationLink}</a></p>
          </div>
        </div>
      </div>
    </body>
    </html>
    `
        });
        console.log("Verification email sent successfully to:", to);
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error("Email service is currently unavailable.");
    }
};

module.exports = { sendVerificationEmail };