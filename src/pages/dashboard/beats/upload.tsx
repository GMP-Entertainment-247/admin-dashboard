import { useEffect } from "react";
import BeatForm from "../../../components/BeatForm";
import { useBeatDraft } from "./beat-draft-context";

const UploadBeat = () => {
  const { draft, setDraft } = useBeatDraft();

  useEffect(() => {
    if (draft?.mode === "create" && draft.data) return;
    setDraft({
      mode: "create",
      data: {
        name: "",
        description: "",
        genre: "",
        rap_battle_id: "",
        image: "",
        newImage: [],
        beat_file: "",
        newBeatFile: [],
      },
    });
  }, [draft, setDraft]);

  return <BeatForm />;
};

export default UploadBeat;
