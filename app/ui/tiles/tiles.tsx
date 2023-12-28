'use client'

import { ArrowRight } from "@carbon/icons-react";
import { ClickableTile, Tag, Theme, Tile } from "@carbon/react";
import Link from 'next/link'

const ClickableWithCustomIcon = (
    { title, description, href, className, tags }: Readonly<{
        title: string;
        href: string;
        description?: string;
        className?: string;
        tags?: {
            tag: {
                title: string;
            }
        }[];
    }>
) => {
    description ||= "Officia proident Lorem deserunt ex dolor Lorem ullamco et irure."
    const tileId = title.substring(0, 22).replaceAll(' ', '-')
    return (
        <Theme theme="g100" className="h-full">
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

export {
    ClickableWithCustomIcon,
    DefaultTile
}