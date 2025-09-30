import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function useQueryParams() {
    const [searchParams, setSearchParams] = useSearchParams();

    const get = useCallback(
        (name: string): string | null => {
            return searchParams.get(name);
        }, [searchParams]
    );

    const set = useCallback(
        (name: string, value: string): void => {
            const newParams = new URLSearchParams(searchParams);
            newParams.set(name, value);
            setSearchParams(newParams);
        }, [searchParams, setSearchParams]
    );

    const remove = useCallback(
        (name: string): void => {
            const newParams = new URLSearchParams(searchParams);
            newParams.delete(name);
            setSearchParams(newParams);
        }, [searchParams, setSearchParams]
    );

    const setMany = useCallback(
        (entries: Record<string, string>): void => {
            const newParams = new URLSearchParams(searchParams);
            Object.entries(entries).forEach(([key, value]) => {
                newParams.set(key, value);
            });
            setSearchParams(newParams);
        }, [searchParams, setSearchParams]
    );

    return {
        get,
        set,
        remove,
        setMany,
        all: searchParams,
    };
}
