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
    emailAndPassword: {
        enabled: true
    }
})