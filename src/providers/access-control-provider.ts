"use client";

import { authClient } from "@lib/auth-client";
import { AccessControlProvider } from "@refinedev/core";

export const accessControlProvider: AccessControlProvider = {
    can: async ({ resource, action, params }) => {

        if (resource === "Admin" || params?.resource?.meta?.parent === "Admin") {
            const session = await authClient.getSession();
            const isAdmin = session.data?.user?.role === "admin";

            if (!isAdmin)
                return {
                    can: false,
                    reason: "Unauthorized",
                };
        }

        return { can: true };
    },
};