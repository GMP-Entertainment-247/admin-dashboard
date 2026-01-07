import { useNavigate } from "react-router-dom";
import { useRef, useMemo } from "react";
import BeatInnerLayout from "../pages/dashboard/beats/inner-layout";
import { useBeatDraft } from "../pages/dashboard/beats/beat-draft-context";
import Button from "./shared/Button";
import ImageItem from "./ImageItem";
import Input from "./Form/Input";
import Select from "./Form/Select";
import TextArea from "./Form/TextArea";
import { useFileUpload } from "../utils/hooks/useFileUpload";
import { UploadIcon, Music, X } from "lucide-react";
import useFetch from "../utils/hooks/useFetch";

const BeatForm = () => {
  const { draft, setDraft } = useBeatDraft();
  const navigate = useNavigate();
  const mode = draft?.mode || "create";
  const formRef = useRef<HTMLFormElement>(null);
  const textAreaRef = useRef<any>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const beatFileInputRef = useRef<HTMLInputElement>(null);

  // Fetch genres and rap battles
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

  const genreOptions = useMemo(() => {
    return (
      genresData?.map((genre) => ({
        label: genre.name,
        value: genre.id.toString(),
      })) || []
    );
  }, [genresData]);

  const rapBattleOptions = useMemo(() => {
    return (
      rapBattlesData?.map((battle) => ({
        label: battle.title,
        value: battle.id.toString(),
      })) || []
    );
  }, [rapBattlesData]);

  const {
    name,
    description,
    genre,
    rap_battle_id,
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
        image: "",
        newImage: [],
        beat_file: "",
        newBeatFile: [],
      }
    );
  }, [draft]);

  const imageUpload = useFileUpload({
    accept: ["image/jpeg", "image/jpg", "image/png"],
    maxSizeKb: 2 * 1024, // 2MB
    initialFiles: newImage,
  });

  const beatFileUpload = useFileUpload({
    accept: [".mp3", "audio/mpeg"],
    maxSizeKb: 5 * 1024, // 5MB
    initialFiles: newBeatFile,
  });

  const previewImageUrl = useMemo(() => {
    if (imageUpload.files.length > 0) {
      return URL.createObjectURL(imageUpload.files[0]);
    }
    if (newImage && newImage.length > 0) {
      return URL.createObjectURL(newImage[0]);
    }
    if (image) {
      return image;
    }
    return null;
  }, [imageUpload.files, newImage, image]);

  const previewBeatFileUrl = useMemo(() => {
    if (beatFileUpload.files.length > 0) {
      return URL.createObjectURL(beatFileUpload.files[0]);
    }
    if (newBeatFile && newBeatFile.length > 0) {
      return URL.createObjectURL(newBeatFile[0]);
    }
    if (beat_file) {
      return beat_file;
    }
    return null;
  }, [beatFileUpload.files, newBeatFile, beat_file]);

  const handleRemoveImage = () => {
    imageUpload.clearFiles();
    setDraft((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        data: {
          ...prev.data,
          image: "",
          newImage: [],
        },
      };
    });
  };

  const handleRemoveBeatFile = () => {
    beatFileUpload.clearFiles();
    setDraft((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        data: {
          ...prev.data,
          beat_file: "",
          newBeatFile: [],
        },
      };
    });
  };

  const handleBrowseImage = () => {
    imageInputRef.current?.click();
  };

  const handleBrowseBeatFile = () => {
    beatFileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const derivedName = (formData.get("name") as string) || "";
    const derivedGenre = (formData.get("genre") as string) || "";
    const derivedRapBattleId = (formData.get("rap_battle_id") as string) || "";
    const derivedDescription =
      (textAreaRef.current?.editor?.getHTML?.() as string) ||
      (formData.get("description") as string) ||
      "";

    setDraft((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        data: {
          ...prev.data,
          name: derivedName,
          genre: derivedGenre,
          rap_battle_id: derivedRapBattleId,
          description: derivedDescription,
          ...(imageUpload.files.length > 0 && {
            image: "",
            newImage: imageUpload.files,
          }),
          ...(beatFileUpload.files.length > 0 && {
            beat_file: "",
            newBeatFile: beatFileUpload.files,
          }),
        },
      };
    });

    navigate("/beats/preview");
  };

  return (
    <BeatInnerLayout title={mode === "create" ? "Upload Beat" : "Edit Beat"}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="bg-white p-5 rounded-2xl">
          <div className="w-full max-w-full flex flex-col lg:flex-row gap-7 lg:gap-10 mb-10">
            <div className="space-y-5 lg:w-[56%]">
              <Input
                label="Title"
                id="name"
                placeholder="Enter beat title"
                defaultValue={name}
                required
              />
              <Select
                label="Genre"
                id="genre"
                placeholder="Select Genre"
                options={genreOptions}
                value={genre}
                required
              />
              <Select
                label="Rap Battle (Optional)"
                id="rap_battle_id"
                placeholder="Select Rap Battle"
                options={rapBattleOptions}
                value={rap_battle_id}
              />
              <TextArea
                ref={textAreaRef}
                id="description"
                label="Description"
                placeholder="Write here..."
                minHeight={200}
                value={description}
              />
            </div>

            <div className="w-full lg:w-[unset] lg:flex-1 space-y-7 lg:space-y-10 overflow-hidden self-center">
              {/* Cover Image Upload */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-[#212121]">
                  Cover Image
                </label>
                {previewImageUrl ? (
                  <ImageItem
                    src={previewImageUrl}
                    alt="Beat cover image"
                    onRemove={handleRemoveImage}
                    className="w-full h-[259px]"
                    imgClass="object-contain"
                  />
                ) : (
                  <div
                    className={`h-[259px] items-center justify-center border border-dashed rounded-lg flex cursor-pointer transition-colors duration-200 ${
                      imageUpload.isDragOver
                        ? "border-brand-500 bg-brand-50"
                        : "border-[#999999] hover:border-brand-500"
                    }`}
                    onDrop={imageUpload.handleDrop}
                    onDragOver={imageUpload.handleDragOver}
                    onDragLeave={imageUpload.handleDragLeave}
                    onClick={handleBrowseImage}
                  >
                    <div className="space-y-1 text-center">
                      <UploadIcon className="mx-auto" />
                      <p className="mb-2">Drag & drop to upload or</p>
                      <p className="text-[#998100]">Browse Files</p>
                    </div>
                  </div>
                )}
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={imageUpload.handleFileInput}
                  className="hidden"
                />
                {imageUpload.error && (
                  <div className="text-red-500 text-sm mt-2">
                    {imageUpload.error}
                  </div>
                )}
              </div>

              {/* Beat File Upload */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-[#212121]">
                  Beat File (MP3)
                </label>
                {previewBeatFileUrl ? (
                  <div className="border border-[#999999] rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-brand-25 rounded-lg flex items-center justify-center">
                          <Music className="w-6 h-6 text-brand-500" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {beatFileUpload.files[0]?.name ||
                              newBeatFile[0]?.name ||
                              "Beat file"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {beatFileUpload.files[0]
                              ? beatFileUpload.formatFileSize(
                                  beatFileUpload.files[0].size
                                )
                              : newBeatFile[0]
                              ? beatFileUpload.formatFileSize(
                                  newBeatFile[0].size
                                )
                              : "Audio file"}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveBeatFile}
                        className="p-2 hover:bg-red-50 rounded-full transition-colors"
                        title="Remove file"
                      >
                        <X className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                    <audio controls className="w-full" src={previewBeatFileUrl}>
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ) : (
                  <div
                    className={`h-[259px] items-center justify-center border border-dashed rounded-lg flex cursor-pointer transition-colors duration-200 ${
                      beatFileUpload.isDragOver
                        ? "border-brand-500 bg-brand-50"
                        : "border-[#999999] hover:border-brand-500"
                    }`}
                    onDrop={beatFileUpload.handleDrop}
                    onDragOver={beatFileUpload.handleDragOver}
                    onDragLeave={beatFileUpload.handleDragLeave}
                    onClick={handleBrowseBeatFile}
                  >
                    <div className="space-y-1 text-center">
                      <Music className="mx-auto w-12 h-12 text-gray-400" />
                      <p className="mb-2">Drag & drop MP3 file or</p>
                      <p className="text-[#998100]">Browse Files</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Max size: 5MB
                      </p>
                    </div>
                  </div>
                )}
                <input
                  ref={beatFileInputRef}
                  type="file"
                  accept=".mp3,audio/mpeg"
                  onChange={beatFileUpload.handleFileInput}
                  className="hidden"
                />
                {beatFileUpload.error && (
                  <div className="text-red-500 text-sm mt-2">
                    {beatFileUpload.error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="mt-6 bg-white p-5 rounded-2xl flex items-center justify-end gap-4">
          {mode === "edit" && (
            <Button
              text="Cancel"
              variant="cancel"
              extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 !rounded-[8px] !font-bold"
              onClick={() => navigate(-1)}
            />
          )}
          <Button
            text="Preview"
            type="submit"
            extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 !rounded-[8px] !font-bold"
          />
        </div>
      </form>
    </BeatInnerLayout>
  );
};

export default BeatForm;
