import { Header } from '@components/header';
import { ThemedLayoutV2 } from '@refinedev/mui';
import React from 'react'

type Props = {
    children?: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
    return (
        <ThemedLayoutV2 Header={Header}>{children}</ThemedLayoutV2>
    )
}

export default DashboardLayout