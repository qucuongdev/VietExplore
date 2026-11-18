import fs from 'fs';

// Update provinces.ts for p-ha-noi
let provinces = fs.readFileSync('src/data/provinces.ts', 'utf8');

const oldHanoiProvinceImage = `    image: {
      src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
      alt: { vi: 'Hồ Gươm và Tháp Rùa Hà Nội', en: 'Hoan Kiem Lake and Turtle Tower in Hanoi' },
      sourceUrl: 'https://unsplash.com/photos/f550ce710b93',
      photographer: 'Unsplash Verified Contributor',
      licenseName: 'Unsplash License',
      licenseUrl: 'https://unsplash.com/license',
      verifiedLocation: true,
    },`;

const newHanoiProvinceImage = `    image: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Hoan_kiem_lake_turtle_tower_hanoi_2007_01.jpg',
      alt: { vi: 'Tháp Rùa rêu phong soi bóng mặt nước Hồ Gươm, Hà Nội', en: 'Ancient Turtle Tower reflected on tranquil Hoan Kiem Lake, Hanoi' },
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hoan_kiem_lake_turtle_tower_hanoi_2007_01.jpg',
      photographer: 'Rolf Müller',
      licenseName: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      verifiedLocation: true,
    },`;

if (provinces.includes(oldHanoiProvinceImage)) {
  provinces = provinces.replace(oldHanoiProvinceImage, newHanoiProvinceImage);
  fs.writeFileSync('src/data/provinces.ts', provinces, 'utf8');
  console.log('[OK] Updated p-ha-noi image in provinces.ts');
} else {
  console.log('[WARN] Could not find exact oldHanoiProvinceImage match in provinces.ts');
}
