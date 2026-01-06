import { createApiClient, type ApiResponse } from "../../../../utils/api";

export const createBeat = async (
  formData: FormData
): Promise<ApiResponse<null>> => {
  const response = await createApiClient().post(
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
  const response = await createApiClient().post("/admin/beats/edit", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteBeat = async (
  id: number | string
): Promise<ApiResponse<null>> => {
  // TODO: Replace with actual endpoint when ready
  // const response = await createApiClient().post("/admin/beats/delete", {
  //   id,
  // });
  // return response.data;

  // Placeholder for now
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: true,
        message: "Beat deleted successfully",
        data: null,
      });
    }, 500);
  });
};
