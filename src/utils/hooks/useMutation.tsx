import { createApiClient } from "../api";
import { useSingleState } from "./useSingleState";
import { Method } from "axios";


export default function useMutation (url: string, method: Method) {
    const data = useSingleState(null)
    const loading = useSingleState<boolean>(false)
    const error = useSingleState(null)

    const mutate = (body?: Record<string, string>, params?: Record<string, string>) => {
        loading.set(true)
        return createApiClient().request({
            url,
            method,
            data: body,
            params
        })
        .then(response => {
            console.log(response)
            data.set(response.data)
        })
        .catch((err)=>{
            console.log(err.response)
            error.set(err)
        })
        .finally(()=>{
            loading.set(false)
        })
    }

    return {
        mutate,
        data: data.get,
        loading: loading.get,
        error: error.get,
    }
}