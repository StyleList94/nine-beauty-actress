import '@testing-library/jest-dom/vitest';
import { composeStories } from '@storybook/react-vite';

import { render, screen } from '@testing-library/react';

import { ToggleGroup, ToggleGroupItem } from 'lib/components/toggle-group';

import * as stories from '../stories/ToggleGroup.stories';

const { SingleSelection, MultipleSelection, Variants, Sizes, Spacing } =
  composeStories(stories);

describe('ToggleGroup', () => {
  it('should render toggle group with items', () => {
    render(<SingleSelection />);

    expect(screen.getByRole('group')).toBeInTheDocument();
    expect(screen.getByLabelText('Toggle bold')).toBeInTheDocument();
    expect(screen.getByLabelText('Toggle italic')).toBeInTheDocument();
    expect(screen.getByLabelText('Toggle underline')).toBeInTheDocument();
  });

  it('should render with initial state', () => {
    render(<SingleSelection />);

    const boldItem = screen.getByLabelText('Toggle bold');
    const italicItem = screen.getByLabelText('Toggle italic');

    expect(boldItem).toHaveAttribute('data-state', 'on');
    expect(italicItem).toHaveAttribute('data-state', 'off');
  });

  it('should render multiple selection with initial state', () => {
    render(<MultipleSelection />);

    const centerItem = screen.getByLabelText('Align center');
    expect(centerItem).toHaveAttribute('data-state', 'on');
  });

  it('should apply variant styles', () => {
    render(<Variants />);

    const groups = screen.getAllByRole('group');
    expect(groups[0]).toHaveAttribute('data-variant', 'default');
    expect(groups[1]).toHaveAttribute('data-variant', 'outline');
  });

  it('should apply size styles', () => {
    render(<Sizes />);

    const groups = screen.getAllByRole('group');
    expect(groups[0]).toHaveAttribute('data-size', 'sm');
    expect(groups[1]).toHaveAttribute('data-size', 'default');
    expect(groups[2]).toHaveAttribute('data-size', 'lg');
  });

  it('should apply spacing styles', () => {
    render(<Spacing />);

    const groups = screen.getAllByRole('group');
    expect(groups[0]).toHaveAttribute('data-spacing', 'tight');
    expect(groups[1]).toHaveAttribute('data-spacing', 'spaced');
    expect(groups[2]).toHaveAttribute('data-spacing', 'spaced');
  });

  it('should have proper ARIA attributes', () => {
    render(<SingleSelection />);

    const group = screen.getByRole('group');
    expect(group).toHaveAttribute('aria-label', 'Text style');
  });

  it('should render disabled state', () => {
    render(
      <ToggleGroup type="single" disabled aria-label="Test group">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          Bold
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          Italic
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    const boldItem = screen.getByLabelText('Toggle bold');
    expect(boldItem).toHaveAttribute('data-disabled');
  });

  it('should support vertical orientation', () => {
    render(<SingleSelection orientation="vertical" />);

    const group = screen.getByRole('group');
    expect(group).toBeInTheDocument();
  });
});
