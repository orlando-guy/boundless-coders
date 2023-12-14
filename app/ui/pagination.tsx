'use client'

import { useState } from 'react'
import { unstable_Pagination as CdsPagination } from "@carbon/react"
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

export default function Pagination({ totalItems }: Readonly<{ totalItems: number }>) {
    const [currentPageSize, setCurrentPageSize] = useState(10)
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams)
        if (page) {
            params.set('page', page.toString())
        } else {
            params.delete('page')
        }
        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <CdsPagination
            backwardText="Previous page"
            forwardText="Next page"
            itemsPerPageText="Items per page:"
            onChange={({ page, pageSize }: {page: number, pageSize: number}) => {
                if (pageSize !== currentPageSize) {
                    setCurrentPageSize(pageSize)
                }
                handlePageChange(page)
            }}
            page={1}
            pageSize={currentPageSize}
            pageSizes={[10]}
            size="md"
            totalItems={totalItems}
        />
    )
}