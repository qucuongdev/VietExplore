import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import DestinationGallery from '@/components/destinations/DestinationGallery';
import type { ImageAsset } from '@/types/content';

const images: ImageAsset[] = ['first', 'second'].map((name) => ({
  src: `/images/${name}.jpg`,
  alt: { en: `${name} photo`, vi: `${name} photo` },
  sourceUrl: '',
  licenseName: 'Test license',
  licenseUrl: '',
  verifiedLocation: true,
}));

beforeEach(() => {
  // Happy DOM has no native modal behavior; focus containment is verified in Chromium.
  vi.spyOn(HTMLDialogElement.prototype, 'showModal').mockImplementation(function (this: HTMLDialogElement) {
    this.setAttribute('open', '');
  });
  vi.spyOn(HTMLDialogElement.prototype, 'close').mockImplementation(function (this: HTMLDialogElement) {
    this.removeAttribute('open');
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  document.body.style.overflow = '';
});

describe('Destination gallery', () => {
  it('can change between empty and populated images without changing hook order', () => {
    const { rerender } = render(<DestinationGallery images={[]} destinationName="Hanoi" locale="en" />);
    expect(screen.getByRole('img', { name: 'Hanoi' })).toBeInTheDocument();

    rerender(<DestinationGallery images={images} destinationName="Hanoi" locale="en" />);
    fireEvent.click(screen.getByRole('button', { name: 'Next photo' }));
    expect(screen.getAllByRole('img', { name: 'second photo' })).toHaveLength(2);

    rerender(<DestinationGallery images={[]} destinationName="Hanoi" locale="en" />);
    expect(screen.getByRole('img', { name: 'Hanoi' })).toBeInTheDocument();
  });

  it('shows an uncropped modal image, supports arrow keys and cancel, and restores scroll and focus', () => {
    document.body.style.overflow = 'clip';
    render(<DestinationGallery images={images} destinationName="Hanoi" locale="en" />);
    const opener = screen.getByRole('button', { name: /View full/ });
    opener.focus();
    fireEvent.click(opener);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('open');
    expect(document.body.style.overflow).toBe('hidden');
    expect(within(dialog).getAllByRole('img')[0]).toHaveClass('object-contain');

    fireEvent.keyDown(dialog, { key: 'ArrowRight' });
    expect(within(dialog).getAllByRole('img')[0]).toHaveAttribute('alt', 'second photo');
    fireEvent(dialog, new Event('cancel', { cancelable: true }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('clip');
    expect(opener).toHaveFocus();
  });

  it('closes the modal and resets selection when the image collection changes', () => {
    const { rerender } = render(<DestinationGallery images={images} destinationName="Hanoi" locale="en" />);
    fireEvent.click(screen.getByRole('button', { name: 'Next photo' }));
    fireEvent.click(screen.getByRole('button', { name: /View full/ }));

    rerender(<DestinationGallery images={[images[0]]} destinationName="Hanoi" locale="en" />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'first photo' })).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
  });
});
