import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        try {
            const jsonValue = localStorage.getItem(key);

            if (jsonValue !== null) return JSON.parse(jsonValue);

            if (typeof initialValue === 'function') {
                return (initialValue as () => T)();
            }

            return initialValue;
        } catch (e) {
            console.error("Error reading localStorage", e);

            if (typeof initialValue === 'function') {
                return (initialValue as () => T)();
            }

            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error("Error writing localStorage", e);
        }
    }, [key, value]);

    return [value, setValue] as const;
}