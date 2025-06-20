"use client";

import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  TextFieldComponent,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";
import { MdCancel } from "react-icons/md";

export default function OrganizationsList() {
  const { dataGridProps } = useDataGrid({
    dataProviderName: "adminUsers",
  });

  const columns = React.useMemo<GridColDef[]>(
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
        field: "name",
        headerName: "Name",
        minWidth: 200,
        display: "flex",
        flex: 1,
      },
      {
        field: "email",
        headerName: "Email",
        minWidth: 200,
        display: "flex",
        flex: 1,
        renderCell: function render({ value, row }) {
          return <Stack direction={"row"} alignItems="center" justifyContent="center" gap={1}>
            <TextFieldComponent value={value} />
            {!row.emailVerified && (
              <Tooltip title="Email not verified" slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [0, -14],
                      },
                    },
                  ],
                },
              }}>
                <Stack>
                  <MdCancel fill="red" size={18} />
                </Stack>
              </Tooltip>
            )}
          </Stack>;
        },
      },
      {
        field: "role",
        headerName: "Role",
        minWidth: 150,
        display: "flex",
        flex: 1,
        renderCell: function render({ value }) {
          return (
            <TextFieldComponent value={value} />
          );
        },
      },
      {
        field: "banned",
        headerName: "Banned",
        minWidth: 100,
        display: "flex",
        flex: 1,
        renderCell: function render({ value }) {
          return <TextFieldComponent value={value ? "Yes" : "No"} />
        },
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
        field: "updatedAt",
        headerName: "Updated At",
        minWidth: 150,
        display: "flex",
        flex: 1,
        renderCell: function render({ value }) {
          return <DateField value={value} format="MMMM D, YYYY h:mm A" />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        align: "right",
        headerAlign: "right",
        minWidth: 120,
        sortable: false,
        display: "flex",
        flex: 1,

        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
}
