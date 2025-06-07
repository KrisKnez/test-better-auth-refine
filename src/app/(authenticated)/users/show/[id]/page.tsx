"use client";

import { authClient } from "@lib/auth-client";
import { Card, CardContent, List, Paper, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useShow } from "@refinedev/core";
import {
  DateField,
  EmailField,
  Show,
  TextFieldComponent as TextField,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

export default function BlogPostShow() {
  const { query } = useShow({});

  const { data, isLoading } = query;

  const record = data?.data;

  const { dataGridProps } = useDataGrid<ReturnType<typeof authClient.admin.listUserSessions>>({
    dataProviderName: "sessions",
    meta: {
      userId: record?.id,
    }
  });
  const sessionsColumns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
        display: "flex",
        flex: 1,
        align: "left",
        headerAlign: "left",
      },
      {
        field: "userAgent",
        headerName: "User Agent",
        minWidth: 200,
        display: "flex",
        flex: 1,
      },
      {
        field: "ipAddress",
        headerName: "IP Address",
        minWidth: 200,
        display: "flex",
        flex: 1,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        minWidth: 150,
        display: "flex",
        flex: 1,
        renderCell: function render({ value }) {
          return <DateField value={value} format="MMMM D, YYYY h:mm A" />;
        },
      },
      {
        field: "expiresAt",
        headerName: "Expires At",
        minWidth: 150,
        display: "flex",
        flex: 1,
        renderCell: function render({ value }) {
          return <DateField value={value} format="MMMM D, YYYY h:mm A" />;
        },
      },
    ],
    []
  );

  return (
    <Stack spacing={2}>
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
        </Stack>
      </Show>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            User Sessions
          </Typography>
          <DataGrid {...dataGridProps} columns={sessionsColumns} />
        </CardContent>
      </Card>
    </Stack>
  );
}
