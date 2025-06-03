"use client";

import { authClient } from "@lib/auth-client";
import { List, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useOne, useShow } from "@refinedev/core";
import {
  DateField,
  EmailField,
  MarkdownField,
  NumberField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";
import React from "react";
import useSWR from "swr";

export default function BlogPostShow() {
  const { query } = useShow({});

  const { data, isLoading } = query;

  const record = data?.data;

  const sessions = useSWR([
    "authClient.admin.listUserSessions",
    record?.id as string || "",
  ], () => authClient.admin.listUserSessions({
    userId: record?.id as string || "",
  }))

  const sessionsColumns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
        display: "flex",
        align: "left",
        headerAlign: "left",
      },
      {
        field: "token",
        headerName: "Token",
        minWidth: 150,
        display: "flex",
      },
      {
        field: "userAgent",
        headerName: "User Agent",
        minWidth: 200,
        display: "flex",
      },
      {
        field: "ipAddress",
        headerName: "IP Address",
        minWidth: 200,
        display: "flex",
      },
      {
        field: "createdAt",
        headerName: "Created At",
        minWidth: 150,
        display: "flex",
        renderCell: function render({ value }) {
          return <DateField value={value} format="MMMM D, YYYY h:mm A" />;
        },
      },
      {
        field: "expiresAt",
        headerName: "Expires At",
        minWidth: 150,
        display: "flex",
        renderCell: function render({ value }) {
          return <DateField value={value} format="MMMM D, YYYY h:mm A" />;
        },
      },
    ],
    [sessions]
  );

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {"ID"}
        </Typography>
        <TextField value={record?.id} />

        <Typography variant="body1" fontWeight="bold">
          {"Name"}
        </Typography>
        <TextField value={record?.name} />

        <Typography variant="body1" fontWeight="bold">
          {"Email"}
        </Typography>
        <EmailField value={record?.email} />

        <Typography variant="body1" fontWeight="bold">
          {"CreatedAt"}
        </Typography>
        <DateField value={record?.createdAt} format="MMMM D, YYYY h:mm A" />

        <Typography variant="body1" fontWeight="bold">
          {"UpdatedAt"}
        </Typography>
        <DateField value={record?.updatedAt} format="MMMM D, YYYY h:mm A" />

        <Typography variant="body1" fontWeight="bold">
          {"Sessions"}
        </Typography>
        <List>
          <DataGrid rows={sessions.data?.data?.sessions || []} columns={sessionsColumns} />
        </List>
      </Stack>
    </Show>
  );
}
