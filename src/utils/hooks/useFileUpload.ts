import { useState, useCallback, useEffect } from "react";

interface FileUploadOptions {
  accept?: string[]; // Optional array of accepted file types
  maxSizeKb?: number; // in kb
  multiple?: boolean;
  maxFiles?: number; // Maximum number of files allowed
  initialFiles?: File[]; // Optional initial files (useful for rehydration)
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
  maxFiles = 10, // Default to 10 files
  initialFiles = [],
}: FileUploadOptions) {
  const [state, setState] = useState<FileUploadState>({
    files: initialFiles,
    isDragOver: false,
    isUploading: false,
    error: null,
  });
  // useEffect(() => {
  //   setState((prev) => ({ ...prev, files: initialFiles }));
  // }, [initialFiles]);

  // useEffect(() => {
  //   if (!initialFiles?.length) return;
  //   setState((prev) => ({ ...prev, files: initialFiles }));
  // }, [initialFiles?.length]);

  useEffect(() => {
    setState((prev) => {
      if (prev.files === initialFiles) return prev;
      return { ...prev, files: initialFiles ?? [] };
    });
  }, [initialFiles]);

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

      // Check if adding these files would exceed the maximum
      if (multiple) {
        const currentFileCount = state.files.length;
        const newFileCount = fileArray.length;

        if (currentFileCount + newFileCount > maxFiles) {
          setState((prev) => ({
            ...prev,
            error: `Maximum ${maxFiles} files allowed. You currently have ${currentFileCount} files and are trying to add ${newFileCount} more.`,
          }));
          return;
        }
      }

      const validFiles = fileArray.filter(isValidFile);

      if (validFiles.length > 0) {
        setState((prev) => ({
          ...prev,
          files: multiple ? [...prev.files, ...validFiles] : validFiles,
        }));
      }
    },
    [multiple, isValidFile, maxFiles, state.files.length]
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
      // Clear the input value to allow reselecting the same file
      event.target.value = "";
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
