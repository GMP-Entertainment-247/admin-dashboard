import { useEffect, useRef } from "react";
import { createApiClient } from "../api";
import { useSingleState } from "./useSingleState";

export default function useFetch <T = unknown> (url: string) {
    const data = useSingleState<T | null>(null)
    const loading = useSingleState<boolean>(false)
    const error = useSingleState(null)
    const attempts = useRef(0);
    const MAX_ATTEMPTS = 4;

    const getData = () => {
        loading.set(true)
        createApiClient().get<T>(url)
            .then(response => {
                data.set(response.data)
                error.set(null)
                attempts.current = 0; // reset on success
            })
            .catch((err)=>{
                error.set(err)
                if (attempts.current < MAX_ATTEMPTS - 1) {
                    attempts.current += 1;
                    getData();
                }
            })
            .finally(()=>{
                loading.set(false)
            })
    }

    useEffect(()=>{
        attempts.current = 0;
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])

    const refetch = () => {
        attempts.current = 0;
        getData()
    } 

    return {
        data: data.get,
        loading: loading.get,
        error: error.get,
        refetch,
    }
}