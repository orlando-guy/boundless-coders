'use client'

import React from 'react'
import { useWindowSize } from '@/app/lib/hooks'
import {
    usePositioner,
    useResizeObserver,
    useContainerPosition,
    MasonryScroller
} from 'masonic'
import { ProjectWithTags } from '@/app/lib/definitions'
import { ProjectTile } from '../tiles/tiles'

const ProjectGrid = ({
    projects,
    filterOptions
}: Readonly<{
    projects: ProjectWithTags[],
    filterOptions: IterableIterator<string>
}>) => {
    const containerRef = React.useRef(null)
    const [items, setItems] = React.useState(projects)
    const [windowWidth, windowHeight] = useWindowSize()
    const { offset, width } = useContainerPosition(containerRef, [
        windowWidth,
        windowHeight
    ])

    const positioner = usePositioner(
        { width, columnWidth: 290, columnGutter: 15 },
        [items]
    )

    const resizeObserver = useResizeObserver(positioner)

    React.useEffect(() => {
        setItems(projects)
    }, [filterOptions, projects])

    return (
        <MasonryScroller
            positioner={positioner}
            resizeObserver={resizeObserver}
            containerRef={containerRef}
            items={items}
            height={windowHeight}
            offset={offset}
            render={ProjectTile}
            className='mb-1'
        />
    )
}

export default ProjectGrid