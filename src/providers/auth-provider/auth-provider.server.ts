import { auth } from "@lib/auth";
import type { AuthProvider } from "@refinedev/core";
import { headers } from "next/headers";

export const authProviderServer: Pick<AuthProvider, "check"> = {
  check: async () => {
    try {
      const session = await auth.api.getSession({
        headers: await headers()
      });
      if (!session) {
        return {
          authenticated: false,
          logout: true,
          redirectTo: "/login",
        };
      }

      return {
        authenticated: true,
        redirectTo: "/",
      };
    } catch (error) {
      return {
        authenticated: false,
        logout: true,
        redirectTo: "/login",
      };
    }
  },
};
