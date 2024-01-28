'use client'

import { Column, Grid, Tag } from '@carbon/react'
import { $Enums } from '@prisma/client';
import { translator } from '../lib/utils';
import { ModalStateManager } from './solution/create-solution-modal';

const ChallengeDetail = (
    { content, level, tags, challengeId, overallSolution, isAuthUser = false }: Readonly<{
        challengeId: string;
        content: string;
        level: $Enums.Level;
        tags: {
            tag: {
                title: string;
            };
        }[];
        overallSolution: number;
        /***
         * checks if the user is authenticated
         * 
         * @default false
         */
        isAuthUser?: boolean;
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
                <div className="flex flex-col gap-3">
                    <div className='flex items-center gap-2 mt-2'>
                        <span>Ce défi est de niveau: </span>
                        <Tag>{translator(level)}</Tag>
                    </div>
                    {isAuthUser && <ModalStateManager challengeId={challengeId} />}
                    {(isAuthUser && overallSolution > 0) && (<p>
                        <span>{overallSolution}</span> {`solution${overallSolution > 1 ? 's' : ''} disponible${overallSolution > 1 ? 's' : ''} pour ce défi`}
                    </p>)}
                </div>
            </Column>
        </Grid>
    )
}

export default ChallengeDetail