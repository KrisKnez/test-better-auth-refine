"use client";

import React from "react";

import { Avatar, Card, CardContent, Container, Grid2, List, Stack, Typography } from "@mui/material";
import { authClient } from "@lib/auth-client";

export default function ProfilePage() {
    const { data } = authClient.useSession();

    const profileImage = data?.user.image

    authClient.organization.list().then(res => console.log("kk:", res));

    return (
        <Container maxWidth="md">
            <Stack alignItems="center">
                <Avatar
                    {...profileImage && { src: profileImage }}
                    sx={{
                        width: 100,
                        height: 100,
                    }} />

                <Typography variant="h4" sx={{ mt: 2 }}>
                    Welcome, {data?.user.name || "Guest"}!
                </Typography>
            </Stack>
        </Container>
    );
}
