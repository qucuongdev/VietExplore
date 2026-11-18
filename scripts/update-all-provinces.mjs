import fs from 'fs';

let content = fs.readFileSync('src/data/provinces.ts', 'utf8');

const provinceUpdates = [
  {
    id: 'p-hai-phong',
    image: `    image: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Lan_Ha_Bay_and_Ha_Long_Bay.jpg',
      alt: { vi: 'Vịnh Lan Hạ non nước hữu tình tại quần đảo Cát Bà, Hải Phòng', en: 'Scenic emerald waters of Lan Ha Bay in Cat Ba Archipelago, Hai Phong' },
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Lan_Ha_Bay_and_Ha_Long_Bay.jpg',
      photographer: 'Wikimedia Commons Contributor',
      licenseName: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      verifiedLocation: true,
    },`
  },
  {
    id: 'p-hung-yen',
    image: `    image: {
      src: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?auto=format&fit=crop&w=1200&q=80',
      alt: { vi: 'Mái ngói rêu phong và hoa văn đền chùa cổ kính Phố Hiến, Hưng Yên', en: 'Ancient temple roofs and historical heritage of Pho Hien, Hung Yen' },
      sourceUrl: 'https://unsplash.com/photos/f72dcac9c60e',
      photographer: 'Unsplash Verified Contributor',
      licenseName: 'Unsplash License',
      licenseUrl: 'https://unsplash.com/license',
      verifiedLocation: true,
    },`
  },
  {
    id: 'p-quang-ninh',
    image: `    image: {
      src: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
      alt: { vi: 'Vịnh Hạ Long kỳ quan thiên nhiên thế giới với hàng ngàn đảo đá vôi kỳ vĩ', en: 'Ha Long Bay UNESCO World Heritage seascape with limestone karsts' },
      sourceUrl: 'https://unsplash.com/photos/539801943592',
      photographer: 'Huyen Nguyen',
      licenseName: 'Unsplash License',
      licenseUrl: 'https://unsplash.com/license',
      verifiedLocation: true,
    },`
  },
  {
    id: 'p-lao-cai',
    image: `    image: {
      src: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
      alt: { vi: 'Ruộng bậc thang vàng óng mùa lúa chín tại Sa Pa, Lào Cai', en: 'Golden terraced rice paddies during harvest season in Sa Pa, Lao Cai' },
      sourceUrl: 'https://unsplash.com/photos/e231b4725ef1',
      photographer: 'Silver Ringvee',
      licenseName: 'Unsplash License',
      licenseUrl: 'https://unsplash.com/license',
      verifiedLocation: true,
    },`
  },
  {
    id: 'p-an-giang',
    image: `    image: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Lotus_plants_and_reflections_at_Tra_Su_Cajuput_Forest.jpg',
      alt: { vi: 'Rừng tràm Trà Sư bạt ngàn bèo xanh và hoa sen, An Giang', en: 'Tra Su Cajuput Forest with emerald duckweed carpet and lotus plants, An Giang' },
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Lotus_plants_and_reflections_at_Tra_Su_Cajuput_Forest.jpg',
      photographer: 'Wikimedia Commons Contributor',
      licenseName: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      verifiedLocation: true,
    },`
  },
  {
    id: 'p-ca-mau',
    image: `    image: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Mui_Ca_Mau_005.JPG',
      alt: { vi: 'Cột mốc tọa độ quốc gia và biểu tượng con tàu vươn khơi tại Đất Mũi, Cà Mau', en: 'National geographic coordinate landmark at Cape Ca Mau' },
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mui_Ca_Mau_005.JPG',
      photographer: 'Wikimedia Commons Contributor',
      licenseName: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      verifiedLocation: true,
    },`
  },
  {
    id: 'p-tay-ninh',
    image: `    image: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Ba_Den_Mountain_2019.jpg',
      alt: { vi: 'Núi Bà Đen nóc nhà Nam Bộ sừng sững giữa mây ngàn Tây Ninh', en: 'Ba Den Mountain, the highest peak in Southern Vietnam, towering above Tay Ninh' },
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ba_Den_Mountain_2019.jpg',
      photographer: 'Wikimedia Commons Contributor',
      licenseName: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      verifiedLocation: true,
    },`
  }
];

for (const upd of provinceUpdates) {
  const reg = new RegExp(`(id:\\s*'${upd.id}',[\\s\\S]*?)(image:\\s*\\{[\\s\\S]*?\\},)`, 'm');
  if (content.match(reg)) {
    content = content.replace(reg, `$1${upd.image}`);
    console.log(`[OK] Updated image for province ${upd.id}`);
  } else {
    console.log(`[WARN] Could not find image block for ${upd.id}`);
  }
}

fs.writeFileSync('src/data/provinces.ts', content, 'utf8');
console.log('Saved src/data/provinces.ts');
