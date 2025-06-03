"use client";

import React from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";

import { authProviderClient } from "@providers/auth-provider/auth-provider.client";
import LoadingLayout from "@layouts/loading-layout";
import DashboardLayout from "@layouts/dashboard-layout";

export default function Layout({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const { data } = useSWR("authProviderClient.check", authProviderClient.check, {
    onSuccess: (data) => {
      if (data?.authenticated === false && data.redirectTo) {
        router.replace(data.redirectTo);
      }
    },
  });

  if (!data || data?.authenticated === false) return <LoadingLayout />;

  return <DashboardLayout>{children}</DashboardLayout>;
}