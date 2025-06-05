import { type ChangeEvent, useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { FileUploader } from 'lib/components/file-uploader';

const meta: Meta<typeof FileUploader> = {
  title: 'Utility/FileUploader',
  component: FileUploader,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FileUploader>;

export const UploadImage: Story = {
  args: {
    name: 'icon',
    accept: 'image/png',
    placeholder: 'something icon',
    id: 'something-icon',
    required: true,
  },
  render: function Render(args) {
    const [previewInfo, setPreviewInfo] = useState<{
      name: string;
      dataUrl: string;
    } | null>(null);

    const updatePreview = useCallback((file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewInfo({ name: file.name, dataUrl: reader.result as string });
      };
    }, []);

    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        updatePreview(file);
      }
    };

    return (
      <FileUploader {...args} onChange={handleChangeFile}>
        <div className="flex flex-col justify-center items-center gap-4 py-4 text-zinc-400 dark:text-zinc-500">
          {previewInfo ? (
            <>
              <div className="relative w-12 h-12 rounded-xs">
                <img
                  src={previewInfo.dataUrl}
                  alt="preview-icon"
                  className="w-full h-full"
                />
              </div>
              <p className="text-sm text-zinc-900 dark:text-zinc-50">
                {previewInfo.name}
              </p>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-file-up-icon lucide-file-up"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M12 12v6" />
                <path d="m15 15-3-3-3 3" />
              </svg>
              <div className="flex flex-col justify-center items-center gap-1">
                <p className="text-sm">PNG 이미지를 여기에 끌어놓기</p>
                <p className="text-sm">또는 클릭해서 업로드</p>
              </div>
            </>
          )}
        </div>
      </FileUploader>
    );
  },
};
