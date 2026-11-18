import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import DestinationDirectoryClient from '@/components/destinations/DestinationDirectoryClient';
import { destinations } from '@/data/destinations';
import { provinces } from '@/data/provinces';
import { categories } from '@/data/categories';

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(window.location.search),
}));

vi.mock('@/components/destinations/DestinationCard', () => ({
  default: ({ destination }: { destination: { name: { en: string } } }) => <article>{destination.name.en}</article>,
}));

const directory = <DestinationDirectoryClient destinations={destinations} provinces={provinces} categories={categories} locale="en" />;

afterEach(() => {
  cleanup();
  window.history.replaceState(null, '', '/');
});

describe('Destination directory URL state', () => {
  it('accepts repeated search parameters and consistently uses the first values', () => {
    window.history.replaceState(null, '', '/en/destinations?q=da+lat&q=hanoi&category=all&category=heritage&province=all&province=p-ha-noi');
    render(directory);

    expect(screen.getByRole('textbox')).toHaveValue('da lat');
    expect(screen.getByRole('combobox')).toHaveValue('all');
    expect(screen.getByRole('article', { name: '' })).toHaveTextContent('Xuan Huong');
  });

  it('updates results and controls when the URL changes without remounting', () => {
    window.history.replaceState(null, '', '/en/destinations?category=beaches');
    const { rerender } = render(directory);
    expect(screen.queryByText('Ha Long Bay')).toBeInTheDocument();

    window.history.pushState(null, '', '/en/destinations?q=da+lat&province=p-lam-dong');
    rerender(<DestinationDirectoryClient destinations={destinations} provinces={provinces} categories={categories} locale="en" />);

    expect(screen.getByRole('textbox')).toHaveValue('da lat');
    expect(screen.getByRole('combobox')).toHaveValue('p-lam-dong');
    expect(screen.queryByText('Ha Long Bay')).not.toBeInTheDocument();
    expect(screen.getByRole('article')).toHaveTextContent('Xuan Huong');
  });

  it('preserves the locale, unrelated parameters, hash, and spaces while editing and resetting', () => {
    window.history.replaceState(null, '', '/en/destinations?ref=guide&category=heritage#results');
    const { rerender } = render(directory);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'ha ' } });
    expect(new URLSearchParams(window.location.search).get('q')).toBe('ha ');
    expect(window.location.pathname).toBe('/en/destinations');
    expect(window.location.hash).toBe('#results');

    rerender(<DestinationDirectoryClient destinations={destinations} provinces={provinces} categories={categories} locale="en" />);
    fireEvent.click(screen.getByRole('button', { name: 'Clear all' }));
    expect(window.location.search).toBe('?ref=guide');
    expect(window.location.hash).toBe('#results');
  });
});
