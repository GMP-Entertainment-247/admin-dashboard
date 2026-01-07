import { useEffect, useMemo } from "react";
import BeatForm from "../../../components/BeatForm";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import StateContainer from "../../../components/shared/StateContainer";
import { useBeatDraft } from "./beat-draft-context";
import useFetch from "../../../utils/hooks/useFetch";

interface BeatDetails {
  id: number;
  name: string;
  description: string;
  image_url: string;
  beat_file: string;
  genre: string | null;
  rap_battle_id: number | null;
  created_at: string;
}

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
  } = useFetch<BeatDetails>(
    "/admin/beats/details",
    {
      id: beatId,
    },
    { enabled: !shouldUseDraft }
  );

  // Fetch genres to map genre name to ID
  const { data: genresData } = useFetch<{
    data: { id: number; name: string }[];
  }>("/genres");

  // Map genre name to ID if needed
  const genreId = useMemo(() => {
    if (!fetchedData?.genre || !genresData?.data) return "";
    // If genre is already an ID (numeric string), return it
    if (!isNaN(Number(fetchedData.genre))) {
      return fetchedData.genre;
    }
    // Otherwise, find the ID by name
    const found = genresData.data.find((g) => g.name === fetchedData.genre);
    return found?.id.toString() || "";
  }, [fetchedData?.genre, genresData]);

  // Seed draft from API when needed
  useEffect(() => {
    if (shouldUseDraft || !fetchedData) return;
    setDraft({
      mode: "edit",
      data: {
        beatId: fetchedData.id,
        name: fetchedData.name || "",
        description: fetchedData.description || "",
        genre: genreId,
        rap_battle_id: fetchedData.rap_battle_id?.toString() || "",
        image: fetchedData.image_url || "",
        newImage: [],
        beat_file: fetchedData.beat_file || "",
        newBeatFile: [],
      },
    });
  }, [fetchedData, shouldUseDraft, setDraft, genreId]);

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
