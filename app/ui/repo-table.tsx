import React from 'react';
import {
    DataTable,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableExpandHeader,
    TableHeader,
    TableBody,
    TableExpandRow,
    TableCell,
    TableExpandedRow
} from '@carbon/react';
import { TableHeaders, TableRows, listUserReposResponse } from '../lib/definitions';

const RepositoryTable = (
    { rows, headers }
        : Readonly<{ rows: listUserReposResponse['data'] | [], headers: TableHeaders[] }>
) => {
    // if ( !rows ||  rows === undefined) return (<></>)
    const getRowDescription = (rowId: number) =>  {
        const row = rows.find(({ id }) => id === rowId)
        return row ? row.description : ''
    }
    return (
        <DataTable
            rows={rows}
            headers={headers}
            render={({
                rows,
                headers,
                getHeaderProps,
                getRowProps,
                getTableProps,
            }) => (
                <TableContainer
                    title="Contribution Repositories"
                    description="Une collection de projets public dont vous pourez apportez votre contribution."
                >
                    <Table {...getTableProps()}>
                        <TableHead>
                            <TableRow>
                                <TableExpandHeader />
                                {headers.map((header) => (
                                    <TableHeader key={header.key} {...getHeaderProps({ header })}>
                                        {header.header}
                                    </TableHeader>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <React.Fragment key={row.id}>
                                    <TableExpandRow {...getRowProps({ row })}>
                                        {row.cells.map((cell) => (
                                            <TableCell key={cell.id}>{cell.value}</TableCell>
                                        ))}
                                    </TableExpandRow>
                                    <TableExpandedRow colSpan={headers.length + 1}>
                                        <p>{getRowDescription(Number(row.id))}</p>
                                    </TableExpandedRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        />
    )
}

export default RepositoryTable