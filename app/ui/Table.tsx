'use client'

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
import { ArchiveChallengeButton, DeleteChallengeButton, UpdateChallengeButton } from "@/app/ui/challenges/buttons";
import { View } from "@carbon/icons-react";

export const ChallengeTable = ({
    dataChallenges,
    className
}: Readonly<{
    dataChallenges?: challengeWithCountedSolution;
    className?: string;
}>) => {
    return (
        <TableContainer
            title="Mes Challenges"
            description="Cette vue à pour but de vous aidé à gérer les défis que vous publiez."
            className={`${className ?? ''} mt-3`}
        >
            <TableToolbar>
                <TableToolbarContent aria-hidden={false}>
                    <Link href="/dashboard/in/my-challenges/create" passHref>
                        <Button
                            tabIndex={-1}
                            kind="primary"
                        >
                            Ajouter un challenge
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
                    {dataChallenges?.map(challenge => (
                        <TableRow key={challenge.id}>
                            <TableCell>{challenge.title}</TableCell>
                            <TableCell>{challenge.published ? "publié" : "en attente"}</TableCell>
                            <TableCell>{challenge.createdAt.toLocaleDateString()}</TableCell>
                            <TableCell>{challenge._count.solutions}</TableCell>
                            <TableCell>
                                <div className="flex">
                                    <Link
                                        href={`/challenges/${challenge.slug}`}
                                        passHref
                                    >
                                        <Button
                                            hasIconOnly
                                            iconDescription="Voir le défi"
                                            renderIcon={View}
                                            kind="ghost"
                                        />
                                    </Link>
                                    <UpdateChallengeButton id={challenge.id} />
                                    <DeleteChallengeButton id={challenge.id} />
                                    <ArchiveChallengeButton id={challenge.id} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    )
}