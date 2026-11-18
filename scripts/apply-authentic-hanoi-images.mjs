import fs from 'fs';

let content = fs.readFileSync('src/data/destinations.ts', 'utf8');

const replacements = [
  {
    slug: 'ho-guom-pho-co',
    newImages: `    images: [
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Hoan_kiem_lake_huc_bridge_hanoi_2007_01.jpg',
        alt: { vi: 'Cầu Thê Húc son đỏ dẫn lối vào Đền Ngọc Sơn trên Hồ Gươm', en: 'Vermilion arched The Huc Bridge leading to Ngoc Son Temple on Hoan Kiem Lake' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hoan_kiem_lake_huc_bridge_hanoi_2007_01.jpg',
        photographer: 'Rolf Müller',
        licenseName: 'CC BY-SA 3.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        verifiedLocation: true,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Hoan_kiem_lake_turtle_tower_hanoi_2007_01.jpg',
        alt: { vi: 'Tháp Rùa rêu phong cổ kính giữa lòng Hồ Gươm', en: 'Historic moss-covered Turtle Tower resting in the middle of Hoan Kiem Lake' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hoan_kiem_lake_turtle_tower_hanoi_2007_01.jpg',
        photographer: 'Rolf Müller',
        licenseName: 'CC BY-SA 3.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        verifiedLocation: true,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Street_vendors_in_old_quarter%2C_Hanoi%2C_Vietnam.jpg',
        alt: { vi: 'Gánh hàng hoa và nhịp sống yên bình trên góc phố cổ Hà Nội', en: 'Flower street vendors and charming daily life in Hanoi Old Quarter' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Street_vendors_in_old_quarter,_Hanoi,_Vietnam.jpg',
        photographer: 'yeowatzup',
        licenseName: 'CC BY 2.0',
        licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
        verifiedLocation: true,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Vietnamese_Egg_Coffee_%288704422450%29.jpg',
        alt: { vi: 'Ly cà phê trứng béo ngậy thơm nức hương vị truyền thống Hà Nội', en: 'Rich and creamy traditional Hanoi egg coffee' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Vietnamese_Egg_Coffee_(8704422450).jpg',
        photographer: 'Migle',
        licenseName: 'CC BY-SA 2.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
        verifiedLocation: true,
      },
    ],`
  },
  {
    slug: 'van-mieu-quoc-tu-giam',
    newImages: `    images: [
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Constellation_of_Literature_pavilion_-_Temple_of_Literature%2C_Hanoi_-_DSC04693.JPG',
        alt: { vi: 'Khuê Văn Các cổ kính bóng soi giếng Thiên Quang tĩnh mịch', en: 'Ancient Khue Van Cac Pavilion mirrored in the serene Well of Heavenly Clarity' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Constellation_of_Literature_pavilion_-_Temple_of_Literature,_Hanoi_-_DSC04693.JPG',
        photographer: 'Daderot',
        licenseName: 'CC0 1.0 Universal',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        verifiedLocation: true,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Stelae_of_Doctors_-_Temple_of_Literature%2C_Hanoi_-_DSC04685.JPG',
        alt: { vi: 'Vườn 82 bia Tiến sĩ trên lưng rùa đá uy nghiêm tại Văn Miếu', en: 'Rows of 82 doctorate turtle stelae standing reverently at Temple of Literature' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Stelae_of_Doctors_-_Temple_of_Literature,_Hanoi_-_DSC04685.JPG',
        photographer: 'Daderot',
        licenseName: 'CC0 1.0 Universal',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        verifiedLocation: true,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Main_gate_-_Temple_of_Literature%2C_Hanoi_-_DSC04529.JPG',
        alt: { vi: 'Cổng Đại Trung Môn rợp bóng cổ thụ chốn trường thi xưa', en: 'Dai Trung Mon Gate surrounded by lush canopy at the historic academy' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Main_gate_-_Temple_of_Literature,_Hanoi_-_DSC04529.JPG',
        photographer: 'Daderot',
        licenseName: 'CC0 1.0 Universal',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        verifiedLocation: true,
      },
    ],`
  },
  {
    slug: 'hoang-thanh-thang-long',
    newImages: `    images: [
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Doan_Mon_Gate_2.jpg',
        alt: { vi: 'Cổng Đoan Môn sừng sững tại Hoàng thành Thăng Long di sản thế giới', en: 'Monumental Doan Mon Gate at the Imperial Citadel of Thang Long' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Doan_Mon_Gate_2.jpg',
        photographer: 'Christophe95',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Flag_tower%2C_Hanoi.jpg',
        alt: { vi: 'Cột cờ Hà Nội (Kỳ Đài) sừng sững trong khuôn viên Hoàng thành', en: 'Hanoi Flag Tower standing proudly in the Imperial Citadel complex' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Flag_tower,_Hanoi.jpg',
        photographer: 'Chinasaur',
        licenseName: 'CC BY-SA 2.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
        verifiedLocation: true,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Doan_Mon_Gate_3.jpg',
        alt: { vi: 'Không gian quảng trường cỏ xanh trước cổng Đoan Môn', en: 'Green lawn plaza in front of ancient Doan Mon Gate' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Doan_Mon_Gate_3.jpg',
        photographer: 'Christophe95',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
    ],`
  },
  {
    slug: 'ho-tay-chua-tran-quoc',
    newImages: `    images: [
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Tran_Quoc_Pagoda%2C_Hanoi%2C_Vietnam%2C_20240123_1212_3310.jpg',
        alt: { vi: 'Bảo tháp Lục Độ Đài Sen chùa Trấn Quốc soi bóng sóng nước Hồ Tây', en: 'Stunning Buddhist stupa of Tran Quoc Pagoda reflecting on West Lake' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tran_Quoc_Pagoda,_Hanoi,_Vietnam,_20240123_1212_3310.jpg',
        photographer: 'Jakub Hałun',
        licenseName: 'CC BY 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
        verifiedLocation: true,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/West_lake_11-12-2016.jpg',
        alt: { vi: 'Hoàng hôn nhuộm vàng mặt nước Hồ Tây mênh mang lộng gió', en: 'Golden sunset over the breezy expanse of West Lake' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:West_lake_11-12-2016.jpg',
        photographer: 'Dream2901',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Tran_Quoc_Pagoda%2C_Hanoi%2C_Vietnam%2C_20240123_1212_3307.jpg',
        alt: { vi: 'Cổng tam quan cổ kính của Chùa Trấn Quốc trên đường Thanh Niên', en: 'Ancient gate of Tran Quoc Pagoda on scenic Thanh Nien Road' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tran_Quoc_Pagoda,_Hanoi,_Vietnam,_20240123_1212_3307.jpg',
        photographer: 'Jakub Hałun',
        licenseName: 'CC BY 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
        verifiedLocation: true,
      },
    ],`
  },
  {
    slug: 'nha-tho-lon-ha-noi',
    newImages: `    images: [
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/St_Joseph_Cathedral_Hanoi_0376.JPG',
        alt: { vi: 'Nhà thờ Lớn Hà Nội với kiến trúc Gothic châu Âu trầm mặc giữa lòng phố cổ', en: 'St. Joseph Cathedral in European Neo-Gothic architecture in Hanoi' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:St_Joseph_Cathedral_Hanoi_0376.JPG',
        photographer: 'Gryffindor',
        licenseName: 'CC BY-SA 3.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        verifiedLocation: true,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/8/87/St_Joseph_Cathedral_Hanoi_0383.JPG',
        alt: { vi: 'Góc nhìn nghiêng nhà thờ Lớn và văn hóa trà chanh vỉa hè quen thuộc', en: 'Side facade of St. Joseph Cathedral and quintessential sidewalk tea scene' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:St_Joseph_Cathedral_Hanoi_0383.JPG',
        photographer: 'Gryffindor',
        licenseName: 'CC BY-SA 3.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        verifiedLocation: true,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/St_Joseph_Cathedral_Hanoi_0377.JPG',
        alt: { vi: 'Cận cảnh tháp chuông đôi và phù điêu đá cổ kính của Nhà thờ Lớn', en: 'Close-up of twin bell towers and stone reliefs of St. Joseph Cathedral' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:St_Joseph_Cathedral_Hanoi_0377.JPG',
        photographer: 'Gryffindor',
        licenseName: 'CC BY-SA 3.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        verifiedLocation: true,
      },
    ],`
  },
  {
    slug: 'cau-long-bien',
    newImages: `    images: [
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/LONG_BIEN_BRIDGE_HANOI_VIETNAM_FEB_2012.jpg',
        alt: { vi: 'Cầu Long Biên chứng nhân lịch sử vắt qua dòng sông Hồng cuộn đỏ phù sa', en: 'Historic Eiffel-engineered Long Bien Bridge spanning the Red River' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:LONG_BIEN_BRIDGE_HANOI_VIETNAM_FEB_2012.jpg',
        photographer: 'calflier001',
        licenseName: 'CC BY-SA 2.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
        verifiedLocation: true,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/LONG_BIEN_BRIDGE_HANOI_VIETNAM_FEB_2012_%287011987601%29.jpg',
        alt: { vi: 'Đoàn tàu hỏa và dòng xe máy mộc mạc lưu thông trên cầu Long Biên', en: 'Railway tracks and motorbikes crossing the century-old steel bridge' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:LONG_BIEN_BRIDGE_HANOI_VIETNAM_FEB_2012_(7011987601).jpg',
        photographer: 'calflier001',
        licenseName: 'CC BY-SA 2.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
        verifiedLocation: true,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/3/30/LONG_BIEN_BRIDGE_HANOI_VIETNAM_FEB_2012_%286865894882%29.jpg',
        alt: { vi: 'Khung dầm thép uốn lượn nhấp nhô như dải lụa qua lòng sông Hồng', en: 'Wavy cantilever steel trusses of Long Bien Bridge against the afternoon sky' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:LONG_BIEN_BRIDGE_HANOI_VIETNAM_FEB_2012_(6865894882).jpg',
        photographer: 'calflier001',
        licenseName: 'CC BY-SA 2.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
        verifiedLocation: true,
      },
    ],`
  },
  {
    slug: 'chua-mot-cot-lang-bac',
    newImages: `    images: [
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/One_Pillar_Pagoda_Hanoi_Vietnam.jpg',
        alt: { vi: 'Chùa Một Cột tựa như đóa hoa sen ngát hương vươn lên từ mặt hồ nước', en: 'One Pillar Pagoda resembling an elegant lotus blossoming above the pond' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:One_Pillar_Pagoda_Hanoi_Vietnam.jpg',
        photographer: 'Thomas Schoch',
        licenseName: 'CC BY-SA 2.5',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.5/',
        verifiedLocation: true,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Hanoi_Vietnam_Mausoleum-of-Ho-Chi-Minh-01.jpg',
        alt: { vi: 'Lăng Chủ tịch Hồ Chí Minh uy nghi trên Quảng trường Ba Đình lịch sử', en: 'Ho Chi Minh Mausoleum standing majestically across historic Ba Dinh Square' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hanoi_Vietnam_Mausoleum-of-Ho-Chi-Minh-01.jpg',
        photographer: 'CEphoto, Uwe Aranas',
        licenseName: 'CC BY-SA 3.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        verifiedLocation: true,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/One_Pillar_Pagoda_-_Hanoi%2C_Vietnam_-_DSC03500.JPG',
        alt: { vi: 'Kiến trúc cột đá độc nhất vô nhị nâng đỡ ngôi chùa gỗ cổ kính', en: 'Unique single stone pillar supporting the wooden shrine of One Pillar Pagoda' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:One_Pillar_Pagoda_-_Hanoi,_Vietnam_-_DSC03500.JPG',
        photographer: 'Daderot',
        licenseName: 'CC0 1.0 Universal',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        verifiedLocation: true,
      },
    ],`
  },
  {
    slug: 'lang-co-duong-lam',
    newImages: `    images: [
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/The-ancient-village-3358830.jpg',
        alt: { vi: 'Cổng ngõ và tường đá ong vàng rêu phong đặc trưng xứ Đoài tại làng cổ Đường Lâm', en: 'Weathered laterite stone walls and historic village paths of Duong Lam' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:The-ancient-village-3358830.jpg',
        photographer: 'Quangpraha',
        licenseName: 'CC0 1.0 Universal',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        verifiedLocation: true,
      },
    ],`
  },
  {
    slug: 'vuon-quoc-gia-ba-vi',
    newImages: `    images: [
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Nha_co_Ba_Vi.JPG',
        alt: { vi: 'Phế tích nhà thờ Pháp cổ huyền bí giữa rừng già mờ sương Ba Vì', en: 'Mystical ruins of historic French church surrounded by misty Ba Vi mountain forest' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Nha_co_Ba_Vi.JPG',
        photographer: 'Viethavvh',
        licenseName: 'Public Domain',
        licenseUrl: 'https://commons.wikimedia.org/wiki/File:Nha_co_Ba_Vi.JPG',
        verifiedLocation: true,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Ba_V%C3%AC_National_Park%2C_foggy_road.jpg',
        alt: { vi: 'Cung đường đèo rợp bóng thông xanh mướt uốn lượn lên đỉnh Ba Vì', en: 'Winding pine-lined foggy mountain highway ascending Ba Vi peak' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ba_V%C3%AC_National_Park,_foggy_road.jpg',
        photographer: 'Tycho',
        licenseName: 'CC BY-SA 3.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        verifiedLocation: true,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Vuon_QG_Ba_Vi.JPG',
        alt: { vi: 'Cảnh sắc thiên nhiên xanh mát ngút ngàn trên triền núi Ba Vì', en: 'Lush green mountain vistas stretching along the Ba Vi scenic mountain peaks' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Vuon_QG_Ba_Vi.JPG',
        photographer: 'Viethavvh',
        licenseName: 'Public Domain',
        licenseUrl: 'https://commons.wikimedia.org/wiki/File:Vuon_QG_Ba_Vi.JPG',
        verifiedLocation: true,
      },
    ],`
  },
  {
    slug: 'lang-gom-bat-trang',
    newImages: `    images: [
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Bat-Trang-Ceramic-Village8.jpg',
        alt: { vi: 'Nghệ nhân vuốt đất tạo hình gốm mộc mạc trên bàn xoay truyền thống Bát Tràng', en: 'Artisan crafting clay pottery on a traditional rotating wheel at Bat Trang' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bat-Trang-Ceramic-Village8.jpg',
        photographer: 'Steven C. Price',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Bat-Trang-Ceramic-Village7.jpg',
        alt: { vi: 'Gian trưng bày các tác phẩm gốm sứ men rạn và men ngọc cổ truyền', en: 'Display of traditional crackle glaze ceramic creations in Bat Trang workshops' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bat-Trang-Ceramic-Village7.jpg',
        photographer: 'Steven C. Price',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Bat-Trang-Ceramic-Village10.jpg',
        alt: { vi: 'Lọ hoa và đồ gốm mỹ nghệ Bát Tràng tinh xảo qua bàn tay nghệ nhân', en: 'Exquisite ceramic vases and art pieces created by skilled artisans' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bat-Trang-Ceramic-Village10.jpg',
        photographer: 'Steven C. Price',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
    ],`
  }
];

for (const rep of replacements) {
  // Find destination block by slug
  const slugRegex = new RegExp(`(slug:\\s*'${rep.slug}',[\\s\\S]*?)(images:\\s*\\[[\\s\\S]*?\\],)`, 'm');
  const match = content.match(slugRegex);
  if (match) {
    content = content.replace(slugRegex, `$1${rep.newImages}`);
    console.log(`[OK] Replaced images for ${rep.slug}`);
  } else {
    console.log(`[WARN] Could not find images block for ${rep.slug}`);
  }
}

fs.writeFileSync('src/data/destinations.ts', content, 'utf8');
console.log('Finished updating src/data/destinations.ts');
