import { describe, it, expect } from 'vitest';
import { removeVietnameseDiacritics } from '@/lib/utils';

describe('Vietnamese Diacritic Search Helper', () => {
  it('correctly normalizes strings with accents', () => {
    expect(removeVietnameseDiacritics('Đà Lạt')).toBe('da lat');
    expect(removeVietnameseDiacritics('Hà Nội')).toBe('ha noi');
    expect(removeVietnameseDiacritics('Hải Phòng')).toBe('hai phong');
    expect(removeVietnameseDiacritics('Đà Nẵng')).toBe('da nang');
    expect(removeVietnameseDiacritics('Thành phố Hồ Chí Minh')).toBe('thanh pho ho chi minh');
  });

  it('correctly handles uppercase and lowercase letter Đ / đ', () => {
    expect(removeVietnameseDiacritics('ĐỒNG NAI')).toBe('dong nai');
    expect(removeVietnameseDiacritics('đắk lắk')).toBe('dak lak');
    expect(removeVietnameseDiacritics('Điện Biên')).toBe('dien bien');
  });
});
