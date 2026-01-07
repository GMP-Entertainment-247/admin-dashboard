import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

export type BeatDraftMode = "create" | "edit";

export interface BeatDraftData {
  beatId?: number;
  name: string;
  description: string;
  genre: string;
  rap_battle_id: string;
  image: string;
  newImage: File[];
  beat_file: string;
  newBeatFile: File[];
}

export interface BeatDraft {
  mode: BeatDraftMode;
  data: BeatDraftData;
}

interface BeatDraftContextType {
  draft: BeatDraft | null;
  setDraft: Dispatch<SetStateAction<BeatDraft | null>>;
  clearDraft: () => void;
}

const BeatDraftContext = createContext<BeatDraftContextType | undefined>(
  undefined
);

export const BeatDraftProvider = ({ children }: { children: ReactNode }) => {
  const [draft, setDraft] = useState<BeatDraft | null>(null);

  const clearDraft = () => setDraft(null);

  return (
    <BeatDraftContext.Provider value={{ draft, setDraft, clearDraft }}>
      {children}
    </BeatDraftContext.Provider>
  );
};

export const useBeatDraft = () => {
  const context = useContext(BeatDraftContext);
  if (!context) {
    throw new Error("useBeatDraft must be used within BeatDraftProvider");
  }
  return context;
};
