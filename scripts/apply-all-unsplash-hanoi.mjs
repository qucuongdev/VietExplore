import fs from 'fs';

let content = fs.readFileSync('src/data/destinations.ts', 'utf8');

const hanoiDestinations = [
  {
    slug: 'ho-guom-pho-co',
    images: `    images: [
      {
        src: 'https://images.unsplash.com/photo-1689080492397-820b860a8606?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Tháp Rùa rêu phong cổ kính giữa làn nước biếc Hồ Gươm', en: 'Historic Turtle Tower resting peacefully on emerald Hoan Kiem Lake' },
        sourceUrl: 'https://unsplash.com/photos/820b860a8606',
        photographer: 'Thuy Nguyen',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1547024842-a0e3d2127406?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Phố cổ Hà Nội với nhịp sống bình dị và những ban công hoa rực rỡ', en: 'Hanoi Old Quarter streets bustling with life and French-colonial balconies' },
        sourceUrl: 'https://unsplash.com/photos/a0e3d2127406',
        photographer: 'Ashim D’Silva',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Bát phở bò gia truyền phố cổ nước dùng trong veo bốc khói ngào ngạt', en: 'A steaming bowl of traditional Hanoi beef pho with fresh scallions and herbs' },
        sourceUrl: 'https://unsplash.com/photos/29b7ad1cdc43',
        photographer: 'Markus Winkler',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1663123458923-8216ea050aa7?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Thưởng thức ly cà phê thơm nức trên căn gác nhỏ ngắm nhìn phố phường', en: 'Savoring Vietnamese coffee on a cozy historic attic balcony' },
        sourceUrl: 'https://unsplash.com/photos/8216ea050aa7',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],`
  },
  {
    slug: 'van-mieu-quoc-tu-giam',
    images: `    images: [
      {
        src: 'https://images.unsplash.com/photo-1787174818848-1ca0d33865d8?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Khuê Văn Các và giếng Thiên Quang thanh tịnh trong Văn Miếu', en: 'Khue Van Cac Pavilion and serene Thien Quang Well at Temple of Literature' },
        sourceUrl: 'https://unsplash.com/photos/1ca0d33865d8',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Mái ngói lưu ly cổ kính và không gian tôn nghiêm tại Văn Miếu', en: 'Historic terracotta rooflines and scholarly tranquility at Temple of Literature' },
        sourceUrl: 'https://unsplash.com/photos/f72dcac9c60e',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],`
  },
  {
    slug: 'hoang-thanh-thang-long',
    images: `    images: [
      {
        src: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Kiến trúc cung đình uy nghiêm ngàn năm tại Hoàng thành Thăng Long', en: 'Imperial architecture spanning a millennium at Thang Long Citadel' },
        sourceUrl: 'https://unsplash.com/photos/351597cf2477',
        photographer: 'Ammie Ngo',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Rồng đá và phù điêu thời Lê tại di tích Hoàng thành Thăng Long', en: 'Imperial stone dragon carvings and artifacts at the historic citadel' },
        sourceUrl: 'https://unsplash.com/photos/f72dcac9c60e',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],`
  },
  {
    slug: 'ho-tay-chua-tran-quoc',
    images: `    images: [
      {
        src: 'https://images.unsplash.com/photo-1689080541115-5acffbf0a083?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Cảnh sắc ven mặt nước Hồ Tây rợp bóng liễu xanh ngát', en: 'Lush green lakeside tree canopies lining the breezes of West Lake' },
        sourceUrl: 'https://unsplash.com/photos/5acffbf0a083',
        photographer: 'Thuy Nguyen',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1734220476344-c165ecc8b5c1?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Ánh đèn lung linh soi bóng mặt nước Hồ Tây khi chiều buông', en: 'Twinkling twilight city lights reflecting upon the waters of West Lake' },
        sourceUrl: 'https://unsplash.com/photos/c165ecc8b5c1',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],`
  },
  {
    slug: 'nha-tho-lon-ha-noi',
    images: `    images: [
      {
        src: 'https://images.unsplash.com/photo-1769133012767-73d2551624f2?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Nhà thờ Lớn Hà Nội với tháp chuông Gothic trầm mặc giữa lòng phố cổ', en: 'St. Joseph Cathedral Gothic twin towers in the heart of Hanoi' },
        sourceUrl: 'https://unsplash.com/photos/73d2551624f2',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1547024842-a0e3d2127406?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Quảng trường trước Nhà thờ Lớn và không gian trà chanh vỉa hè', en: 'St. Joseph Cathedral plaza and popular local gathering spots' },
        sourceUrl: 'https://unsplash.com/photos/a0e3d2127406',
        photographer: 'Ashim D’Silva',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],`
  },
  {
    slug: 'cau-long-bien',
    images: `    images: [
      {
        src: 'https://images.unsplash.com/photo-1707834539150-552a67f5b394?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Dòng người đi xe máy qua nhịp cầu thép Long Biên thế kỷ', en: 'Motorbikes traversing the century-old steel spans of Long Bien Bridge' },
        sourceUrl: 'https://unsplash.com/photos/552a67f5b394',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1592028219310-0cb15923525a?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Đoàn tàu hỏa rẽ sóng sông Hồng qua nhịp dầm thép cầu Long Biên', en: 'Historic train crossing the railway track of Long Bien Bridge' },
        sourceUrl: 'https://unsplash.com/photos/0cb15923525a',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],`
  },
  {
    slug: 'chua-mot-cot-lang-bac',
    images: `    images: [
      {
        src: 'https://images.unsplash.com/photo-1751542961443-603d0e4d3e74?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Chùa Một Cột tựa đóa sen vươn lên giữa hồ Linh Chiểu', en: 'One Pillar Pagoda shaped like a lotus blossom emerging from the pond' },
        sourceUrl: 'https://unsplash.com/photos/603d0e4d3e74',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],`
  },
  {
    slug: 'lang-co-duong-lam',
    images: `    images: [
      {
        src: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Mái ngói rêu phong và cổng làng cổ kính tại làng cổ Đường Lâm', en: 'Weathered mossy rooflines and stone pathways of ancient Duong Lam village' },
        sourceUrl: 'https://unsplash.com/photos/f72dcac9c60e',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],`
  },
  {
    slug: 'vuon-quoc-gia-ba-vi',
    images: `    images: [
      {
        src: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Rừng thông Ba Vì mờ ảo trong sương sớm bồng bềnh', en: 'Enchanting misty pine forests of Ba Vi National Park' },
        sourceUrl: 'https://unsplash.com/photos/4542c06a5843',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],`
  },
  {
    slug: 'lang-gom-bat-trang',
    images: `    images: [
      {
        src: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Nghệ nhân gốm Bát Tràng vuốt đất tạo hình trên bàn xoay truyền thống', en: 'Artisan handcrafting ceramic clay pottery on rotating wheel at Bat Trang' },
        sourceUrl: 'https://unsplash.com/photos/bc2c40e68b61',
        photographer: 'Earl Wilcox',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Những sản phẩm gốm sứ men rạn tinh xảo tại làng nghề Bát Tràng', en: 'Exquisite crackle-glaze ceramic pottery at Bat Trang craft workshops' },
        sourceUrl: 'https://unsplash.com/photos/7a0ee3dbe261',
        photographer: 'Roman Kraft',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],`
  }
];

for (const dest of hanoiDestinations) {
  const reg = new RegExp(`(slug:\\s*'${dest.slug}',[\\s\\S]*?)(images:\\s*\\[[\\s\\S]*?\\],)`, 'm');
  if (content.match(reg)) {
    content = content.replace(reg, `$1${dest.images}`);
    console.log(`[OK] Updated images for ${dest.slug}`);
  } else {
    console.log(`[WARN] Not found for ${dest.slug}`);
  }
}

fs.writeFileSync('src/data/destinations.ts', content, 'utf8');
console.log('Saved destinations.ts');
