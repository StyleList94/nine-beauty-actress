import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import { FileUploader } from 'lib/components/file-uploader';

describe('Rendering and Props', () => {
  it('should render file uploader area', async () => {
    await render(
      <FileUploader>
        <p>파일을 업로드하세요</p>
      </FileUploader>,
    );

    const area = page.getByLabelText('nine-file-uploader');
    await expect.element(area).toBeInTheDocument();
  });

  it('should render with placeholder text', async () => {
    await render(
      <FileUploader placeholder="이미지 선택">
        <p>PNG 이미지를 여기에 끌어놓기</p>
        <p>또는 클릭해서 업로드</p>
      </FileUploader>,
    );

    await expect
      .element(page.getByText('PNG 이미지를 여기에 끌어놓기'))
      .toBeInTheDocument();
    await expect
      .element(page.getByText('또는 클릭해서 업로드'))
      .toBeInTheDocument();
  });

  it('should render children content', async () => {
    await render(
      <FileUploader>
        <span>커스텀 콘텐츠</span>
      </FileUploader>,
    );

    await expect
      .element(page.getByText('커스텀 콘텐츠'))
      .toBeInTheDocument();
  });
});

describe('User Interactions', () => {
  it('should handle dragover event', async () => {
    await render(
      <FileUploader>
        <p>Drop here</p>
      </FileUploader>,
    );

    const box = page.getByLabelText('nine-file-uploader');
    box.element().dispatchEvent(
      new DragEvent('dragover', { bubbles: true, cancelable: true }),
    );

    await expect.element(box).toBeInTheDocument();
  });

  it('should handle dragleave event after dragover', async () => {
    await render(
      <FileUploader>
        <p>Drop here</p>
      </FileUploader>,
    );

    const box = page.getByLabelText('nine-file-uploader');
    box.element().dispatchEvent(
      new DragEvent('dragover', { bubbles: true, cancelable: true }),
    );
    box.element().dispatchEvent(
      new DragEvent('dragleave', { bubbles: true, cancelable: true }),
    );

    await expect.element(box).toBeInTheDocument();
  });

  it('should call onChange when a valid file is dropped', async () => {
    const handleChange = vi.fn();
    await render(
      <FileUploader onChange={handleChange}>
        <p>Drop here</p>
      </FileUploader>,
    );

    const box = page.getByLabelText('nine-file-uploader');
    const dt = new DataTransfer();
    dt.items.add(
      new File(['content'], 'photo.png', { type: 'image/png' }),
    );
    box.element().dispatchEvent(
      new DragEvent('drop', {
        dataTransfer: dt,
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(handleChange).toHaveBeenCalledOnce();
  });

  it('should call onDropError when an invalid file is dropped', async () => {
    const handleDropError = vi.fn();
    await render(
      <FileUploader accept="image/*" onDropError={handleDropError}>
        <p>Drop here</p>
      </FileUploader>,
    );

    const box = page.getByLabelText('nine-file-uploader');
    const dt = new DataTransfer();
    dt.items.add(
      new File(['text'], 'doc.txt', { type: 'text/plain' }),
    );
    box.element().dispatchEvent(
      new DragEvent('drop', {
        dataTransfer: dt,
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(handleDropError).toHaveBeenCalledOnce();
  });

  it('should not trigger onChange when drop has no files', async () => {
    const handleChange = vi.fn();
    await render(
      <FileUploader onChange={handleChange}>
        <p>Drop here</p>
      </FileUploader>,
    );

    const box = page.getByLabelText('nine-file-uploader');
    const dt = new DataTransfer();
    box.element().dispatchEvent(
      new DragEvent('drop', {
        dataTransfer: dt,
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should trigger file input click on box click', async () => {
    const clickSpy = vi
      .spyOn(HTMLInputElement.prototype, 'click')
      .mockImplementation(() => {});

    await render(
      <FileUploader>
        <p>Click to upload</p>
      </FileUploader>,
    );

    const box = page.getByLabelText('nine-file-uploader');
    await userEvent.click(box);

    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });
});
