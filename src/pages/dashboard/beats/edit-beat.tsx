import { useEffect } from "react";
import BeatForm from "../../../components/BeatForm";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import StateContainer from "../../../components/shared/StateContainer";
import { useBeatDraft } from "./beat-draft-context";
import useFetch from "../../../utils/hooks/useFetch";
import { IBeatDetails } from "../../../interface/beats.interface";

const EditBeat = () => {
  const { beatId } = useParams<{ beatId: string }>();
  const { draft, setDraft } = useBeatDraft();

  const shouldUseDraft =
    draft?.mode === "edit" &&
    draft.data.beatId?.toString() === (beatId ?? "").toString();

  const {
    data: fetchedData,
    loading,
    error,
  } = useFetch<IBeatDetails>(
    "/admin/beats/details",
    {
      id: beatId,
    },
    { enabled: !shouldUseDraft }
  );

  // Seed draft from API when needed
  useEffect(() => {
    if (shouldUseDraft || !fetchedData) return;
    setDraft({
      mode: "edit",
      data: {
        beatId: fetchedData.id,
        name: fetchedData.name || "",
        description: fetchedData.description || "",
        genre: fetchedData.gen?.id?.toString() || "",
        rap_battle_id: fetchedData.battle?.id?.toString() || "",
        image: fetchedData.image_url || "",
        newImage: [],
        beat_file: fetchedData.beat_file || "",
        newBeatFile: [],
      },
    });
  }, [fetchedData, shouldUseDraft, setDraft]);

  if (loading) {
    return <LoadingSpinner message="Loading beat..." />;
  }

  if (error) {
    return (
      <StateContainer>
        <p className="text-red-600 mb-4">Error loading beat details</p>
        <p className="text-gray-600">
          {error.message || "Something went wrong"}
        </p>
      </StateContainer>
    );
  }
  if (!fetchedData && !draft) {
    return (
      <StateContainer>
        <p className="text-gray-600">Beat not found</p>
      </StateContainer>
    );
  }

  return <BeatForm />;
};

export default EditBeat;
