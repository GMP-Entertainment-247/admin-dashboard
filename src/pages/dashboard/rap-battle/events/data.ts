import { createApiClient, type ApiResponse } from "../../../../utils/api";

export const createEvent = async (
  formData: FormData
): Promise<ApiResponse<null>> => {
  const response = await createApiClient().post(
    "/admin/events/create",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateEvent = async (
  formData: FormData
): Promise<ApiResponse<null>> => {
  const response = await createApiClient().post(
    "/admin/events/update",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteEvent = async (
  id: number | string
): Promise<ApiResponse<null>> => {
  const response = await createApiClient().post("/admin/events/delete", {
    id,
  });

  return response.data;
};
