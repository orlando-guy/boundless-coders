'use client'

import React from 'react'
import { Masonry } from 'masonic';
import {
    Checkbox,
    Column,
    Dropdown,
    Grid,
    InlineNotification,
} from '@carbon/react';

import Pagination from '@/app/ui/pagination'
import { ProjectTile } from '@/app/ui/tiles/tiles';
import { ProjectWithTags, TagUsedByProjects } from '@/app/lib/definitions';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

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

    // create an url that'll trigger projects filtering
    // e.g: https://boundless-coders.com/contribution/?&page=1&topic=frontend
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

    const items = projects

    if (items.length === 0) {
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
                        <h4 className="heading-3 px-6 mb-2">Difficultées</h4>
                        <ul className='list-unstyle content-frames__filter-options'>
                            {['Débutant', 'Moyen', 'Avancé'].map(v => (
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
                            { id: 'option-0', text: 'Débutant' },
                            { id: 'option-1', text: 'Moyen' },
                            { id: 'option-2', text: 'Avancé' },
                        ]}
                        itemToString={(item => item ? item.text : '')}
                        type='inline'
                        label="Difficulté"
                        id='difficulties-selector'
                        size='md'
                        titleText=""
                    />

                    <Dropdown
                        items={tags}
                        itemToString={(tag => tag ? `${tag.title} (${tag._count.projects})` : '')}
                        itemToElement={(tag) =>
                            tag ? (
                                <Link
                                    href={createTopicURL(tag.title)}
                                    className="list-box__menu-item text-decoration-none"
                                >
                                    {`${tag.title} (${tag._count.projects})`}
                                </Link>
                            ) : (
                                <>''</>
                            )
                        }
                        type='inline'
                        label="Sujets"
                        id='topics-selector'
                        size='md'
                    />
                </div>

                <Masonry
                    items={items}
                    columnGutter={15}
                    columnWidth={290}
                    render={ProjectTile}
                    className='mb-1'
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