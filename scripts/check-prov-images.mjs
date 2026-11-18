const list = [
  'Lan Ha Bay',
  'Chua Chuong Hung Yen',
  'Tra Su Cajuput Forest',
  'Mui Ca Mau',
  'Nui Ba Den'
];

async function check() {
  for (const q of list) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(q)}&gsrlimit=3&prop=imageinfo&iiprop=url|extmetadata&format=json`;
    const r = await fetch(url, { headers: { 'User-Agent': 'VietExplore/1.0 (travel@vietexplore.vn)' } });
    const d = await r.json();
    console.log(`\n=== ${q} ===`);
    if (d.query?.pages) {
      Object.values(d.query.pages).forEach(p => {
        const u = p.imageinfo?.[0]?.url || '';
        if (u.match(/\.(jpg|jpeg|png)/i)) {
          console.log(p.title + ' -> ' + u.split('?')[0]);
        }
      });
    }
  }
}

check();
