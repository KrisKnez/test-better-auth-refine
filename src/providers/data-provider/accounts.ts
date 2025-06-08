"use client";

import { authClient } from "@lib/auth-client";
import { DataProvider } from "@refinedev/core";

export const accountsProvider: DataProvider = {
    getList: async ({ resource, pagination, sorters, filters, meta }) => {
        const { data, error } = await authClient.listAccounts({
        })

        if (error) {
            throw new Error(error.message || "Failed to fetch sessions");
        }

        return {
            data: data as any,
            total: data.length
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