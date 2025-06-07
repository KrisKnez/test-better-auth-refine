"use client";

import { authClient } from "@lib/auth-client";
import { DataProvider } from "@refinedev/core";


export const sessionsProvider: DataProvider = {
    getList: async ({ resource, pagination, sorters, filters, meta }) => {
        // Ensure userId is present
        const userId = meta?.userId;
        if (!userId)
            throw new Error("userId is required to fetch sessions.");

        const { data, error } = await authClient.admin.listUserSessions({
            userId,
        })

        if (error) {
            throw new Error(error.message || "Failed to fetch users");
        }

        return {
            data: data?.sessions as any,
            total: data?.sessions.length || 0
        }
    },
    create: async ({ resource, variables, meta }) => {
        throw new Error("Not implemented");
    },
    update: async ({ resource, id, variables, meta }) => {
        throw new Error("Not implemented");
    },
    deleteOne: async ({ resource, id, variables, meta }) => {
        throw new Error("Not implemented");
    },
    getOne: async ({ resource, id, meta }) => {
        throw new Error("Not implemented");
    },
    getApiUrl: () => "",
    // optional methods
    //   getMany: ({ resource, ids, meta }) => Promise,
    //   createMany: ({ resource, variables, meta }) => Promise,
    //   deleteMany: ({ resource, ids, variables, meta }) => Promise,
    //   updateMany: ({ resource, ids, variables, meta }) => Promise,
    //   custom: ({ url, method, filters, sorters, payload, query, headers, meta }) =>
    //     Promise,
};