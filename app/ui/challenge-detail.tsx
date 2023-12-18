'use client'

import { Column, Grid, Tag } from '@carbon/react'
import { $Enums } from '@prisma/client';
import { translator } from '../lib/utils';

const ChallengeDetail = (
    { content, level, tags }: Readonly<{
        content: string;
        level: $Enums.Level;
        tags: {
            tag: {
                title: string;
            };
        }[];
    }>) => {
    return (
        <Grid className='py-6 challenge-detail'>
            <Column xlg={12} lg={12} md={8} sm={4} className="challenge-detail__ls">
                <article className="px-1 markdown-body" dangerouslySetInnerHTML={{ __html: content }} />
            </Column>
            <Column xlg={1} lg={0}></Column>
            <Column xlg={3} lg={4} md={8} sm={4} className='challenge-detail__rs'>
                <div className="flex gap-3 items-center">
                    <span>Tags: </span>
                    <ul className="list-unstyle flex flex-wrap flex-1 gap-2">
                        {tags.map(tag => (
                            <li key={tag.tag.title}>
                                <Tag
                                    type='outline'
                                    title='Clear Filter'
                                >{tag.tag.title}</Tag>
                            </li>
                        ))}
                    </ul>
                </div>
                <p className='mt-2'>Ce défi est de niveau: <Tag>{translator(level)}</Tag></p>
            </Column>
        </Grid>
    )
}

export default ChallengeDetail