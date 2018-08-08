export interface UploadProgress {
    fileIndex: number;
    fileName: string;
    value: number;
    error?: string;
    file?: any;
}
