'use client'

import Link from "next/link";
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
    Link as CarbonLink
} from "@carbon/react";
import { CheckmarkOutline, View } from "@carbon/icons-react";
import { ProjectWithContributors, Solution, challengeWithCountedSolution } from "@/app/lib/definitions";
import { ArchiveChallengeButton, DeleteChallengeButton, UpdateChallengeButton } from "@/app/ui/challenges/buttons";
import { DeleteSolutionButton } from "@/app/ui/solution/buttons";
import { DeleteProjectButton, UpdateProjectButton } from "@/app/ui/projects/buttons"
import { useToggle } from "@/app/lib/hooks";
import UpdateProjectStatusModal from "./projects/update-status-modal";
import { useState } from "react";
import Pagination from "./pagination";

const ChallengeTable = ({
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
            <Table aria-label="challenges table">
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

const MySolutionTable = ({
    solutions,
    containerClassName
}: Readonly<{
    solutions?: Solution[]
    containerClassName?: string;
}>) => {
    return (
        <TableContainer
            title="Mes solutions"
            description="Cette vue à pour but de vous aidé à gérer les solutions que vous publiez."
            className={`${containerClassName ?? ''} mt-3`}
        >
            <Table aria-label="solutions table">
                <TableHead>
                    <TableRow>
                        <TableHeader>Lien du dépot distant</TableHeader>
                        <TableHeader>Titre du défi</TableHeader>
                        <TableHeader>Créer le</TableHeader>
                        <TableHeader>Actions</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {solutions?.map(solution => (
                        <TableRow key={solution.id}>
                            <TableCell>
                                <CarbonLink href={solution.repoUrl} target="_blank">
                                    {solution.repoUrl}
                                </CarbonLink>
                            </TableCell>
                            <TableCell>{solution.challenge.title}</TableCell>
                            <TableCell>{solution.createdAt.toLocaleDateString()}</TableCell>
                            <TableCell>
                                <div className="flex">
                                    <Link
                                        href={`/challenges/${solution.challenge.slug}`}
                                        passHref
                                    >
                                        <Button
                                            hasIconOnly
                                            iconDescription="Voir le défi"
                                            renderIcon={View}
                                            kind="ghost"
                                        />
                                    </Link>
                                    <DeleteSolutionButton solutionId={solution.id} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    )
}

const UserContributionsTable = ({
    contributions,
    containerClassName
}: Readonly<{
    contributions?: {
        id: string;
        title: string;
        issueUrl: string;
        solutionUrl: string | null;
    }[] | null;
    containerClassName?: string;
}>) => {
    return (
        <TableContainer
            title="Mes contributions"
            description="Ici vous trouverez l'ensemble des problèmes que vous avez résolu."
            className={`${containerClassName ?? ''} mt-3`}
        >
            <Table aria-label="contributions table">
                <TableHead>
                    <TableRow>
                        <TableHeader>Intitulé du problème</TableHeader>
                        <TableHeader>Lien du problème</TableHeader>
                        <TableHeader>Lien de votre pull request</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contributions?.map(contribution => (
                        <TableRow key={contribution.id}>
                            <TableCell>{contribution.title}</TableCell>
                            <TableCell>
                                <CarbonLink href={contribution.issueUrl} target="_blank">
                                    {contribution.issueUrl}
                                </CarbonLink>
                            </TableCell>
                            <TableCell>
                                {contribution.solutionUrl && <CarbonLink href={contribution.solutionUrl} target="_blank">
                                    {contribution.solutionUrl}
                                </CarbonLink>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    )
}

const MyProjectsTable = ({
    containerClassName,
    projects,
    totalProjects
}: Readonly<{
    containerClassName?: string;
    projects?: ProjectWithContributors[];
    totalProjects?: number;
}>) => {

    const [open, setOpenOrClose] = useToggle(false)
    const [currentProjectContributors, setCurrentProjectContributors] = useState<ProjectWithContributors | undefined>()

    const handleCloseModal = () => {
        setCurrentProjectContributors(undefined)
        setOpenOrClose()
    }

    return (
        <>
            <TableContainer
                title="Mes projets"
                description="Cette vue à pour but de vous aidé à gérer les projets que vous publiez."
                className={`${containerClassName ?? ''} mt-3`}
            >
                <TableToolbar>
                    <TableToolbarContent aria-hidden={false}>
                        <Link href="/dashboard/in/projects/create" passHref>
                            <Button
                                tabIndex={-1}
                                kind="primary"
                            >
                                Ajouter un projet
                            </Button>
                        </Link>
                    </TableToolbarContent>
                </TableToolbar>
                <Table aria-label="projects table">
                    <TableHead>
                        <TableRow>
                            <TableHeader>Titre</TableHeader>
                            <TableHeader>lien du problème</TableHeader>
                            <TableHeader>statut</TableHeader>
                            <TableHeader>Créer le</TableHeader>
                            <TableHeader>Actions</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects?.map(project => (
                            <TableRow key={project.id}>
                                <TableCell>{project.title}</TableCell>
                                <TableCell>
                                    <CarbonLink href={project.issueUrl} target="_blank">
                                        {project.issueUrl}
                                    </CarbonLink>
                                </TableCell>
                                <TableCell>{project.solved ? 'résolu' : 'non résolu'}</TableCell>
                                <TableCell>{project.createdAt.toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <div className="flex">
                                        <UpdateProjectButton projectId={project.id} />
                                        <DeleteProjectButton projectId={project.id} />
                                        {!project.solved && (<Button
                                            hasIconOnly
                                            iconDescription='Clôturer'
                                            onClick={() => {
                                                setCurrentProjectContributors(project)
                                                setOpenOrClose()
                                            }}
                                            renderIcon={CheckmarkOutline}
                                            kind='ghost'
                                        />)}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {totalProjects && (<Pagination
                totalItems={totalProjects}
            />)}
            {(currentProjectContributors && open) && <UpdateProjectStatusModal
                isOpen={open}
                onClose={handleCloseModal}
                project={currentProjectContributors}
            />}
        </>
    )
}

export {
    ChallengeTable,
    MyProjectsTable,
    MySolutionTable,
    UserContributionsTable
}