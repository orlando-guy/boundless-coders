'use client'

import { Box, Edit, TrashCan } from "@carbon/icons-react";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
    TableToolbar,
    TableToolbarContent,
} from "@carbon/react";

export const ChallengeTable = () => {
    return (
        <TableContainer
            title="Challenges"
            description="With batch actions. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas accumsan mauris sed congue egestas. Integer varius mauris vel arcu pulvinar bibendum non sit amet ligula. Nullam ut nisi eu tellus aliquet vestibulum vel sit amet odio."
            className="mt-3"
        >
            <TableToolbar>
                <TableToolbarContent aria-hidden={false}>
                    <Button
                        tabIndex={-1}
                        onClick={() => console.log('Add new row')}
                        kind="primary"
                    >
                        Ajouter un nouveau
                    </Button>
                </TableToolbarContent>
            </TableToolbar>
            <Table aria-label="sample table">
                <TableHead>
                    <TableRow>
                        <TableHeader>Titre</TableHeader>
                        <TableHeader>Status</TableHeader>
                        <TableHeader>Créer le</TableHeader>
                        <TableHeader>Solutions</TableHeader>
                        <TableHeader>Actions</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Load Balancer 1</TableCell>
                        <TableCell>published</TableCell>
                        <TableCell>23/09/12 12:14</TableCell>
                        <TableCell>45</TableCell>
                        <TableCell>
                            <div className="flex">
                                <Button
                                    hasIconOnly
                                    iconDescription="Edit"
                                    onClick={function noRefCheck() { }}
                                    renderIcon={Edit}
                                    kind="ghost"
                                />
                                <Button
                                    hasIconOnly
                                    iconDescription="Supprimer"
                                    onClick={function noRefCheck() { }}
                                    renderIcon={TrashCan}
                                    kind="ghost"
                                />
                                <Button
                                    hasIconOnly
                                    iconDescription="Archiver"
                                    onClick={function noRefCheck() { }}
                                    renderIcon={Box}
                                    kind="ghost"
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Load Balancer 1</TableCell>
                        <TableCell>published</TableCell>
                        <TableCell>23/09/12 12:14</TableCell>
                        <TableCell>45</TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                <span>Consulter</span>
                                <span>Modifier</span>
                                <span>Supprimer</span>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Load Balancer 1</TableCell>
                        <TableCell>published</TableCell>
                        <TableCell>23/09/12 12:14</TableCell>
                        <TableCell>45</TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                <span>Consulter</span>
                                <span>Modifier</span>
                                <span>Supprimer</span>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Load Balancer 1</TableCell>
                        <TableCell>published</TableCell>
                        <TableCell>23/09/12 12:14</TableCell>
                        <TableCell>45</TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                <span>Consulter</span>
                                <span>Modifier</span>
                                <span>Supprimer</span>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer >
    )
}