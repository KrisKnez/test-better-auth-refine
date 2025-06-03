"use client";

import { authClient } from "@lib/auth-client";
import { DataProvider } from "@refinedev/core";


export const usersProvider: DataProvider = {
    // required methods
    getList: async ({ resource, pagination, sorters, filters, meta }) => {
        const { data, error } = await authClient.admin.listUsers({
            query: {
                limit: pagination?.pageSize || 10,
                offset: pagination?.current ? (pagination.current - 1) * (pagination.pageSize || 10) : 0,
            }
        });

        if (error) {
            throw new Error(error.message || "Failed to fetch users");
        }

        return {
            data: data?.users as any,
            total: data?.total
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
        // throw new Error("Not implemented");
        const { data, error } = await authClient.admin.listUsers({
            query: {
                filterField: "id",
                filterOperator: "eq",
                filterValue: id,
            }
        });

        if (error) {
            throw new Error(error.message || "Failed to fetch user");
        }

        return {
            data: data?.users?.[0] as any || null,
        };
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