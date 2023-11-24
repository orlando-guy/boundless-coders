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
import { TableHeaders, TableRows } from '../lib/definitions';

const RepositoryTable = ({ rows, headers }: Readonly<{ rows: TableRows[], headers: TableHeaders[] }>) => {
    return (
        // <DataTable
        //     rows={rows}
        //     headers={headers}
        //     render={({
        //         rows,
        //         headers,
        //         getHeaderProps,
        //         getRowProps,
        //         getTableProps
        //     }) => (
        //         <TableContainer
        //             title="Carbon Repositories"
        //             description="A collection of public Carbon repositories"
        //         >
        //             <Table {...getTableProps()}>
        //                 <TableHead>
        //                     <TableRow>
        //                         <TableExpandHeader />
        //                         {headers.map((header) => (
        //                             <TableHeader key={header.key} {...getHeaderProps({ header })}>
        //                                 {header.header}
        //                             </TableHeader>
        //                         ))}
        //                     </TableRow>
        //                 </TableHead>
        //                 <TableBody>
        //                     {rows.map((row) => (
        //                         <React.Fragment key={row.id}>
        //                             <TableExpandRow {...getRowProps({ row })}>
        //                                 {row.cells.map((cell) => (
        //                                     <TableCell key={cell.id}>{cell.value}</TableCell>
        //                                 ))}
        //                             </TableExpandRow>
        //                             <TableExpandedRow colSpan={headers.length + 1}>
        //                                 <p>Row description</p>
        //                             </TableExpandedRow>
        //                         </React.Fragment>
        //                     ))}
        //                 </TableBody>
        //             </Table>
        //         </TableContainer>
        //     )}
        // />
        <>Hello from repo page</>
    )
}

export default RepositoryTable