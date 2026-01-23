import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";
import BeatInnerLayout from "./inner-layout";
import Button from "../../../components/shared/Button";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import StateContainer from "../../../components/shared/StateContainer";
import BeatViewLayout from "./beats/beat-view-layout";
import useFetch from "../../../utils/hooks/useFetch";
import {
  flattenErrorMessage,
  handleApiError,
} from "../../../utils/errorHelpers";
import { deleteBeat } from "./beats/data";
import { IBeatDetails } from "../../../interface/beats.interface";
import FixedFooter from "../../../components/shared/FixedFooter";

const BeatDetails = () => {
  const { beatId } = useParams<{ beatId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: beatData,
    loading,
    error,
    refetch,
  } = useFetch<IBeatDetails>("/admin/beats/details", {
    id: beatId,
  });

  const handleEdit = () => {
    if (!beatId) return;
    navigate(`edit`);
  };

  const handleDelete = async () => {
    if (!beatId) return;
    const confirmed = window.confirm(
      "Are you sure you want to delete this beat?"
    );
    if (!confirmed) return;
    try {
      const res = await deleteBeat(beatId);
      if (!res.status) {
        toast.error(flattenErrorMessage(res.message, "Failed to delete beat"));
        return;
      }
      // Invalidate the beat list and metrics query to refetch updated data
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["/admin/beats"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["/admin/beats/metrics"],
        }),
      ]);
      toast.success("Beat deleted successfully");
      navigate("/beats");
    } catch (error) {
      toast.error(handleApiError(error, "Failed to delete beat"));
    }
  };
  useEffect(() => {
    refetch();
  }, [beatId, refetch]);

  return (
    <BeatInnerLayout title="Details">
      {loading ? (
        <LoadingSpinner message="Loading beat..." />
      ) : error ? (
        <StateContainer>
          <p className="text-red-600 mb-4">Error loading beat</p>
          <p className="text-gray-600">{error.message}</p>
        </StateContainer>
      ) : (
        <div className="pb-[95px]">
          <BeatViewLayout
            name={beatData?.name || ""}
            description={beatData?.description || ""}
            genre={beatData?.gen?.name}
            rapBattleTitle={beatData?.battle?.title}
            image={beatData?.image_url || ""}
            beatFile={beatData?.beat_file || ""}
            createdDate={beatData?.created_at}
          />

          {/* Bottom action bar */}
          <FixedFooter>
            <Button
              text="Delete Beat"
              type="button"
              extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 !rounded-[8px] !font-bold"
              onClick={handleDelete}
              variant="cancel"
            />
            <Button
              text="Edit Beat"
              type="button"
              extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 !rounded-[8px] !font-bold"
              onClick={handleEdit}
            />
          </FixedFooter>
        </div>
      )}
    </BeatInnerLayout>
  );
};

export default BeatDetails;
