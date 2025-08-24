import { useEffect } from "react";
import { createApiClient } from "../api";
import { useSingleState } from "./useSingleState";

export default function useFetch <T = unknown> (url: string) {
    const data = useSingleState<T | null>(null)
    const loading = useSingleState<boolean>(false)
    const error = useSingleState(null)


    useEffect(()=>{
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])

    const getData = () => {
        loading.set(true)
        createApiClient().get<T>(url)
            .then(response => {
                console.log(response)
                data.set(response.data)
            })
            .catch((err)=>{
                error.set(err)
            })
            .finally(()=>{
                loading.set(false)
            })
    }

    const refetch = () => {
        getData()
    } 

    return {
        data: data.get,
        loading: loading.get,
        error: error.get,
        refetch,
    }
}