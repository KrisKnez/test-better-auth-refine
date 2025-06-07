"use client";

import React from "react";

import { Card, CardContent, Container, List, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DateField, useDataGrid } from "@refinedev/mui";

import { UAParser } from 'ua-parser-js';

export default function SecurityPage() {

    const sessionsDataGrid = useDataGrid({
        dataProviderName: "sessions",
    });
    const sessionsColumns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "createdAt",
                headerName: "Logged In At",
                minWidth: 150,
                display: "flex",
                flex: 1,
                renderCell: function render({ value }) {
                    return <DateField value={value} format="MMMM D, YYYY h:mm A" />;
                },
            },
            {
                field: "userAgent.device",
                headerName: "Device",
                minWidth: 100,
                display: "flex",
                flex: 1,
                renderCell({ row }) {
                    return <>{UAParser(row.userAgent).device.model || "Unknown"}</>
                },
            },
            {
                field: "userAgent.os",
                headerName: "OS",
                minWidth: 100,
                display: "flex",
                flex: 1,
                renderCell({ row }) {
                    return <>{UAParser(row.userAgent).os.name || "Unknown"}</>
                },
            },
            {
                field: "userAgent.browser",
                headerName: "Browser",
                minWidth: 100,
                display: "flex",
                flex: 1,
                renderCell({ row }) {
                    return <>{UAParser(row.userAgent).browser.name || "Unknown"}</>
                },
            },
            {
                field: "ipAddress",
                headerName: "IP Address",
                minWidth: 200,
                display: "flex",
                flex: 1,
                valueGetter: (value) => value || "Unknown",
            },
        ],
        []
    );

    return (
        <Container maxWidth="md">
            <Stack spacing={2} sx={{ mb: 2 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            User Sessions
                        </Typography>
                        <DataGrid {...sessionsDataGrid.dataGridProps} columns={sessionsColumns} />
                    </CardContent>
                </Card>
            </Stack>
        </Container>
    );
}
