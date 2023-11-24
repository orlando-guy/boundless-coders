'use client'
import { Button } from "@carbon/react"

export function CarbonButton({ 
    children
}: Readonly<{ children: React.ReactNode }>) {
    return <Button>{children}</Button>
}