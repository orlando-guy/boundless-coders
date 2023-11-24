'use client'

const CarbonWrapper = ({
    children
}: Readonly<{ children: React.ReactNode }>) => {
    return (
        <>{children}</>
    )
}

export default CarbonWrapper;