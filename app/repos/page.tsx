'use client'

import React from 'react';
import { Octokit } from '@octokit/core';
import RepositoryTable from '@/app/ui/repo-table';
import { Grid, Column, Link, DataTableSkeleton } from '@carbon/react';
import { listUserReposResponse } from '../lib/definitions';
// import { Pagination } from 'carbon-components-react';


const octokitClient = new Octokit({});

const headers = [
    {
        key: 'name',
        header: 'Name',
    },
    {
        key: 'createdAt',
        header: 'Created',
    },
    {
        key: 'updatedAt',
        header: 'Updated',
    },
    {
        key: 'issueCount',
        header: 'Open Issues',
    },
    {
        key: 'stars',
        header: 'Stars',
    },
    {
        key: 'links',
        header: 'Links',
    },
];

const getRowItems = (rows: listUserReposResponse['data']) =>
    rows.map((row) => ({
        ...row,
        key: row.id,
        stars: row.stargazers_count,
        issueCount: row.open_issues_count,
        createdAt: new Date(row.created_at as string).toLocaleDateString(),
        updatedAt: new Date(row.updated_at as string).toLocaleDateString(),
        links: <LinkList url={row.html_url} homepageUrl={row?.url} />,
    }));

const LinkList = (
    { url, homepageUrl }
        : Readonly<{ url: string, homepageUrl?: string }>
) => (
    <ul style={{ display: 'flex' }}>
        <li>
            <Link href={url}>Github</Link>
        </li>
        {homepageUrl && (
            <li>
                <span>&nbsp;|&nbsp;</span>
                <Link>Homepage</Link>
            </li>
        )}
    </ul>
)

export default function Repository() {

    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<string>()
    const [rows, setRows] = React.useState<listUserReposResponse['data'] | []>([])
    const [firstRowIndex, setFirstRowIndex] = React.useState(0)
    const [currentPageSize, setCurrentPageSize] = React.useState(10)

    React.useEffect(() => {
        async function getCarbonRepos() {
            const res = await octokitClient.request('GET /orgs/{org}/repos', {
                org: 'carbon-design-system',
                per_page: 75,
                sort: 'updated',
                direction: 'desc',
            });

            if (res.status === 200) {
                const rows = getRowItems(res.data)
                if (rows) {
                    setRows(rows)
                }
            } else {
                setError('Error obtaining Repository data');
            }
            setLoading(false)
        }
        getCarbonRepos();
    }, [])

    if (loading) {
        return (
            <Grid className='repo-page'>
                <Column lg={16} md={8} sm={4} className="repo-page__r1">
                    <DataTableSkeleton
                        columnCount={headers.length + 1}
                        rowCount={10}
                        headers={headers}
                    />
                </Column>
            </Grid>
        )
    }

    if (error) {
        return `Error! ${error}`
    }

    return (
        <Grid>
            <Column lg={16} md={8} sm={4} className='repo-page__r1'>
                <RepositoryTable
                    headers={headers}
                    rows={rows.slice(firstRowIndex, firstRowIndex + currentPageSize)}
                />
                {/* <Pagination
                    totalItems={rows.length}
                    backwardText='Previous page'
                    forwardText="Next page"
                    pageSize={currentPageSize}
                    pageSizes={[5, 10, 15, 25]}
                    itemsPerPageText="Items per page"
                    onChange={({ page, pageSize }) => {
                        if (pageSize !== currentPageSize) {
                            setCurrentPageSize(pageSize)
                        }
                        setFirstRowIndex(pageSize * (page - 1))
                    }}
                /> */}
            </Column>
        </Grid>
    )
}