import { useState, useCallback } from "react";

interface FileUploadOptions {
  accept?: string[]; // Optional array of accepted file types
  maxSizeKb?: number; // in kb
  multiple?: boolean;
}

interface UploadOptions {
  convertToBase64?: boolean;
}

interface FileUploadState {
  files: File[];
  isDragOver: boolean;
  isUploading: boolean;
  error: string | null;
}

export function useFileUpload({
  accept = [],
  maxSizeKb = 5 * 1024, // 5MB default
  multiple = false,
}: FileUploadOptions) {
  const [state, setState] = useState<FileUploadState>({
    files: [],
    isDragOver: false,
    isUploading: false,
    error: null,
  });

  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }, []);

  const isValidFile = useCallback(
    (file: File): boolean => {
      if (accept.length > 0) {
        const isValidType = accept.some((type) => {
          if (type.startsWith(".")) {
            return file.name.toLowerCase().endsWith(type.toLowerCase());
          }
          return file.type === type;
        });

        if (!isValidType) {
          setState((prev) => ({
            ...prev,
            error: `File type not supported. Please upload: ${accept.join(
              ", "
            )}`,
          }));
          return false;
        }
      }

      if (file.size > maxSizeKb * 1024) {
        setState((prev) => ({
          ...prev,
          error: `File too large. Maximum size: ${formatFileSize(
            maxSizeKb * 1024
          )}`,
        }));
        return false;
      }

      return true;
    },
    [accept, maxSizeKb, formatFileSize]
  );

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      setState((prev) => ({ ...prev, error: null }));
      const fileArray = Array.from(files);

      if (!multiple && fileArray.length > 1) {
        setState((prev) => ({
          ...prev,
          error: "Only one file is allowed",
        }));
        return;
      }

      const validFiles = fileArray.filter(isValidFile);

      if (validFiles.length > 0) {
        setState((prev) => ({
          ...prev,
          files: multiple ? [...prev.files, ...validFiles] : validFiles,
        }));
      }
    },
    [multiple, isValidFile]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setState((prev) => ({ ...prev, isDragOver: false }));
      const files = event.dataTransfer?.files;
      if (files) handleFiles(files);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setState((prev) => ({ ...prev, isDragOver: true }));
    },
    []
  );

  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setState((prev) => ({ ...prev, isDragOver: false }));
    },
    []
  );

  const handleFileInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) handleFiles(files);
    },
    [handleFiles]
  );

  const clearFiles = useCallback(() => {
    setState((prev) => ({ ...prev, files: [], error: null }));
  }, []);

  const removeFile = useCallback((index: number) => {
    setState((prev) => {
      const updatedFiles = [...prev.files];
      updatedFiles.splice(index, 1);
      return { ...prev, files: updatedFiles };
    });
  }, []);

  const uploadFiles = useCallback(
    async <T>(
      uploadFn: (files: File[] | string[]) => Promise<T>,
      options: UploadOptions = { convertToBase64: true }
    ): Promise<T | undefined> => {
      if (state.files.length === 0) {
        setState((prev) => ({ ...prev, error: "No files to upload" }));
        return;
      }

      try {
        setState((prev) => ({ ...prev, isUploading: true, error: null }));

        let filesToUpload: File[] | string[];

        if (options.convertToBase64) {
          const base64Promises = state.files.map(
            (file) =>
              new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
              })
          );
          filesToUpload = await Promise.all(base64Promises);
        } else {
          filesToUpload = state.files;
        }

        const result = await uploadFn(filesToUpload);
        clearFiles();
        return result;
      } catch (error: any) {
        setState((prev) => ({
          ...prev,
          error: error instanceof Error ? error.message : "Upload failed",
        }));
      } finally {
        setState((prev) => ({ ...prev, isUploading: false }));
      }
    },
    [state.files, clearFiles]
  );

  return {
    files: state.files,
    isDragOver: state.isDragOver,
    isUploading: state.isUploading,
    error: state.error,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleFileInput,
    clearFiles,
    removeFile,
    uploadFiles,
    formatFileSize,
  };
}
