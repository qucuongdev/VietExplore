import fs from 'fs';
import path from 'path';

const hanoiAssets = [
  // hoang-thanh
  { folder: 'hoang-thanh', file: 'doan-mon.jpg', wikiName: 'Doan_Mon_Gate_2.jpg' },
  { folder: 'hoang-thanh', file: 'flag-tower.jpg', wikiName: 'Flag_tower,_Hanoi.jpg' },
  { folder: 'hoang-thanh', file: 'doan-mon-plaza.jpg', wikiName: 'Doan_Mon_Gate_3.jpg' },

  // ho-tay
  { folder: 'ho-tay', file: 'tran-quoc-stupa.jpg', wikiName: 'Tran_Quoc_Pagoda,_Hanoi,_Vietnam,_20240123_1212_3310.jpg' },
  { folder: 'ho-tay', file: 'west-lake-sunset.jpg', wikiName: 'West_lake_11-12-2016.jpg' },
  { folder: 'ho-tay', file: 'tran-quoc-gate.jpg', wikiName: 'Tran_Quoc_Pagoda,_Hanoi,_Vietnam,_20240123_1212_3307.jpg' },

  // nha-tho-lon
  { folder: 'nha-tho-lon', file: 'st-joseph-front.jpg', wikiName: 'St_Joseph_Cathedral_Hanoi_0376.JPG' },
  { folder: 'nha-tho-lon', file: 'st-joseph-side.jpg', wikiName: 'St_Joseph_Cathedral_Hanoi_0383.JPG' },
  { folder: 'nha-tho-lon', file: 'st-joseph-towers.jpg', wikiName: 'St_Joseph_Cathedral_Hanoi_0377.JPG' },

  // cau-long-bien
  { folder: 'cau-long-bien', file: 'long-bien-bridge.jpg', wikiName: 'LONG_BIEN_BRIDGE_HANOI_VIETNAM_FEB_2012.jpg' },
  { folder: 'cau-long-bien', file: 'long-bien-train.jpg', wikiName: 'LONG_BIEN_BRIDGE_HANOI_VIETNAM_FEB_2012_(7011987601).jpg' },
  { folder: 'cau-long-bien', file: 'long-bien-trusses.jpg', wikiName: 'LONG_BIEN_BRIDGE_HANOI_VIETNAM_FEB_2012_(6865894882).jpg' },

  // chua-mot-cot
  { folder: 'chua-mot-cot', file: 'one-pillar-pagoda.jpg', wikiName: 'One_Pillar_Pagoda_Hanoi_Vietnam.jpg' },
  { folder: 'chua-mot-cot', file: 'ho-chi-minh-mausoleum.jpg', wikiName: 'Hanoi_Vietnam_Mausoleum-of-Ho-Chi-Minh-01.jpg' },
  { folder: 'chua-mot-cot', file: 'one-pillar-close.jpg', wikiName: 'One_Pillar_Pagoda_-_Hanoi,_Vietnam_-_DSC03500.JPG' },

  // duong-lam
  { folder: 'duong-lam', file: 'duong-lam-village.jpg', wikiName: 'The-ancient-village-3358830.jpg' },

  // ba-vi
  { folder: 'ba-vi', file: 'french-church-ruins.jpg', wikiName: 'Nha_co_Ba_Vi.JPG' },
  { folder: 'ba-vi', file: 'mountain-road.jpg', wikiName: 'Ba_Vì_National_Park,_foggy_road.jpg' },

  // bat-trang
  { folder: 'bat-trang', file: 'pottery-artisan.jpg', wikiName: 'Bat-Trang-Ceramic-Village8.jpg' },
  { folder: 'bat-trang', file: 'crackle-glaze.jpg', wikiName: 'Bat-Trang-Ceramic-Village7.jpg' }
];

async function downloadRemaining() {
  const baseDir = path.join('public', 'images', 'destinations', 'hanoi');
  for (let i = 0; i < hanoiAssets.length; i++) {
    const item = hanoiAssets[i];
    const itemDir = path.join(baseDir, item.folder);
    fs.mkdirSync(itemDir, { recursive: true });
    const targetFile = path.join(itemDir, item.file);

    if (fs.existsSync(targetFile) && fs.statSync(targetFile).size > 1000) {
      console.log(`[EXISTS] ${item.folder}/${item.file}`);
      continue;
    }

    const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(item.wikiName)}?width=1600`;
    console.log(`[DOWNLOADING ${i + 1}/${hanoiAssets.length}] ${item.folder}/${item.file}...`);
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'VietExplore/1.0 (contact@vietexplore.vn)' }
      });
      if (res.status === 200) {
        const buf = await res.arrayBuffer();
        fs.writeFileSync(targetFile, Buffer.from(buf));
        console.log(`  -> OK (${(buf.byteLength / 1024).toFixed(1)} KB)`);
      } else {
        console.log(`  -> FAILED HTTP ${res.status}`);
      }
    } catch (err) {
      console.log(`  -> ERROR ${err.message}`);
    }

    await new Promise(r => setTimeout(r, 400));
  }
  console.log('\nAll downloads complete!');
}

downloadRemaining();
