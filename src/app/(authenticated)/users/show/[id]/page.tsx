"use client";

import { authClient } from "@lib/auth-client";
import { Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DateTimeField } from "@mui/x-date-pickers";
import { useShow } from "@refinedev/core";
import {
  Show,
  DateField,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";
import dayjs from "dayjs";

export default function BlogPostShow() {
  const { query } = useShow({});

  const { data, isLoading } = query;

  const record = data?.data;

  const { dataGridProps } = useDataGrid<ReturnType<typeof authClient.admin.listUserSessions>>({
    dataProviderName: "adminSessions",
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
        field: "ipAddress",
        headerName: "IP Address",
        minWidth: 200,
        display: "flex",
        flex: 1,
      },
      {
        field: "userAgent",
        headerName: "User Agent",
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
      <Show isLoading={isLoading} >
        <Stack gap={3}>
          <TextField
            type="text"
            label={"ID"}
            defaultValue={record?.id || ""}
            fullWidth
            slotProps={{
              inputLabel: { shrink: true },
              input: { readOnly: true },
            }}
          />

          <TextField
            type="text"
            label={"Name"}
            defaultValue={record?.name || ""}
            fullWidth
            slotProps={{
              inputLabel: { shrink: true },
              input: { readOnly: true },
            }}
          />

          <TextField
            type="email"
            label={"Email"}
            defaultValue={record?.email || ""}
            fullWidth
            slotProps={{
              inputLabel: { shrink: true },
              input: { readOnly: true },
            }}
          />

          <DateTimeField
            label={"Created At"}
            defaultValue={dayjs(record?.createdAt)}
            slotProps={{
              textField: {
                readOnly: true,
              }
            }}
            fullWidth
          />

          <DateTimeField
            label={"Updated At"}
            defaultValue={dayjs(record?.updatedAt)}
            slotProps={{
              textField: {
                readOnly: true,
              }
            }}
            fullWidth
          />
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
