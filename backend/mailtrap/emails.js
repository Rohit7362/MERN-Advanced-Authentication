import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify Your Email Address",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        });

        console.log('Email Sent Successfully', response);

    } catch (error) {
        console.error('Error sending verification email', error);
        throw new Error("Error in Sending Verification Email: ${error}");
    }
};

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "e658e65c-abf8-49e7-a7c5-dce23bf69dd5",
            template_variables: {
                name: name,
                company_info_name: "Auth Company",
            },
        })
        console.log('welcome Email sent successfully', response);
        
    } catch (error) {
        console.error('Error sending welcome email', error);
        throw new Error("Error in Sending Welcome Email: ${error}");
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        });
        console.log('Password reset email sent successfully', response);
    } catch (error) {
        console.error('Error sending password reset email', error);
        throw new Error("Error in Sending Password Reset Email: ${error}");
    }
}

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        });
        console.log('Password reset email sent successfully', response);
    } catch (error) {
        console.error('Error sending password reset success email', error);
        throw new Error("Error in Sending Reset Success Email: ${error}");
    }
}