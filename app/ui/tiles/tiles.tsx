'use client'

import React from 'react';
import { ArrowRight, UserAvatar, Need, View } from "@carbon/icons-react";
import { Tags } from "@carbon/pictograms-react";
import { ClickableTile, ExpandableTile, Tag, Theme, Tile, TileAboveTheFoldContent, TileBelowTheFoldContent, Button } from "@carbon/react";
import Image from "next/image";
import Link from 'next/link'
import { mdToHTML } from '@/app/lib/utils';

export interface ProjectTileProps {
    data: {
        className?: string;
        description: string;
        id: string;
        issueUrl: string;
        resolvedBy: string | null;
        resolverImage: string | null;
        solutionUrl: string | null;
        solved: boolean;
        tags: {
            tag: {
                title: string;
            };
        }[];
        theme?: "g100" | "white" | "g10" | "g90";
        title: string;
        user: {
            name: string | null;
            image: string | null;
        };
    };
    index: number;
}

const ClickableWithCustomIcon = (
    { title, description, href, className, tags, theme }: Readonly<{
        title: string;
        href: string;
        description?: string;
        tags: {
            tag: {
                title: string;
            }
        }[];
        className?: string;
        theme?: "g100" | "white" | "g10" | "g90";
    }>
) => {
    description ||= "Officia proident Lorem deserunt ex dolor Lorem ullamco et irure."
    const tileId = title.substring(0, 22).replaceAll(' ', '-')
    return (
        <Theme theme={theme ?? "g100"} className="h-full">
            <Link href={href} passHref legacyBehavior className="h-full">
                <ClickableTile
                    id={tileId}
                    href={href}
                    renderIcon={ArrowRight}
                    disabled={false}
                    className={`clickable-tile h-full ${className ?? ''}`}
                >
                    <div className="flex flex-col gap-3 mb-3">
                        <h4 className="clickable-tile__heading">{title}</h4>
                        {description && (
                            <p className="clickable-tile__body">{description}</p>
                        )}
                        {tags && (<div className="flex gap-2 flex-wrap mt-4">
                            {tags.length > 0 && tags.map((tag) => (
                                <Tag
                                    className="some-class"
                                    type="warm-gray"
                                    title="Clear Filter"
                                    key={tag.tag.title}
                                >
                                    {tag.tag.title}
                                </Tag>
                            ))}
                        </div>)}
                    </div>
                </ClickableTile>
            </Link>
        </Theme>
    )
}

const DefaultTile = ({
    title,
    description,
    className
}: Readonly<{
    title: string;
    description?: string;
    className?: string;
}>) => {
    return (
        <Tile className={`clickable-tile h-full ${className ?? ''}`} id={title.replaceAll(' ', '-')}>
            <div className="flex flex-col gap-3 mb-3">
                <h4 className="clickable-tile__heading">{title}</h4>
                {description && (
                    <p className="clickable-tile__body">{description}</p>
                )}
            </div>
        </Tile>
    )
}


const ProjectTile = ({
    data,
    index
}: Readonly<ProjectTileProps>) => {
    const [parsedDescription, setParsedDescription] = React.useState<string | null>(null)
    const theme = data?.theme ?? 'white'
    React.useEffect(() => {
        mdToHTML(data.description)
            .then(parsedContent => setParsedDescription(parsedContent))
    }, [])
    return (
        <Theme theme={theme}>
            <ExpandableTile className="project-card">
                <TileAboveTheFoldContent>
                    <div className="flex flex-col gap-4 project-card__above-container">
                        <ul className="list-unstyle flex justify-between above-container__tiers">
                            <li>
                                <div className="flex flex-col gap-2">
                                    <small>Aide demandée: </small>
                                    <div className="flex items-center gap-2">
                                        <div className="user-profile-image">
                                            {data.user?.image ? (
                                                <Image
                                                    src={data.user.image}
                                                    width={56}
                                                    height={56}
                                                    alt='user profile picture'
                                                />
                                            ) : (
                                                <UserAvatar size={25} />
                                            )}
                                        </div>
                                        <small>{data.user?.name}</small>
                                    </div>
                                </div>
                            </li>
                            {data.solved && (<li>
                                <div className="flex flex-col gap-2">
                                    <small>Aidé par: </small>
                                    <div className="flex items-center gap-2">
                                        <div className="user-profile-image">
                                            {data.resolverImage ? (
                                                <Image
                                                    src={data.resolverImage}
                                                    width={56}
                                                    height={56}
                                                    alt='user profile picture'
                                                />
                                            ) : (
                                                <UserAvatar size={25} />
                                            )}
                                        </div>
                                        <small>{data?.resolvedBy}</small>
                                    </div>
                                </div>
                            </li>)}
                        </ul>

                        <h4>{data.title}</h4>

                        <div className="flex gap-2">
                            {data.tags.map(item => (
                                <Tag type="gray">{item.tag.title}</Tag>
                            ))}
                        </div>

                        {data.solved ? (
                            <Button
                                className="mt-3 mb-7"
                                href={data.solutionUrl || undefined}
                                renderIcon={View}
                                iconDescription="Contribuez à ce projet"
                                kind="tertiary"
                            >Voir la solution</Button>
                        ) : (
                            <Button
                                className="mt-3 mb-7"
                                href={data.issueUrl}
                                renderIcon={Need}
                                iconDescription="Contribuez à ce projet"
                                kind="tertiary"
                            >Contribuez</Button>
                        )}
                    </div>
                </TileAboveTheFoldContent>
                <TileBelowTheFoldContent>
                    {parsedDescription && (
                        <div className='project-detail'>
                            <article
                                className="markdown-body w-full py-3"
                                dangerouslySetInnerHTML={{ __html: parsedDescription }}
                            />
                        </div>
                    )}
                </TileBelowTheFoldContent>
            </ExpandableTile>
        </Theme>
    )
}

export {
    ClickableWithCustomIcon,
    DefaultTile,
    ProjectTile
}