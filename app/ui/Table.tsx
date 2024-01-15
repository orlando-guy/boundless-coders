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
import { challengeWithCountedSolution } from "../lib/definitions";
import Link from "next/link";
import { DeleteChallengeButton, UpdateChallengeButton } from "@/app/ui/challenges/buttons";

export const ChallengeTable = ({
    dataChallenges,
    className
}: Readonly<{
    dataChallenges?: challengeWithCountedSolution;
    className?: string;
}>) => {
    return (
        <TableContainer
            title="Challenges"
            description="With batch actions. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas accumsan mauris sed congue egestas. Integer varius mauris vel arcu pulvinar bibendum non sit amet ligula. Nullam ut nisi eu tellus aliquet vestibulum vel sit amet odio."
            className={`${className ?? ''} mt-3`}
        >
            <TableToolbar>
                <TableToolbarContent aria-hidden={false}>
                    <Link href="/dashboard/in/my-challenges/create" passHref>
                        <Button
                            tabIndex={-1}
                            kind="primary"
                        >
                            Ajouter un nouveau
                        </Button>
                    </Link>
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
                    {dataChallenges && dataChallenges
                        .map(challenge => (
                            <TableRow key={challenge.id}>
                                <TableCell>{challenge.title}</TableCell>
                                <TableCell>{challenge.published ? "publié" : "en attente"}</TableCell>
                                <TableCell>{challenge.createdAt.toLocaleDateString()}</TableCell>
                                <TableCell>{challenge._count.solutions}</TableCell>
                                <TableCell>
                                    <div className="flex">
                                        <UpdateChallengeButton id={challenge.id} />
                                        <DeleteChallengeButton id={challenge.id} />
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
                        ))}
                </TableBody>
            </Table>
        </TableContainer >
    )
}