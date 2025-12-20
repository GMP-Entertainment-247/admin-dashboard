import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  SetStateAction,
  Dispatch,
} from "react";
// import type { Announcement } from "../../../../interface/announcement.interface";

export type AnnouncementDraftMode = "create" | "edit";

export interface AnnouncementDraftData {
  announcementId?: number;
  title: string;
  status: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  description: string;
  image: string;
  newImage: File[];
}

export interface AnnouncementDraft {
  mode: AnnouncementDraftMode;
  data: AnnouncementDraftData;
}

interface AnnouncementDraftContextType {
  draft: AnnouncementDraft | null;
  setDraft: Dispatch<SetStateAction<AnnouncementDraft | null>>;
  clearDraft: () => void;
}

const AnnouncementDraftContext = createContext<
  AnnouncementDraftContextType | undefined
>(undefined);

export const AnnouncementDraftProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [draft, setDraft] = useState<AnnouncementDraft | null>(null);

  const clearDraft = () => setDraft(null);

  return (
    <AnnouncementDraftContext.Provider value={{ draft, setDraft, clearDraft }}>
      {children}
    </AnnouncementDraftContext.Provider>
  );
};

export const useAnnouncementDraft = () => {
  const context = useContext(AnnouncementDraftContext);
  if (!context) {
    throw new Error(
      "useAnnouncementDraft must be used within AnnouncementDraftProvider"
    );
  }
  return context;
};
