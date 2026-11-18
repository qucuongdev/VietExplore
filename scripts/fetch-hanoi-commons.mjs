const queries = [
  { key: 'ho_guom_turtle_tower', q: 'Turtle Tower Hanoi', label: 'Tháp Rùa Hồ Gươm' },
  { key: 'ho_guom_the_huc', q: 'The Huc Bridge Hanoi', label: 'Cầu Thê Húc' },
  { key: 'hanoi_old_quarter', q: 'Hanoi Old Quarter street', label: 'Phố Cổ Hà Nội' },
  { key: 'hanoi_egg_coffee', q: 'Vietnamese egg coffee', label: 'Cà phê trứng Hà Nội' },
  { key: 'hanoi_pho_bo', q: 'Vietnamese beef pho', label: 'Phở bò Hà Nội' },
  { key: 'van_mieu_khue_van_cac', q: 'Khue Van Cac', label: 'Khuê Văn Các Văn Miếu' },
  { key: 'van_mieu_doctor_stelae', q: 'Stelae of Doctors Temple of Literature Hanoi', label: 'Bia Tiến Sĩ Văn Miếu' },
  { key: 'van_mieu_gate', q: 'Temple of Literature Hanoi gate', label: 'Cổng Đại Trung Môn Văn Miếu' },
  { key: 'hoang_thanh_doan_mon', q: 'Doan Mon Imperial Citadel of Thang Long', label: 'Cổng Đoan Môn Hoàng Thành' },
  { key: 'hoang_thanh_flag_tower', q: 'Hanoi Flag Tower', label: 'Cột Cờ Hà Nội' },
  { key: 'hoang_thanh_kinh_thien', q: 'Kinh Thien Imperial Citadel', label: 'Điện Kính Thiên Hoàng Thành' },
  { key: 'tran_quoc_pagoda', q: 'Tran Quoc Pagoda Hanoi', label: 'Chùa Trấn Quốc' },
  { key: 'west_lake_hanoi', q: 'West Lake Hanoi sunset', label: 'Hoàng hôn Hồ Tây' },
  { key: 'st_joseph_cathedral', q: 'Saint Joseph Cathedral Hanoi', label: 'Nhà Thờ Lớn Hà Nội' },
  { key: 'long_bien_bridge', q: 'Long Bien Bridge Hanoi', label: 'Cầu Long Biên' },
  { key: 'one_pillar_pagoda', q: 'One Pillar Pagoda Hanoi', label: 'Chùa Một Cột' },
  { key: 'ho_chi_minh_mausoleum', q: 'Mausoleum of Ho Chi Minh', label: 'Lăng Chủ tịch Hồ Chí Minh' },
  { key: 'duong_lam_village', q: 'Duong Lam ancient village', label: 'Làng Cổ Đường Lâm' },
  { key: 'ba_vi_national_park', q: 'Ba Vi National Park', label: 'Vườn Quốc Gia Ba Vì' },
  { key: 'bat_trang_pottery', q: 'Bat Trang ceramic', label: 'Gốm Bát Tràng' }
];

async function searchCommons(q) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(q)}&gsrlimit=10&prop=imageinfo&iiprop=url|extmetadata&format=json`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'VietExplore/1.0 (https://vietexplore.vn; contact@vietexplore.vn)' } });
    const data = await res.json();
    if (!data.query || !data.query.pages) return [];
    return Object.values(data.query.pages)
      .filter(p => {
        const rawUrl = p.imageinfo?.[0]?.url || '';
        const cleanUrl = rawUrl.split('?')[0];
        const lower = cleanUrl.toLowerCase();
        return lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png');
      })
      .map(p => {
        const info = p.imageinfo[0];
        const meta = info.extmetadata || {};
        return {
          title: p.title.replace('File:', ''),
          url: info.url.split('?')[0],
          artist: (meta.Artist?.value || 'Wikimedia Commons Contributor').replace(/<[^>]+>/g, '').trim(),
          license: meta.LicenseShortName?.value || 'CC BY-SA 4.0',
          licenseUrl: meta.LicenseUrl?.value || 'https://creativecommons.org/licenses/by-sa/4.0/'
        };
      });
  } catch (err) {
    return [];
  }
}

async function run() {
  const results = {};
  for (const q of queries) {
    const list = await searchCommons(q.q);
    results[q.key] = {
      label: q.label,
      images: list.slice(0, 4)
    };
    console.log(`[FOUND] ${q.key}: ${list.length} images`);
    if (list[0]) {
      console.log(`        1st: ${list[0].title}`);
      console.log(`        URL: ${list[0].url}`);
    }
  }

  const fs = await import('fs');
  fs.writeFileSync('scripts/hanoi-commons-images.json', JSON.stringify(results, null, 2));
  console.log('Saved to scripts/hanoi-commons-images.json');
}

run();
