"use client";

import type { AuthProvider } from "@refinedev/core";
import { authClient } from "@/lib/auth-client";

export const authProviderClient: AuthProvider = {
  login: async ({ email, username, password, remember }) => {
    try {
      const response = await authClient.signIn.email({
        email,
        password
      });
      if (response.error) {
        return {
          success: false,
          error: {
            name: "LoginError",
            message: response.error.message || "Invalid credentials",
          },
        };
      }

      return { success: true, redirectTo: "/" };
    } catch (error) {
      return { success: false, error: { name: "LoginError", message: "An error occurred" } };
    }
  },
  logout: async () => {
    await authClient.signOut();
    return {
      success: true,
      redirectTo: "/login"
    };
  },
  check: async () => {
    const session = await authClient.getSession();

    if (session.data === null || session.error)
      return {
        authenticated: false,
        logout: true,
        redirectTo: "/login",
      };

    return {
      authenticated: true,
      redirectTo: "/",
    };
  },
  getPermissions: async () => {
    try {
      const session = await authClient.getSession();
      if (session.error) {
        return null;
      }

      return ["admin", "editor"]; // Example roles, replace with actual logic
    } catch (error) {
      return null;
    }
  },
  getIdentity: async () => {
    try {
      const session = await authClient.getSession();
      if (session.error) {
        return null;
      }

      return {
        id: session.data?.user.id,
        name: session.data?.user.name,
        email: session.data?.user.email,
        avatar: session.data?.user.image || "https://i.pravatar.cc/150?img=1", // Default avatar if not provided
        roles: [], // Assuming roles are part of the user object
      };
    } catch (error) {
      return null;
    }
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
  register: async ({
    email,
    password
  }) => {
    try {
      const response = await authClient.signUp.email({
        email,
        password,
        name: "", // Assuming name is the same as email for simplicity
      });

      if (response.error) {
        return {
          success: false,
          error: {
            name: "RegisterError",
            message: response.error.message || "Registration failed",
          },
        };
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "RegisterError",
          message: "Registration failed",
        },
      };
    }
  },
};
