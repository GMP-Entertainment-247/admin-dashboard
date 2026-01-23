import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import BeatInnerLayout from "./inner-layout";
import Button from "../../../components/shared/Button";
import StateContainer from "../../../components/shared/StateContainer";
import { useBeatDraft } from "./beat-draft-context";
import { createBeat, updateBeat } from "./beats/data";
import { toast } from "react-toastify";
import { handleApiError } from "../../../utils/errorHelpers";
import BeatViewLayout from "./beats/beat-view-layout";
import useFetch from "../../../utils/hooks/useFetch";
import FixedFooter from "../../../components/shared/FixedFooter";

const PreviewBeat = () => {
  const { draft } = useBeatDraft();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch genre and rap battle names for display
  const { data: genresData } = useFetch<
    {
      id: number;
      name: string;
    }[]
  >("/genres");
  const { data: rapBattlesData } = useFetch<
    {
      id: number;
      title: string;
    }[]
  >("/admin/rap-battles");

  const {
    name,
    description,
    genre,
    rap_battle_id,
    beatId,
    image,
    newImage,
    beat_file,
    newBeatFile,
  } = useMemo(() => {
    return (
      draft?.data || {
        name: "",
        description: "",
        genre: "",
        rap_battle_id: "",
        beatId: undefined,
        image: "",
        newImage: [],
        beat_file: "",
        newBeatFile: [],
      }
    );
  }, [draft]);

  const genreName = useMemo(() => {
    if (!genre || !genresData) return "";
    const found = genresData.find((g) => g.id.toString() === genre);
    return found?.name || "";
  }, [genre, genresData]);

  const rapBattleTitle = useMemo(() => {
    if (!rap_battle_id || !rapBattlesData) return "";
    const found = rapBattlesData.find((b) => b.id.toString() === rap_battle_id);
    return found?.title || "";
  }, [rap_battle_id, rapBattlesData]);

  const previewImageUrl = useMemo(() => {
    if (newImage && newImage.length > 0) {
      return URL.createObjectURL(newImage[0]);
    }
    return image || "";
  }, [newImage, image]);

  const previewBeatFileUrl = useMemo(() => {
    if (newBeatFile && newBeatFile.length > 0) {
      return URL.createObjectURL(newBeatFile[0]);
    }
    return beat_file || "";
  }, [newBeatFile, beat_file]);

  const handleContinueEditing = () => {
    navigate(-1);
  };

  const handlePrimaryAction = async () => {
    if (!draft) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.set("name", name);
      formData.set("description", description);
      if (genre) {
        formData.set("genre", genre);
      }
      if (rap_battle_id) {
        formData.set("rap_battle_id", rap_battle_id);
      }

      if (newImage && newImage.length > 0) {
        formData.append("picture", newImage[0]);
      }
      if (newBeatFile && newBeatFile.length > 0) {
        formData.append("beat", newBeatFile[0]);
      }

      if (draft.mode === "create") {
        await createBeat(formData);
        toast.success("Beat created successfully");
        // Invalidate the beat list and metrics query to refetch updated data
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["/admin/beats"],
          }),
          queryClient.invalidateQueries({
            queryKey: ["/admin/beats/metrics"],
          }),
        ]);
        navigate("/beats");
      } else {
        const targetBeatId = beatId;
        if (targetBeatId) {
          formData.set("beat_id", String(targetBeatId));
        }
        await updateBeat(formData);
        toast.success("Beat updated successfully");
        // Invalidate both the list and details queries to refetch updated data
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["/admin/beats"],
          }),
          queryClient.invalidateQueries({
            queryKey: ["/admin/beats/details", { id: targetBeatId }],
          }),
        ]);
        navigate(`/beats/${beatId}`, {
          replace: true,
        });
      }
    } catch (error: any) {
      toast.error(handleApiError(error, "Failed to save beat"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BeatInnerLayout title="Preview">
      {!draft ? (
        <StateContainer>
          <p className="text-gray-600">
            No beat data found to preview. Please go back and fill the form
            first.
          </p>
        </StateContainer>
      ) : (
        <div className="pb-[95px]">
          <BeatViewLayout
            name={name}
            description={description}
            genre={genreName}
            rapBattleTitle={rapBattleTitle}
            image={previewImageUrl}
            beatFile={previewBeatFileUrl}
          />

          {/* Bottom action bar - Fixed footer */}
          <FixedFooter>
            <Button
              text="Continue Editing"
              type="button"
              extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 !rounded-[8px] !font-bold !bg-transparent !text-grey-normal border border-[#E9E9E9]"
              onClick={handleContinueEditing}
            />
            <Button
              text={draft.mode === "create" ? "Create Beat" : "Save Changes"}
              type="button"
              extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 !rounded-[8px] !font-bold"
              isLoading={isSubmitting}
              onClick={handlePrimaryAction}
            />
          </FixedFooter>
        </div>
      )}
    </BeatInnerLayout>
  );
};

export default PreviewBeat;
