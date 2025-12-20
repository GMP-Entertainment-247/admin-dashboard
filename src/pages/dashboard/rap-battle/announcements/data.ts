import type { Announcement } from "../../../../interface/announcement.interface";
import { useEffect, useState } from "react";
import { createApiClient, type ApiResponse } from "../../../../utils/api";

export const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Grand Finale",
    status: "finale",
    startDate: "2025-04-16",
    startTime: "11:25:00",
    endDate: "2025-04-16",
    endTime: "18:00:00",
    description:
      "The GMP Season 2 Rap Battle Grand Finale would be going down live in Lagos.",
    image: "/images/announcements/finale.jpg",
  },
  {
    id: 2,
    title: "Stage 3 Knockouts",
    status: "stage-3",
    startDate: "2025-04-10",
    startTime: "14:00:00",
    endDate: "2025-04-10",
    endTime: "18:00:00",
    description:
      "Top contestants battle head-to-head in the Stage 3 knockout round.",
    image: "/images/announcements/stage-3.jpg",
  },
  {
    id: 3,
    title: "Stage 2 Battles",
    status: "stage-2",
    startDate: "2025-04-05",
    startTime: "13:00:00",
    endDate: "2025-04-05",
    endTime: "17:00:00",
    description: "Qualified rappers compete in intense Stage 2 battles.",
    image: "/images/announcements/stage-2.jpg",
  },
  {
    id: 4,
    title: "Stage 1 Selection",
    status: "stage-1",
    startDate: "2025-03-30",
    startTime: "10:00:00",
    endDate: "2025-03-30",
    endTime: "15:00:00",
    description: "Initial selection stage for all registered contestants.",
    image: "/images/announcements/stage-1.jpg",
  },
  {
    id: 5,
    title: "Wildcard Battle",
    status: "stage-1",
    startDate: "2025-04-01",
    startTime: "15:00:00",
    endDate: "2025-04-01",
    endTime: "18:00:00",
    description: "Wildcard contestants battle for a second chance to advance.",
    image: "/images/announcements/wildcard.jpg",
  },
  {
    id: 6,
    title: "Audition Day 2",
    status: "audition",
    startDate: "2025-03-22",
    startTime: "09:00:00",
    endDate: "2025-03-22",
    endTime: "16:00:00",
    description: "Second day of auditions for aspiring rappers.",
    image: "/images/announcements/audition-2.jpg",
  },
  {
    id: 7,
    title: "Audition Day 1",
    status: "audition",
    startDate: "2025-03-21",
    startTime: "09:00:00",
    endDate: "2025-03-21",
    endTime: "16:00:00",
    description: "Opening day of GMP Season 2 rap battle auditions.",
    image: "/images/announcements/audition-1.jpg",
  },
  {
    id: 8,
    title: "Judges Meet & Greet",
    status: "all",
    startDate: "2025-03-18",
    startTime: "16:00:00",
    endDate: "2025-03-18",
    endTime: "18:00:00",
    description:
      "Meet the judges and learn about competition rules and scoring.",
    image: "/images/announcements/judges.jpg",
  },
  {
    id: 9,
    title: "Season 2 Kickoff",
    status: "all",
    startDate: "2025-03-15",
    startTime: "12:00:00",
    endDate: "2025-03-15",
    endTime: "14:00:00",
    description: "Official kickoff event for GMP Season 2 Rap Battle.",
    image: "/images/announcements/kickoff.jpg",
  },
  {
    id: 10,
    title: "Season Wrap-Up",
    status: "finale",
    startDate: "2025-04-20",
    startTime: "11:00:00",
    endDate: "2025-04-20",
    endTime: "13:00:00",
    description:
      "Post-finale recap and appreciation event for contestants and judges.",
    image: "/images/announcements/wrap-up.jpg",
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
