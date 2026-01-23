import { useNavigate } from "react-router-dom";
import { useRef, useMemo } from "react";
import EventInnerLayout from "../pages/dashboard/rap-battle/events/inner-layout";
import { useEventDraft } from "../pages/dashboard/rap-battle/events/event-draft-context";
import Button from "./shared/Button";
import ImageItem from "./ImageItem";
import Input from "./Form/Input";
import Label from "./Form/Label";
import TextArea from "./Form/TextArea";
import { useFileUpload } from "../utils/hooks/useFileUpload";
import { UploadIcon } from "lucide-react";
import { toast } from "react-toastify";

const EventForm = () => {
    const { draft, setDraft } = useEventDraft();
    const navigate = useNavigate();
    const mode = draft?.mode || "create";
    const formRef = useRef<HTMLFormElement>(null);
    const textAreaRef = useRef<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        title,
        description,
        venue,
        location,
        price,
        link,
        available_tickets,
        event_start_date,
        event_start_time,
        event_end_date,
        event_end_time,
        sale_start_date,
        sale_start_time,
        sale_end_date,
        sale_end_time,
        image,
        newImage,
    } = useMemo(() => {
        return (
            draft?.data || {
                title: "",
                description: "",
                venue: "",
                location: "",
                price: "",
                link: "",
                available_tickets: "",
                event_start_date: "",
                event_start_time: "",
                event_end_date: "",
                event_end_time: "",
                sale_start_date: "",
                sale_start_time: "",
                sale_end_date: "",
                sale_end_time: "",
                image: "",
                newImage: [],
            }
        );
    }, [draft]);

    const fileUpload = useFileUpload({
        accept: ["image/jpeg", "image/jpg", "image/png"],
        maxSizeKb: 2 * 1024, // 2MB
        initialFiles: newImage,
    });

    const previewImageUrl = useMemo(() => {
        if (fileUpload.files.length > 0) {
            return URL.createObjectURL(fileUpload.files[0]);
        }
        if (newImage && newImage.length > 0) {
            return URL.createObjectURL(newImage[0]);
        }
        if (image) {
            return image;
        }
        return null;
    }, [fileUpload.files, newImage, image]);

    const handleRemoveImage = () => {
        fileUpload.clearFiles();

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

    const handleBrowseFiles = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        const formData = new FormData(formRef.current);
        const derivedTitle = (formData.get("title") as string) || "";
        const derivedDescription =
            (textAreaRef.current?.editor?.getHTML?.() as string) ||
            (formData.get("description") as string) ||
            "";
        const derivedVenue = (formData.get("venue") as string) || "";
        const derivedLocation = (formData.get("location") as string) || "";
        const derivedPrice = (formData.get("price") as string) || "";
        const derivedLink = (formData.get("link") as string) || "";
        const derivedAvailableTickets =
            (formData.get("available_tickets") as string) || "";
        const derivedEventStartDate =
            (formData.get("event_start_date") as string) || "";
        const derivedEventStartTime =
            (formData.get("event_start_time") as string) || "";
        const derivedEventEndDate = (formData.get("event_end_date") as string) || "";
        const derivedEventEndTime = (formData.get("event_end_time") as string) || "";
        const derivedSaleStartDate =
            (formData.get("sale_start_date") as string) || "";
        const derivedSaleStartTime =
            (formData.get("sale_start_time") as string) || "";
        const derivedSaleEndDate = (formData.get("sale_end_date") as string) || "";
        const derivedSaleEndTime = (formData.get("sale_end_time") as string) || "";

        const hasImage =
            fileUpload.files.length > 0 ||
            (newImage && newImage.length > 0) ||
            Boolean(image);

        // Required: all fields except description & link (image required too)
        const missingFields: string[] = [];
        if (!derivedTitle.trim()) missingFields.push("Title");
        if (!derivedVenue.trim()) missingFields.push("Venue");
        if (!derivedLocation.trim()) missingFields.push("Location");
        if (!String(derivedPrice).trim()) missingFields.push("Price");
        if (!String(derivedAvailableTickets).trim()) missingFields.push("Available Tickets");
        if (!derivedEventStartDate) missingFields.push("Event Start Date");
        if (!derivedEventStartTime) missingFields.push("Event Start Time");
        if (!derivedEventEndDate) missingFields.push("Event End Date");
        if (!derivedEventEndTime) missingFields.push("Event End Time");
        if (!derivedSaleStartDate) missingFields.push("Sale Start Date");
        if (!derivedSaleStartTime) missingFields.push("Sale Start Time");
        if (!derivedSaleEndDate) missingFields.push("Sale End Date");
        if (!derivedSaleEndTime) missingFields.push("Sale End Time");
        if (!hasImage) missingFields.push("Event Image");

        if (missingFields.length > 0) {
            toast.error(`Please fill: ${missingFields.join(", ")}`);
            return;
        }

        setDraft((prev) => {
            if (!prev) return null;

            return {
                ...prev,
                data: {
                    ...prev.data,
                    title: derivedTitle,
                    description: derivedDescription,
                    venue: derivedVenue,
                    location: derivedLocation,
                    price: derivedPrice,
                    link: derivedLink,
                    available_tickets: derivedAvailableTickets,
                    event_start_date: derivedEventStartDate,
                    event_start_time: derivedEventStartTime,
                    event_end_date: derivedEventEndDate,
                    event_end_time: derivedEventEndTime,
                    sale_start_date: derivedSaleStartDate,
                    sale_start_time: derivedSaleStartTime,
                    sale_end_date: derivedSaleEndDate,
                    sale_end_time: derivedSaleEndTime,
                    // ✅ FILES SAVED HERE
                    ...(fileUpload.files.length > 0 && {
                        image: "", // remove old URL if replacing
                        newImage: fileUpload.files,
                    }),
                },
            };
        });

        navigate("preview");
    };

    return (
        <EventInnerLayout
            title={mode === "create" ? "Create Event" : "Edit Event"}
        >
            <form ref={formRef} onSubmit={handleSubmit}>
                <div className="bg-white p-5 rounded-2xl">
                    <div className="w-full max-w-full flex flex-col lg:flex-row gap-7 lg:gap-10 mb-10">
                        <div className="space-y-5 lg:w-[56%]">
                            <Input
                                label="Title"
                                id="title"
                                placeholder="Text"
                                defaultValue={title}
                            />
                            <Input
                                label="Venue"
                                id="venue"
                                placeholder="Text"
                                defaultValue={venue}
                            />
                            <Input
                                label="Location"
                                id="location"
                                placeholder="Text"
                                defaultValue={location}
                            />
                            <Input
                                label="Price"
                                id="price"
                                type="number"
                                placeholder="0"
                                defaultValue={price}
                            />
                            <Input
                                label="Link"
                                id="link"
                                placeholder="https://..."
                                defaultValue={link}
                            />
                            <Input
                                label="Available Tickets"
                                id="available_tickets"
                                type="number"
                                placeholder="0"
                                defaultValue={available_tickets}
                            />
                            <div className="space-y-3">
                                <Label id="event_start">Event Start Date & Time</Label>
                                <div className="flex items-center w-full gap-5">
                                    <Input
                                        id="event_start_date"
                                        type="date"
                                        defaultValue={event_start_date}
                                    />
                                    <Input
                                        id="event_start_time"
                                        type="time"
                                        defaultValue={event_start_time}
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label id="event_end">Event End Date & Time</Label>
                                <div className="flex items-center w-full gap-5">
                                    <Input
                                        id="event_end_date"
                                        type="date"
                                        defaultValue={event_end_date}
                                    />
                                    <Input
                                        id="event_end_time"
                                        type="time"
                                        defaultValue={event_end_time}
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label id="sale_start">Sale Start Date & Time</Label>
                                <div className="flex items-center w-full gap-5">
                                    <Input
                                        id="sale_start_date"
                                        type="date"
                                        defaultValue={sale_start_date}
                                    />
                                    <Input
                                        id="sale_start_time"
                                        type="time"
                                        defaultValue={sale_start_time}
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label id="sale_end">Sale End Date & Time</Label>
                                <div className="flex items-center w-full gap-5">
                                    <Input
                                        id="sale_end_date"
                                        type="date"
                                        defaultValue={sale_end_date}
                                    />
                                    <Input
                                        id="sale_end_time"
                                        type="time"
                                        defaultValue={sale_end_time}
                                    />
                                </div>
                            </div>
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
                            {previewImageUrl ? (
                                <ImageItem
                                    src={previewImageUrl}
                                    alt="Event image"
                                    onRemove={handleRemoveImage}
                                    className="w-full h-[259px]"
                                    imgClass="object-contain"
                                />
                            ) : (
                                // Drag and Drop Area
                                <div
                                    className={`h-[259px] items-center justify-center border border-dashed rounded-lg flex cursor-pointer transition-colors duration-200 ${fileUpload.isDragOver
                                        ? "border-brand-500 bg-brand-50"
                                        : "border-[#999999] hover:border-brand-500"
                                        }`}
                                    onDrop={fileUpload.handleDrop}
                                    onDragOver={fileUpload.handleDragOver}
                                    onDragLeave={fileUpload.handleDragLeave}
                                    onClick={handleBrowseFiles}
                                >
                                    <div className="space-y-1 text-center">
                                        <UploadIcon className="mx-auto" />
                                        <p className="mb-2">Drag & drop to upload or</p>
                                        <p className="text-[#998100]">Browse Files</p>
                                    </div>
                                </div>
                            )}

                            {/* Hidden file input */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={fileUpload.handleFileInput}
                                className="hidden"
                            />

                            {/* Error Display */}
                            {fileUpload.error && (
                                <div className="text-red-500 text-sm mt-2">
                                    {fileUpload.error}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Action Buttons - separate container at the bottom */}
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
        </EventInnerLayout>
    );
};

export default EventForm;
