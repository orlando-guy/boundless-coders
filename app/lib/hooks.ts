import React from 'react';

interface WindowSizeOptions {
    /**
     * The amount of time in ms you want to wait after the latest resize event before updating the size of the window in state.
     * 
     * @default 100
     */
    wait?: number;
    /**
     * When true, updates the size of the window on the leading edge (right away) in addition to debouncing any additional events
     * 
     * @default false
     */
    leading?: boolean;
    /**
     * The initial width to use when there is no window object, e.g. SSR
     * 
     * @default 0
     */
    initialWidth?: number;
    /**
     * The initial height to use when there is no window object, e.g. SSR
     * 
     * @default 0
     */
    initialHeight?: number;
}

const useDebouncedCallback = (callback: Function, timer: number) => {
    const timeoutRef = React.useRef<number | null>(null)
    const debouncedCallback = React.useCallback((...args: any[]) => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = window.setTimeout(() => {
            callback(...args);
        }, timer)
    }, [callback, timer])

    React.useEffect(() => {
        return () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    return debouncedCallback;
}

function useToggle(initialValue: boolean): [boolean, () => void] {
    const [value, setValue] = React.useState(initialValue);

    const toggleValue = React.useCallback(() => {
        setValue((currentValue) => !currentValue);
    }, []);
    return [value, toggleValue];
}

export {
    useDebouncedCallback,
    useToggle
}

/**
 * A hook that returns the current width and height of the window. This hook is debounced, 
 * meaning it will wait (100ms by default) for the resize events to stop firing before it actually updates its state with the new width and height.
 */
export function useWindowSize({
    wait = 100,
    leading = false,
    initialWidth = 0,
    initialHeight = 0
}: WindowSizeOptions = {}) {

    const [windowSize, setWindowSize] = React.useState([initialWidth, initialHeight])

    const updateSize = () => setWindowSize([window.innerWidth, window.innerHeight])

    React.useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null

        const handleResize = () => {
            if (leading && !timeoutId) {
                // Update size immediately on the leading edge
                updateSize()
            }

            if (timeoutId) {
                clearTimeout(timeoutId)
            }

            timeoutId = setTimeout(() => {
                updateSize();
                timeoutId = null;
            }, wait)
        }

        // initial size
        updateSize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)

            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        }
    }, [wait, leading, initialWidth, initialHeight])

    return windowSize
}