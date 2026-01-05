import type { Announcement } from "../../../../interface/announcement.interface";
import { useEffect, useState } from "react";
import { createApiClient, type ApiResponse } from "../../../../utils/api";

export const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Grand Finale",
    status: "1",
    start_date: "2025-04-16 11:25:00",
    end_date: "2025-04-16 18:00:00",
    description:
      "The GMP Season 2 Rap Battle Grand Finale would be going down live in Lagos.",
    image: "/images/announcements/finale.jpg",
    link: null,
    created_at: "2025-04-10T10:00:00.000000Z",
    created_by: "1",
    creator: {
      id: 1,
      name: "System Admin",
      profile_pic: null,
      profile_picture_url: "/avatars/male.webp",
    },
  },
  {
    id: 2,
    title: "Stage 3 Knockouts",
    status: "1",
    start_date: "2025-04-10 14:00:00",
    end_date: "2025-04-10 18:00:00",
    description:
      "Top contestants battle head-to-head in the Stage 3 knockout round.",
    image: "/images/announcements/stage-3.jpg",
    link: null,
    created_at: "2025-04-08T12:00:00.000000Z",
    created_by: "1",
    creator: {
      id: 1,
      name: "System Admin",
      profile_pic: null,
      profile_picture_url: "/avatars/male.webp",
    },
  },
];

export const useMockFetchAnnouncement = (
  announcementId?: string,
  options?: { enabled?: boolean }
) => {
  const [data, setData] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const enabled = options?.enabled ?? true;

  useEffect(() => {
    if (!enabled) return;
    setLoading(true);

    const timer = setTimeout(() => {
      try {
        const found = mockAnnouncements.find(
          (a) => String(a.id) === announcementId
        );

        if (!found) {
          throw new Error("Announcement not found");
        }

        setData(found);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }, 800); // simulate API delay

    return () => clearTimeout(timer);
  }, [announcementId, enabled]);

  return { data, loading, error };
};

export const createAnnouncement = async (
  formData: FormData
): Promise<ApiResponse<null>> => {
  const response = await createApiClient().post(
    "/admin/announcement/create",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateAnnouncement = async (
  formData: FormData
): Promise<ApiResponse<null>> => {
  const response = await createApiClient().post(
    "/admin/announcement/update",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteAnnouncement = async (
  id: number | string
): Promise<ApiResponse<null>> => {
  const response = await createApiClient().post("/admin/announcement/delete", {
    id,
  });

  return response.data;
};
