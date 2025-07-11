import '@testing-library/jest-dom/vitest';

import { composeStories } from '@storybook/react-vite';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import * as stories from '../stories/FileUploader.stories';

const { UploadImage } = composeStories(stories);

describe('FileUploader', () => {
  it('should render and upload file', async () => {
    const user = userEvent.setup();
    render(<UploadImage />);

    const box = screen.getByLabelText('nine-file-uploader');

    expect(box).toBeInTheDocument();

    expect(
      screen.getByText('PNG 이미지를 여기에 끌어놓기'),
    ).toBeInTheDocument();
    expect(screen.getByText('또는 클릭해서 업로드')).toBeInTheDocument();

    const image = new File(['plug-in-baby'], 'plug-in-baby.png', {
      type: 'image/png',
    });

    const input: HTMLInputElement =
      screen.getByPlaceholderText('something icon');

    await user.upload(input, image);

    expect(input.files?.[0]).toBe(image);
    expect(input.files?.item(0)).toBe(image);
    expect(input.files).toHaveLength(1);

    expect(await screen.findByText('plug-in-baby.png')).toBeInTheDocument();
  });
});
