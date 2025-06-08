"use client";

import React from "react";

import { Box, Button, Card, CardActions, CardContent, CardHeader, Container, List, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DateField, useDataGrid } from "@refinedev/mui";

import { UAParser } from 'ua-parser-js';
import { Form, FormProvider, useForm } from "react-hook-form";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { authClient } from "@lib/auth-client";

export default function SecurityPage() {

    const sessionsDataGrid = useDataGrid({
        dataProviderName: "sessions",
    });
    const sessionsColumns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "createdAt",
                headerName: "Logged In",
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

    const accountsDataGrid = useDataGrid({
        dataProviderName: "accounts",
    });
    const accountsColumns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "createdAt",
                headerName: "Connected",
                minWidth: 150,
                display: "flex",
                flex: 1,
                renderCell: function render({ value }) {
                    return <DateField value={value} format="MMMM D, YYYY h:mm A" />;
                },
            },
            {
                field: "updatedAt",
                headerName: "Updated",
                minWidth: 150,
                display: "flex",
                flex: 1,
                renderCell: function render({ value }) {
                    return <DateField value={value} format="MMMM D, YYYY h:mm A" />;
                },
            },
            {
                field: "provider",
                headerName: "Provider",
                minWidth: 100,
                display: "flex",
                flex: 1,
            },
        ],
        []
    );

    const passwordResetForm = useForm({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    return (
        <Container maxWidth="md">
            <Stack spacing={2} sx={{ mb: 2 }}>
                <Card>
                    <FormProvider {...passwordResetForm}>
                        <Box component="form"
                            onSubmit={passwordResetForm.handleSubmit(async ({
                                currentPassword,
                                newPassword,
                            }) => {
                                const result = await authClient.changePassword({
                                    currentPassword: currentPassword,
                                    newPassword: newPassword,
                                });

                                if (result.error) {
                                    passwordResetForm.setError("currentPassword", {
                                        type: "manual",
                                        message: result.error.message || "Failed to change password",
                                    });
                                    return;
                                }

                                passwordResetForm.reset();
                            })}
                            noValidate
                        >
                            <CardHeader title="Change Password" />
                            <CardContent>
                                <Stack spacing={2}>
                                    <TextFieldElement name="currentPassword" type="password" label="Current Password" required fullWidth />
                                    <TextFieldElement name="newPassword" type="password" label="New Password" required fullWidth />
                                    <TextFieldElement
                                        name="confirmPassword"
                                        type="password"
                                        label="Confirm Password"
                                        required
                                        rules={{
                                            validate: (value, formValues) => {
                                                return value === formValues.newPassword || "Passwords do not match";
                                            },
                                        }}
                                        fullWidth
                                    />
                                </Stack>
                                {/* TODO: Add success message */}
                            </CardContent>
                            <CardActions sx={{ justifyContent: "flex-end" }}>
                                <Button type="submit">Change Password</Button>
                            </CardActions>
                        </Box>
                    </FormProvider>
                </Card>
                <Card>
                    <CardHeader title="Active Sessions" />
                    <CardContent>
                        <DataGrid {...sessionsDataGrid.dataGridProps} columns={sessionsColumns} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader title="Connected Accounts" />
                    <CardContent>
                        <DataGrid {...accountsDataGrid.dataGridProps} columns={accountsColumns} />
                    </CardContent>
                </Card>
            </Stack>
        </Container >
    );
}
