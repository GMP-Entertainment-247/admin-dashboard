import { toast } from "react-toastify";
import { createApiClient } from "../api";
import { useSingleState } from "./useSingleState";
import { AxiosResponse, Method } from "axios";
import { flattenErrorMessage } from "../errorHelpers";

export default function useMutation(
  url: string,
  method: Method,
  {
    showSuccessToast = true,
    showErrorToast = true,
  }: {
    showSuccessToast?: boolean;
    showErrorToast?: boolean;
  } = {}
) {
  const loading = useSingleState<boolean>(false);

  const mutate = (
    body?: Record<string, string>,
    params?: Record<string, string>
  ) => {
    loading.set(true);
    return createApiClient()
      .request({
        url,
        method,
        data: body,
        params,
      })
      .then((response) => {
        showSuccessToast && toast.success(response.data.message);
        return Promise.resolve(response.data as AxiosResponse<any>);
      })
      .catch((err) => {
        console.log(err);
        let errMessage = err.response.data.message;
        if (err.status >= 400 || err.status >= 499) {
          const errorMessage = flattenErrorMessage(errMessage);
          showErrorToast && toast.error(errorMessage);
          return Promise.reject(err.response);
        } else if (err.status >= 500 || err.status >= 599) {
          showErrorToast &&
            toast.error("Server Error! Please contact support.");
        } else {
          showErrorToast &&
            toast.error(
              "Your request can't be processed at this time, please try again later!"
            );
        }
      })
      .finally(() => {
        loading.set(false);
      });
  };

  return {
    mutate,
    loading: loading.get,
  };
}
