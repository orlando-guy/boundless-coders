'use client'

import React from 'react'
import { Grid, Column, Checkbox, Dropdown } from '@carbon/react';
import { ClickableWithCustomIcon } from '@/app/ui/tiles/tiles'
import { ChallengesWithTags, tagsWithChallengesCount } from '../lib/definitions';
import Pagination from './pagination';
import { useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function ChallengeContentFrames(
    { data, tags, totalChallenges, className }
        : Readonly<{
            data: ChallengesWithTags;
            tags: tagsWithChallengesCount;
            totalChallenges: number;
            className?: string;
        }>
) {
    const searchParams = useSearchParams()
    const pathname = usePathname()

    if (!data || data.length === 0) {
        return <p className="mt-4">
            Auccune donnée disponible
        </p>
    }

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

    return (
        <Grid className={`content-frames ${className ?? ''}`}>
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
                                        {`${tag.title} (${tag._count.challenges})`}
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
                    />

                    <Dropdown
                        items={tags}
                        itemToString={(tag => tag ? `${tag.title} (${tag._count.challenges})` : '')}
                        itemToElement={(tag) =>
                            tag ? (
                                <Link
                                    href={createTopicURL(tag.title)}
                                    className="list-box__menu-item text-decoration-none"
                                >
                                    {`${tag.title} (${tag._count.challenges})`}
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
                <Grid>
                    {data.map(challenge => (
                        <Column lg={4} md={4} sm={4} key={challenge.id} className='mb-1'>
                            <ClickableWithCustomIcon
                                title={challenge.title}
                                href='/'
                                tags={challenge.tags}
                                description={challenge.description}
                            />
                        </Column>
                    ))}
                </Grid>
                <Pagination
                    totalItems={totalChallenges}
                />
            </Column>
        </Grid>
    )
}