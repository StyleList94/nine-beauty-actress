import {
  type ChangeEvent,
  type DragEvent,
  type InputHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  useRef,
  useState,
} from 'react';
import { LazyMotion, domAnimation } from 'motion/react';
import * as m from 'motion/react-m';

import { cn, isFileAccepted } from 'lib/core/utils';

import {
  fileUploaderContainer,
  fileUploaderBox,
  fileUploaderBoxNeutral,
  fileUploaderBoxDragging,
  fileUploaderBoxError,
  fileUploaderBoxSelected,
  fileUploaderInput,
} from './style.css';

export type FileUploaderProps = {
  /** 박스 안 내용을 구현할 때 사용합니다 */
  children: ReactNode;
  /** 박스 스타일을 커스터마이징 할 때 사용합니다 */
  className?: string;
  /** 파일 정보가 변경될 때 발생하는 이벤트를 핸들링할 때, 사용합니다 */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /** 유효하지 않은 파일 정보를 추가할 때 발생하는 이벤트 핸들러를 지정합니다. */
  onDropError?: (e: DragEvent<HTMLDivElement>) => void;
  /** HTML input의 name 속성 */
  name?: InputHTMLAttributes<HTMLInputElement>['name'];
  /** HTML input의 accept 속성 */
  accept?: InputHTMLAttributes<HTMLInputElement>['accept'];
  /** HTML input의 placeholder 속성 */
  placeholder?: InputHTMLAttributes<HTMLInputElement>['placeholder'];
  /** HTML input의 id 속성 */
  id?: InputHTMLAttributes<HTMLInputElement>['id'];
  /** HTML input의 required 속성 */
  required?: InputHTMLAttributes<HTMLInputElement>['required'];
};

type BorderState = 'neutral' | 'dragging' | 'error' | 'selected';

const getBorderClass = (state: BorderState) => {
  switch (state) {
    case 'neutral':
      return fileUploaderBoxNeutral;
    case 'dragging':
      return fileUploaderBoxDragging;
    case 'error':
      return fileUploaderBoxError;
    case 'selected':
      return fileUploaderBoxSelected;
    default: {
      const exhaustiveCheck: never = state;
      return exhaustiveCheck;
    }
  }
};

/** 클릭해서 파일을 선택하거나, 파일을 끌어놓아 Form Data에 포함하고 싶을 때, 사용합니다. */
export const FileUploader = ({
  children,
  className,
  onDropError,
  onChange,
  ...rest
}: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [borderState, setBorderState] = useState<BorderState>('neutral');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setBorderState('dragging');
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setBorderState('neutral');
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (fileInputRef.current && e.dataTransfer.files.length > 0) {
      if (!isFileAccepted(e.dataTransfer.files[0], rest.accept)) {
        setBorderState('error');
        onDropError?.(e);
        return;
      }
      fileInputRef.current.files = e.dataTransfer.files;
      fileInputRef.current.dispatchEvent(
        new Event('change', { bubbles: true }),
      );
      setBorderState('selected');
    }
    setIsDragging(false);
  };

  const handleClickBox = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleChangeCapture = (e: ChangeEvent<HTMLInputElement>) => {
    setBorderState(e.target.files ? 'selected' : 'neutral');
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className={fileUploaderContainer}>
        <m.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          animate={{
            scale: isDragging ? 1.02 : 1,
          }}
          onClick={handleClickBox}
          className={cn(
            fileUploaderBox,
            getBorderClass(borderState),
            className,
          )}
          aria-label="nine-file-uploader"
        >
          {children}
        </m.div>
        <input
          type="file"
          ref={fileInputRef}
          onChangeCapture={handleChangeCapture}
          onChange={onChange}
          className={fileUploaderInput}
          {...rest}
        />
      </div>
    </LazyMotion>
  );
};

export default FileUploader;
