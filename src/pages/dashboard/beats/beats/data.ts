import { createApiClient, type ApiResponse } from "../../../../utils/api";

export const createBeat = async (
  formData: FormData
): Promise<ApiResponse<null>> => {
  const response = await createApiClient({ noTimeout: true }).post(
    "/admin/beats/create",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateBeat = async (
  formData: FormData
): Promise<ApiResponse<null>> => {
  const response = await createApiClient({ noTimeout: true }).post(
    "/admin/beats/update",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteBeat = async (
  beat_id: number | string
): Promise<ApiResponse<null>> => {
  const response = await createApiClient().post("/admin/beats/remove", {
    beat_id,
  });
  return response.data;
};
