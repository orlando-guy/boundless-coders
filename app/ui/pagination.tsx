'use client'

import { useState } from 'react'
import { unstable_Pagination as CdsPagination } from "@carbon/react"
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

export default function Pagination({ totalItems }: Readonly<{ totalItems: number }>) {
    const ITEM_PER_PAGE = 10
    const [currentPageSize, setCurrentPageSize] = useState(ITEM_PER_PAGE)
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

    if (totalItems <= ITEM_PER_PAGE) {
        return <></>
    }

    return (
        <CdsPagination
            backwardText="Previous page"
            forwardText="Next page"
            itemsPerPageText="Items per page:"
            onChange={({ page, pageSize }: { page: number, pageSize: number }) => {
                if (pageSize !== currentPageSize) {
                    setCurrentPageSize(pageSize)
                }
                handlePageChange(page)
            }}
            page={1}
            pageSize={currentPageSize}
            pageSizes={[ITEM_PER_PAGE]}
            size="md"
            totalItems={totalItems}
        />
    )
}