import React from 'react';

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
