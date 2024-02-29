'use client'

import React from 'react'
import {
    Checkbox,
    Column,
    Dropdown,
    Grid,
    InlineNotification,
} from '@carbon/react';

import Pagination from '@/app/ui/pagination'
import { ProjectWithTags, TagUsedByProjects } from '@/app/lib/definitions';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import ProjectGrid from './project-grid';

const ProjectContentFrames = ({
    projects,
    tags,
    totalProjects
}: Readonly<{
    projects: ProjectWithTags[];
    tags: TagUsedByProjects[];
    totalProjects: number;
}>) => {
    const [isSSR, setIsSSR] = React.useState(true)
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const filterOptions = searchParams.values()

    /** 
     * create an url that'll trigger projects filtering. 
     * E.g: https://boundless-coders.com/contribution/?page=1&topic=frontend
    */
    const createTopicURL = (topic: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', '1')
        if (topic) {
            params.set('topic', topic)
        } else {
            params.delete('topic')
        }
        return `${pathname}?${params.toString()}`
    }

    React.useEffect(() => {
        setIsSSR(false)
    }, [])

    if (isSSR) {
        return (<></>)
    }

    if (projects.length === 0) {
        return (
            <InlineNotification
                kind='info'
                hideCloseButton
                statusIconDescription='Message important'
                subtitle="Aucun projet requierant une contribution n'a encore été soumit pour le moment."
                title='Information'
                className='mb-4'
            />
        )
    }

    return (
        <Grid className='content-frames'>
            <Column xlg={3} lg={4} md={8} sm={4} className="content-frames__sidebar px-0">
                <div className="content-frames__filters pt-4">
                    <div className='filters-box'>
                        <h4 className="heading-3 px-6 mb-2">Status</h4>
                        <ul className='list-unstyle content-frames__filter-options'>
                            {['Non Clôturé', 'Clôturé'].map(v => (
                                <li className="px-6 pt-2 pb-2" key={v}>
                                    <Checkbox id={`checkbox-${v}`} checked={false} labelText={v} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="filters-box">
                        <h4 className="heading-3 px-6 mb-2">Sujets</h4>
                        <ul className='list-unstyle content-frames__filter-options'>
                            {tags.map(tag => (
                                <li
                                    key={tag.id}
                                >
                                    <Link href={createTopicURL(tag.title)} className="px-6 pt-2 pb-2">
                                        {`${tag.title} (${tag._count.projects})`}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Column>

            <Column xlg={1} lg={0}></Column>

            <Column xlg={12} lg={12} md={8} sm={4} className='content-frames__right-side'>

                <div className="mobile-filters">
                    <Dropdown
                        items={[
                            { id: 'option-0', text: 'Non clôturé' },
                            { id: 'option-1', text: 'Clôturé' },
                        ]}
                        itemToString={(item => item ? item.text : '')}
                        type='inline'
                        label="Status"
                        id='status-selector'
                        size='md'
                        titleText=""
                    />

                    <Dropdown
                        items={tags}
                        itemToString={(tag => tag ? `${tag.title} (${tag._count.projects})` : '')}
                        itemToElement={(tag) => tag ? (
                            <Link
                                href={createTopicURL(tag.title)}
                                className="list-box__menu-item text-decoration-none"
                            >
                                {`${tag.title} (${tag._count.projects})`}
                            </Link>
                        ) : (<>''</>)}
                        type='inline'
                        label="Sujets"
                        id='topics-selector'
                        size='md'
                        titleText=""
                    />
                </div>

                <ProjectGrid
                    projects={projects}
                    filterOptions={filterOptions}
                />

                <Pagination
                    totalItems={totalProjects}
                />
            </Column>
        </Grid>
    )
}

export {
    ProjectContentFrames
}