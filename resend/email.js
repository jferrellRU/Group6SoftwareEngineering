const {resend} = require('../resend/config.js')
const {VerificationTokenEmailTemplate} = require('../resend/email-template.js')

const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: ["dmh315@scarletmail.rutgers.edu"],
            subject: "Verify Email",
            html: VerificationTokenEmailTemplate.replace("{verificationToken}",verificationToken),
          });
    } catch(error) {
        console.log("Error sending verification email", error);
        throw new Error("Error sending verification email");

    }
}
const sendWelcomeEmail = async (email,name) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: ["dmh315@scarletmail.rutgers.edu"],
            subject: "Welcome to Dizzy Designs",
            html:`Hi ${name},<br>Account Verification Successful! Welcome to Dizzy Designs the retail website of the future.`.replace("${name}",name),
          });
    } catch(error) {
        console.log("Error sending welcome email", error);
        throw new Error("Error sending welcome email");

    }
}
const sendPasswordResetEmail = async(email, resetURL) => {
    const url = resetURL;
    try {
        const { data, error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: ["dmh315@scarletmail.rutgers.edu"],
            subject: "Reset Your Password",
            html: `Click <a href = "${url}">here</a> to reset your password`,
          });
    } catch(error) {
        console.log("Error sending password reset email", error);
        throw new Error("Error sending password reset email");

    }
}

const sendResetSuccessfulEmail = async(email) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: ["dmh315@scarletmail.rutgers.edu"],
            subject: "Reset Password Successful",
            html: `Password was reset successfully.`,
          });
    } catch(error) {
        console.log("Error sending reset success email", error);
        throw new Error("Error sending reset success email");

    }
}
module.exports = {sendVerificationEmail, sendWelcomeEmail,sendPasswordResetEmail, sendResetSuccessfulEmail};