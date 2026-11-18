const queries = [
  { dest: 'Hồ Hoàn Kiếm / Tháp Rùa', q: 'Turtle Tower Hanoi' },
  { dest: 'Cầu Thê Húc', q: 'The Huc Bridge' },
  { dest: 'Phố cổ Hà Nội', q: 'Hanoi Old Quarter street' },
  { dest: 'Văn Miếu Quốc Tử Giám', q: 'Temple of Literature Hanoi Khue Van Cac' },
  { dest: 'Bia Tiến Sĩ Văn Miếu', q: 'Doctor stelae Temple of Literature Hanoi' },
  { dest: 'Hoàng thành Thăng Long', q: 'Imperial Citadel of Thang Long Doan Mon' },
  { dest: 'Cột cờ Hà Nội', q: 'Hanoi Flag Tower' },
  { dest: 'Chùa Trấn Quốc', q: 'Tran Quoc Pagoda' },
  { dest: 'Hồ Tây', q: 'West Lake Hanoi' },
  { dest: 'Nhà thờ Lớn Hà Nội', q: 'Saint Joseph Cathedral Hanoi' },
  { dest: 'Cầu Long Biên', q: 'Long Bien Bridge Hanoi' },
  { dest: 'Chùa Một Cột', q: 'One Pillar Pagoda Hanoi' },
  { dest: 'Lăng Bác Ba Đình', q: 'Ho Chi Minh Mausoleum' },
  { dest: 'Làng cổ Đường Lâm', q: 'Duong Lam ancient village Mong Phu' },
  { dest: 'Vườn quốc gia Ba Vì', q: 'Ba Vi National Park church' },
  { dest: 'Bảo tàng Gốm Bát Tràng', q: 'Bat Trang ceramic museum' }
];

async function searchCommons(q) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(q)}&gsrlimit=3&prop=imageinfo&iiprop=url|extmetadata&format=json`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'VietExplore/1.0 (travel@vietexplore.vn)' } });
    const data = await res.json();
    if (!data.query || !data.query.pages) return [];
    return Object.values(data.query.pages).map(p => {
      const info = p.imageinfo ? p.imageinfo[0] : {};
      const meta = info.extmetadata || {};
      return {
        title: p.title,
        url: info.url,
        artist: (meta.Artist?.value || 'Wikimedia Commons Contributor').replace(/<[^>]+>/g, '').trim(),
        license: meta.LicenseShortName?.value || 'CC BY-SA 4.0',
        licenseUrl: meta.LicenseUrl?.value || 'https://creativecommons.org/licenses/by-sa/4.0/'
      };
    });
  } catch (err) {
    console.error('Error searching:', q, err.message);
    return [];
  }
}

async function run() {
  for (const item of queries) {
    console.log(`\n=== ${item.dest} (${item.q}) ===`);
    const results = await searchCommons(item.q);
    results.forEach((r, idx) => {
      console.log(`  [${idx + 1}] ${r.title}`);
      console.log(`      URL: ${r.url}`);
      console.log(`      Artist: ${r.artist} | License: ${r.license}`);
    });
  }
}

run();
