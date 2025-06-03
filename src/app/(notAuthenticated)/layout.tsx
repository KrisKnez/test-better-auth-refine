"use client";

import React from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";

import { authProviderClient } from "@providers/auth-provider/auth-provider.client";
import LoadingLayout from "@layouts/loading-layout";

export default function Layout({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const { data } = useSWR("authProviderClient.check", authProviderClient.check, {
    onSuccess: (data) => {
      if (data?.authenticated === true && data.redirectTo) {
        router.replace(data.redirectTo);
      }
    },
  });

  if (!data || data?.authenticated === true) return <LoadingLayout />;

  return children
}