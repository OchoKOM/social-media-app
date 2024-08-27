import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";


export interface Attachment {
    file: File;
    mediaId?: string;
    isUploading: boolean;
}


export default function useMediaUpload() {
    const { toast } = useToast();

    const [attachments, setAttachment] = useState<Attachment[]>([]);

    const [uploadProgress, setUploadProgress] = useState<number>();

    const { startUpload, isUploading } = useUploadThing("attachment", {
        onBeforeUploadBegin(files) {
            const renamedFiles = files.map(file => {
                const extension = file.name.split(".").pop();

                return new File(
                    [file],
                    `attachment_${uuidv4()}.${extension}`,
                    {
                        type: file.type,
                    }
                )
            })
            setAttachment(prev => [
                ...prev,
                ...renamedFiles.map(file => ({ file, isUploading: true }))
            ]);

            return renamedFiles;
        },
        onUploadProgress: setUploadProgress,
        onClientUploadComplete(res) {
            setAttachment(prev => prev.map(a => {
                const uploadResult = res.find(r => r.name === a.file.name);
                if (!uploadResult) return a;
                return {
                    ...a,
                    mediaId: uploadResult.serverData.mediaId,
                    isUploading: false
                };
            }))
        },
        onUploadError(e) {
            setAttachment(prev => prev.filter(a => !a.isUploading));
            toast({
                variant: "destructive",
                description: e.message
            })
        },
    });

    function handleStartUpload(files: File[]) {
        if (isUploading) {
            toast({
                variant: "destructive",
                description: "Veuillez patienter la fin du televersement en cours.",
            });
            return;
        }
        if (attachments.length + files.length > 5) {
            toast({
                variant: "destructive",
                description: "Vous ne pouvez pas téléverser plus de 5 pièces jointes à la fois."
            });
            return;
        }
        startUpload(files)
    }

    function removeAttachment(fileName: string) {
        setAttachment(prev => prev.filter(a => a.file.name !== fileName))
    }

    function reset() {
        setAttachment([]);
        setUploadProgress(undefined);
    }

    return {
        startUpload: handleStartUpload,
        attachments,
        isUploading,
        uploadProgress,
        removeAttachment,
        reset
    }
};

