import React, { useRef, useState } from "react";
import { Pencil, X } from "lucide-react";
import { bioProfileService } from "@/services/bioprofile.service";

interface ImageUploadProps {
    asset: {
        label: string;
        icon: any;
        text: string;
        type: string;
        name: string;
    };
    i: number;
}

const ImageUpload = ({ asset, i }: ImageUploadProps) => {
    const Icon = asset.icon;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadedFileId, setUploadedFileId] = useState<string | null>(null);

    const allowedTypes: Record<string, string[]> = {
        image: ["image/jpeg", "image/png", "image/gif", "image/webp"],
        audio: ["audio/mpeg", "audio/wav", "audio/ogg"],
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowed = allowedTypes[asset.type] || [];
        if (!allowed.includes(file.type)) {
            e.target.value = "";
            return;
        }
        const ext = file.name.split('.').pop() ?? "bin";
        const uploadFileName = `${asset.name}-${Date.now()}.${ext}`;

        if (preview) URL.revokeObjectURL(preview);
        const url = URL.createObjectURL(file);
        setPreview(url);

        setIsUploading(true);
        setUploadError(null);
        setUploadedFileId(null);
        try {
            const fileId = await bioProfileService.uploadFile(file, uploadFileName);
            setUploadedFileId(fileId);
        } catch (error) {
            setUploadError(error instanceof Error ? error.message : "Upload failed");
        } finally {
            setIsUploading(false);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        fileInputRef.current?.click();
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (preview) {
            URL.revokeObjectURL(preview);
        }
        setPreview(null);
        setUploadedFileId(null);
        setUploadError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div key={i} className="space-y-3 group">
            <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                accept={asset.type === "image" ? ".jpg,.jpeg,.png,.gif,.webp" : ".mp3,.wav,.ogg"}
                style={{ display: 'none' }}
            />
            <label className="text-[11px] font-bold text-slate-500 ml-1 uppercase tracking-widest">
                {asset.label}
            </label>
            <div className="relative">
                <button
                    type="button"
                    onClick={handleClick}
                    disabled={isUploading}
                    className="w-full h-32 bg-[#0d1117] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all shadow-lg overflow-hidden"
                >
                    {preview ? (
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <>
                            <div className="size-10 flex items-center justify-center rounded-full bg-white/5 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-colors">
                                <Icon className="size-5" />
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium px-4 text-center">
                                {asset.text}
                            </span>
                        </>
                    )}
                </button>
                {preview && (
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            type="button"
                            onClick={handleEditClick}
                            className="size-7 flex items-center justify-center rounded-full bg-blue-500/80 hover:bg-blue-500 text-white transition-colors shadow-md"
                            title="Edit"
                        >
                            <Pencil size={14} />
                        </button>
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="size-7 flex items-center justify-center rounded-full bg-red-500/80 hover:bg-red-500 text-white transition-colors shadow-md"
                            title="Remove"
                        >
                            <X size={14} />
                        </button>
                    </div>
                )}
            </div>
            {uploadError && (
                <p className="text-[11px] text-red-400">{uploadError}</p>
            )}
            {uploadedFileId && !uploadError && (
                <p className="text-[11px] text-emerald-400">Uploaded: {uploadedFileId}</p>
            )}
        </div>
    );
};

export default ImageUpload;
