async function checkPhoto(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const html = await res.text();
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const ogMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
    console.log('URL:', url);
    console.log('Title:', titleMatch ? titleMatch[1] : 'none');
    console.log('OG Image:', ogMatch ? ogMatch[1] : 'none');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

checkPhoto('https://unsplash.com/photos/huc-bridge-over-hoan-kiem-lake-k1FyNHuCbKw');
