import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import { admin } from "better-auth/plugins"

import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.BETTER_AUTH_DATABASE_URL!);
const db = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(db),
    plugins: [
        openAPI(),
        admin()
    ],
    user: {
        changeEmail: {
            enabled: true,
            async sendChangeEmailVerification(data, request) {
                // Implement your email sending logic here
                console.log("Sending change email verification to:", data.user.email);
            },
        }
    },
    emailAndPassword: {
        enabled: true,
        async sendResetPassword(data, request) {
            // Implement your email sending logic here
            console.log("Sending reset password email to:", data.user.email);
        },
    },
    emailVerification: {
        async sendVerificationEmail(data, request) {
            // Implement your email sending logic here
            console.log("Sending verification email to:", data.user.email);
        },
    },
})