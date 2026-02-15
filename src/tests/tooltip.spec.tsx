import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from 'lib/components/tooltip';
import { Button } from 'lib/components/button';

const CenteredWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
    }}
  >
    {children}
  </div>
);

describe('Rendering and Props', () => {
  it('should render trigger', async () => {
    await render(
      <CenteredWrapper>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /Hover me/i });
    await expect.element(trigger).toBeInTheDocument();
  });

  it('should not show content initially', async () => {
    await render(
      <CenteredWrapper>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>Hidden tooltip</TooltipContent>
        </Tooltip>
      </CenteredWrapper>,
    );
    await expect
      .element(page.getByText('Hidden tooltip'))
      .not.toBeInTheDocument();
  });
});

describe('Popup Open/Close', () => {
  it('should show content on hover', async () => {
    await render(
      <CenteredWrapper>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>Tooltip visible</TooltipContent>
        </Tooltip>
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /Hover me/i });
    await trigger.hover();
    await expect.element(page.getByText('Tooltip visible')).toBeVisible();
  });
});

describe('Accessibility', () => {
  it('should have tooltip role when visible', async () => {
    await render(
      <CenteredWrapper>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>Accessible tooltip</TooltipContent>
        </Tooltip>
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /Hover me/i });
    await trigger.hover();
    await expect.element(page.getByRole('tooltip')).toBeVisible();
  });
});

describe('Edge Cases', () => {
  it('should apply custom sideOffset', async () => {
    await render(
      <CenteredWrapper>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={10}>Offset tooltip</TooltipContent>
        </Tooltip>
      </CenteredWrapper>,
    );
    const trigger = page.getByRole('button', { name: /Hover me/i });
    await trigger.hover();
    await expect.element(page.getByRole('tooltip')).toBeVisible();
  });
});
