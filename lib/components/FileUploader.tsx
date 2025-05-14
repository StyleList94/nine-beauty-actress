import {
  type ChangeEvent,
  type DragEvent,
  type MouseEvent,
  type ReactNode,
  useRef,
  useState,
} from 'react';
import { motion } from 'motion/react';

import { cn, isFileAccepted } from 'lib/utils';

export type FileUploaderProps = {
  /* 박스 안 내용을 구현할 때 사용합니다 */
  children: ReactNode;
  /* 박스 스타일을 커스터마이징 할 때 사용합니다 */
  className?: string;
  /* 파일 정보가 변경될 때 발생하는 이벤트를 핸들링할 때, 사용합니다 */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /* 유효하지 않은 파일 정보를 추가할 때 발생하는 이벤트 핸들러를 지정합니다. */
  onDropError?: (e: DragEvent<HTMLDivElement>) => void;
  /* DOM input의 속성 */
  name?: string;
  /* DOM input의 속성 */
  accept?: string;
  /* DOM input의 속성 */
  placeholder?: string;
  /* DOM input의 속성 */
  id?: string;
  /* DOM input의 속성 */
  required?: boolean;
};

/* 클릭해서 파일을 선택하거나, 파일을 끌어놓아 Form Data에 포함하고 싶을 때, 사용합니다. */
export const FileUploader = ({
  children,
  className,
  onDropError,
  onChange,
  ...rest
}: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileBoxStyle, setFileBoxStyle] = useState('border-zinc-400');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setFileBoxStyle('border-green-600/50');
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setFileBoxStyle('border-zinc-400');
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (fileInputRef.current && e.dataTransfer.files) {
      if (!isFileAccepted(e.dataTransfer.files[0], rest.accept)) {
        setFileBoxStyle('border-red-500/50 border-solid');
        onDropError?.(e);
        return;
      }
      fileInputRef.current.files = e.dataTransfer.files;
      fileInputRef.current.dispatchEvent(
        new Event('change', { bubbles: true }),
      );
      setFileBoxStyle('border-zinc-700 dark:border-zinc-300 border-solid');
    }
    setIsDragging(false);
  };

  const handleClickBox = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleChangeCapture = (e: ChangeEvent<HTMLInputElement>) => {
    setFileBoxStyle(
      e.target.files
        ? 'border-zinc-700 dark:border-zinc-300 border-solid'
        : 'border-zinc-400',
    );
  };

  return (
    <div className="relative">
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        animate={{
          scale: isDragging ? 1.02 : 1,
        }}
        onClick={handleClickBox}
        className={cn(
          'flex justify-center items-center border-2 rounded-sm p-4 border-dashed select-none',
          fileBoxStyle,
          className,
        )}
      >
        {children}
      </motion.div>
      <input
        type="file"
        ref={fileInputRef}
        onChangeCapture={handleChangeCapture}
        onChange={onChange}
        className="absolute bottom-0 -z-10 opacity-0 w-full"
        {...rest}
      />
    </div>
  );
};

export default FileUploader;
