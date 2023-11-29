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
import { TableHeaders, listUserReposResponse } from '../lib/definitions';

const RepositoryTable = (
    { rows, headers }
        : Readonly<{ rows: listUserReposResponse['data'] | [], headers: TableHeaders[] }>
) => {
    const getRowDescription = (rowId: number) => {
        const row = rows.find(({ id }) => id === rowId)
        return row ? row.description : ''
    }
    const newRows = rows.map(r => {
        let row = {
            ...r,
            id: r['id'].toString(),
        }
        return row
    })
    return (
        <DataTable
            rows={newRows}
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
                                <TableExpandHeader id="carbon-expander" />
                                {headers.map((header) => (
                                    <TableHeader {...getHeaderProps({ header })} key={header.key }>
                                        {header.header}
                                    </TableHeader>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                let expandedValue = getRowDescription(Number(row.id))
                                return (
                                    <React.Fragment key={row.id}>
                                    <TableExpandRow
                                        aria-controls='name'
                                        isExpanded={false}
                                        {...getRowProps({ row })}
                                        onExpand={(e: React.MouseEvent) => console.log(e)}
                                    >
                                        {row.cells.map((cell) => (
                                            <TableCell key={cell.id}>{cell.value}</TableCell>
                                        ))}
                                    </TableExpandRow>
                                    <TableExpandedRow colSpan={headers.length + 1}>
                                        <p>{expandedValue}</p>
                                    </TableExpandedRow>
                                </React.Fragment>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        />
    )
}

export default RepositoryTable