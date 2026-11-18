import { Destination } from '@/types/content';

export const destinations: Destination[] = [
  // 1. Quảng Ninh
  {
    id: 'dest-vinh-ha-long',
    slug: 'vinh-ha-long',
    provinceId: 'p-quang-ninh',
    featured: true,
    name: {
      vi: 'Vịnh Hạ Long',
      en: 'Ha Long Bay',
    },
    summary: {
      vi: 'Di sản Thiên nhiên Thế giới UNESCO với hàng nghìn hòn đảo đá vôi kỳ vĩ nhô lên giữa làn nước ngọc bích.',
      en: 'UNESCO World Natural Heritage site renowned for thousands of limestone karsts rising from emerald waters.',
    },
    description: {
      vi: 'Vịnh Hạ Long là một trong những kỳ quan thiên nhiên biểu tượng nhất của Việt Nam. Được tạo tác qua hàng triệu năm kiến tạo địa chất, vịnh sở hữu gần 2.000 hòn đảo lớn nhỏ cùng hệ thống hang động thạch nhũ tráng lệ như hang Sửng Sốt, động Thiên Cung và đảo Ti Tốp.',
      en: 'Ha Long Bay is one of Vietnam’s most iconic natural wonders. Formed over millions of years of geological evolution, the bay encompasses nearly 2,000 limestone islands and magnificent stalactite caves such as Sung Sot Cave, Thien Cung Grotto, and Ti Top Island.',
    },
    categoryIds: ['beaches', 'nature'],
    coordinates: { latitude: 20.9101, longitude: 107.1839 },
    highlights: [
      { vi: 'Du thuyền thưởng ngoạn hàng nghìn đảo đá vôi', en: 'Cruising through thousands of majestic limestone karsts' },
      { vi: 'Khám phá hang Sửng Sốt kỳ vĩ', en: 'Exploring the magnificent Sung Sot (Surprise) Cave' },
      { vi: 'Chèo thuyền kayak ngắm làn nước ngọc bích', en: 'Kayaking in serene emerald lagoons' },
    ],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Toàn cảnh Vịnh Hạ Long nhìn từ trên cao', en: 'Panoramic aerial view of Ha Long Bay' },
        sourceUrl: 'https://unsplash.com/photos/539801943592',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 2. Lào Cai
  {
    id: 'dest-sapa-fansipan',
    slug: 'sapa-fansipan',
    provinceId: 'p-lao-cai',
    featured: true,
    name: {
      vi: 'Thị xã Sa Pa & Đỉnh Fansipan',
      en: 'Sa Pa Town & Mount Fansipan',
    },
    summary: {
      vi: 'Thị xã sương mờ trên dãy Hoàng Liên Sơn hùng vĩ cùng đỉnh Fansipan 3.143m — Nóc nhà Đông Dương.',
      en: 'Misty highland town nestled in Hoang Lien Son range alongside Mount Fansipan (3,143m), the Roof of Indochina.',
    },
    categoryIds: ['mountains', 'nature'],
    coordinates: { latitude: 22.3033, longitude: 103.7753 },
    highlights: [
      { vi: 'Chinh phục cột mốc 3.143m đỉnh Fansipan', en: 'Standing on the 3,143m summit of Mount Fansipan' },
      { vi: 'Chiêm ngưỡng ruộng bậc thang thung lũng Mường Hoa', en: 'Admiring cascading rice terraces in Muong Hoa Valley' },
    ],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Thung lũng Mường Hoa Sa Pa', en: 'Muong Hoa Valley in Sa Pa' },
        sourceUrl: 'https://unsplash.com/photos/46273834b3fb',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 3. Ninh Bình
  {
    id: 'dest-trang-an',
    slug: 'trang-an',
    provinceId: 'p-ninh-binh',
    featured: true,
    name: {
      vi: 'Quần thể Danh thắng Tràng An',
      en: 'Trang An Landscape Complex',
    },
    summary: {
      vi: 'Di sản Văn hóa và Thiên nhiên Thế giới kép duy nhất tại Đông Nam Á với cảnh sắc sơn thủy hữu tình.',
      en: 'Southeast Asia’s only UNESCO Mixed Cultural and Natural World Heritage site with poetic karst landscapes.',
    },
    categoryIds: ['heritage', 'nature'],
    coordinates: { latitude: 20.2506, longitude: 105.9084 },
    highlights: [
      { vi: 'Đi thuyền nan qua các hang động xuyên thủy', en: 'Rowing boat journeys through water caves' },
      { vi: 'Thăm di tích Cố đô Hoa Lư ngàn năm', en: 'Visiting the ancient capital Hoa Lu' },
    ],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Thuyền nan đưa khách trên dòng Tràng An', en: 'Traditional sampans along the waterways of Trang An' },
        sourceUrl: 'https://unsplash.com/photos/1484b3fdfc62',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 4. Hà Nội — 10 Iconic Curated Landmarks (Vlog-Style Narrative & Rich Multi-Photo Collections)
  {
    id: 'dest-ho-guom-pho-co',
    slug: 'ho-guom-pho-co',
    provinceId: 'p-ha-noi',
    featured: true,
    name: {
      vi: 'Hồ Hoàn Kiếm & 36 Phố Phường',
      en: 'Hoan Kiem Lake & The 36 Old Streets',
    },
    summary: {
      vi: 'Trái tim ngàn năm lịch sử của Hà Nội nơi nhịp sống hiện đại giao thoa cùng tiếng chuông leng keng xe điện và mùi phở bò ngào ngạt sớm mai.',
      en: 'The millennium-old heartbeat of Hanoi where modern city rhythms intertwine with vintage tram bells and the intoxicating morning aroma of simmering pho broth.',
    },
    description: {
      vi: `Nếu bạn hỏi điều gì khiến bất cứ ai đến Hà Nội cũng phải rung động ngay từ khoảnh khắc đầu tiên, câu trả lời chắc chắn nằm ở một buổi sớm mai quanh bờ Hồ Hoàn Kiếm. Khi sương sớm còn la đà trên mặt nước phẳng như gương, cụ rùa chỉ còn trong truyền thuyết nhưng hồn cốt Thăng Long thì hiện hữu rõ nét qua từng gốc liễu rủ, từng nhịp cầu Thê Húc cong cong son đỏ dẫn lối vào đền Ngọc Sơn.

Bước chân khỏi bờ hồ, bạn sẽ lạc ngay vào mê cung 36 phố phường — nơi mỗi con phố từng đóng đinh tên mình bằng một nghề thủ công truyền thống: Hàng Bạc lấp lánh ánh kim hoàn, Hàng Gai ngập tràn lụa là, Hàng Mã rực rỡ sắc màu giấy ngũ sắc. Đừng ngần ngại rẽ vào những ngõ nhỏ sâu hun hút chỉ vừa một người lách, bởi chính ở cuối hành lang tối mờ ấy lại là một khoảng sân giếng trời ngập nắng, một quán cà phê trứng thơm nức mùi kem béo ngậy được đánh bông xốp trên nền cà phê vối đắng đậm. Hà Nội phố cổ không dành cho những ai vội vã; hãy chậm lại một nhịp thở để lắng nghe tiếng leng keng của phố xưa, mùi hoa sữa thoang thoảng mùa thu và nụ cười đôn hậu của các bà, các mẹ gánh hàng rong qua ngõ.`,
      en: `If you ask what makes every traveler fall irrevocably in love with Hanoi from the very first hour, the secret lies in an early morning stroll around Hoan Kiem Lake. As morning mist gently floats over mirror-like waters, the legendary Golden Turtle lives on in the soul of Thang Long, framed by weeping willows and the vermilion arches of The Huc Bridge leading into sacred Ngoc Son Temple.

Stepping away from the shoreline, you instantly step into the maze of the 36 Guild Streets — where alleys are named after historical artisans: Hang Bac (Silverware), Hang Gai (Silk), Hang Ma (Festive Paper Crafts). Never hesitate to venture down narrow "tube house" corridors; hidden at the end is often an airy courtyard bathed in sunlight and the heavenly fragrance of whipped egg coffee floating over bold Robusta. The Old Quarter is not meant to be rushed; sync your heartbeat to the vintage rhythm of Hanoi, inhale the sweet fragrance of milk flowers in autumn, and embrace the warm smiles of vendors balancing bamboo shoulder poles.`,
    },
    categoryIds: ['heritage', 'urban'],
    coordinates: { latitude: 21.0285, longitude: 105.8542 },
    highlights: [
      { vi: 'Đón bình minh 05:30 sáng ngắm Tháp Rùa và hòa cùng cụ già tập dưỡng sinh', en: 'Catching 05:30 sunrise by Turtle Tower amidst morning tai-chi practitioners' },
      { vi: 'Nhâm nhi cà phê trứng Đinh hoặc Giảng trên ban công ngắm nhìn dòng xe', en: 'Sipping rich artisanal egg coffee from a historic wooden balcony' },
      { vi: 'Khám phá kiến trúc nhà ống cổ truyền tại 87 Mã Mây', en: 'Exploring authentic tube house architecture at 87 Ma May Heritage House' },
      { vi: 'Thưởng thức ẩm thực đêm phố cổ: bún chả, chả cá Lã Vọng và kem Tràng Tiền', en: 'Tasting legendary street food: bun cha, La Vong grilled fish, and Trang Tien ice cream' },
    ],
    travelogue: [
      {
        time: '05:30 Sáng',
        title: { vi: 'Hít hà sương sớm và ngắm mặt trời mọc sau Tháp Rùa', en: 'Inhaling morning mist as dawn breaks behind Turtle Tower' },
        narrative: {
          vi: 'Hà Nội thức dậy sớm hơn bạn tưởng. 05:30 sáng, vòng quanh hồ Gươm đã rộn ràng tiếng nhạc thể dục, tiếng đập bóng bàn và những bước chạy thong thả. Mặt trời từ từ nhô lên từ phía Đinh Tiên Hoàng, rọi từng vạt nắng cam óng qua kẽ lá liễu xuống Tháp Rùa giữa làn sương lam.',
          en: 'Hanoi wakes earlier than you think. By 05:30, the lakeshore is alive with rhythmic fan dances, badminton shuttlecocks, and easy joggers. The sun ascends from Dinh Tiên Hoàng Street, casting golden beams through willow branches onto Turtle Tower surrounded by soft morning haze.',
        },
        tip: { vi: 'Góc chụp Tháp Rùa đẹp nhất là đoạn vỉa hè đối diện ngã ba Hàng Khay - Lê Thái Tổ.', en: 'Best Turtle Tower photo spot: the pavement angle across the Hang Khay - Le Thai To junction.' },
      },
      {
        time: '08:00 Sáng',
        title: { vi: 'Tô phở bò phố cổ bốc khói và ly cà phê trứng căn gác nhỏ', en: 'Steaming bowl of street pho & rich whipped egg coffee in an attic alcove' },
        narrative: {
          vi: 'Ghé vào một hàng phở gia truyền trên phố Bát Đàn hoặc Hàng Đồng, gọi bát tái lăn nhiều hành hoa, húp thìa nước dùng ninh xương ngọt thanh tủy bò. Sau đó rảo bước sang phố Đinh Tiên Hoàng, leo lên căn gác nhỏ của Cà phê Đinh, gọi một cốc cà phê trứng nóng hổi vẽ hình hoa sen tinh tế.',
          en: 'Slide onto a low plastic stool at Bat Dan or Hang Dong for a sizzling bowl of stir-fried rare beef pho with heaps of scallions. Next, walk to Dinh Cafe on Dinh Tien Hoang, climb the hidden creaky wooden stairs to the second-floor balcony, and order a hot egg coffee with delicate latte art.',
        },
        tip: { vi: 'Uống cà phê trứng nên dùng thìa múc lớp kem trứng trước, sau đó khuấy nhẹ uống cùng lớp cà phê đắng bên dưới.', en: 'Spoon up the warm custard layer first before gently stirring it into the bitter coffee base.' },
      },
      {
        time: '15:00 Chiều',
        title: { vi: 'Lạc lối trong 36 phố nghề và tìm về ký ức nhà cổ Mã Mây', en: 'Getting lost in the artisan guilds & stepping into Ma May Heritage House' },
        narrative: {
          vi: 'Chiều buông là lúc những con ngõ phố cổ hiện lên sống động nhất. Hãy ghé 87 Mã Mây để chiêm ngưỡng kiến trúc nhà ống trăm tuổi bằng gỗ lim, cảm nhận sự thông minh trong việc bố trí giếng trời hứng gió và ánh sáng tự nhiên của người Tràng An xưa.',
          en: 'Late afternoon brings out the true vintage charm of the alleyways. Stop at 87 Ma May to admire a century-old ironwood tube house, discovering how ancient Hanoians masterfully captured sunlight and cross-breezes via central open courtyards.',
        },
        tip: { vi: 'Vé vào cửa nhà cổ Mã Mây chỉ 10.000đ, không gian rất yên tĩnh để chụp ảnh áo dài.', en: 'Entry ticket is only 10,000 VND; wonderful ambient light for traditional Ao Dai portraits.' },
      },
      {
        time: '20:30 Tối',
        title: { vi: 'Phố đi bộ lên đèn, nhịp sống sôi động và que kem Tràng Tiền', en: 'Pedestrian lights ignite, lively weekend buzz, and iconic Trang Tien ice cream' },
        narrative: {
          vi: 'Khi màn đêm buông xuống, khu vực quanh hồ biến thành không gian đi bộ tràn ngập tiếng đàn violin, nhảy hiện đại và các trò chơi dân gian như ô ăn quan, nhảy dây. Kết thúc ngày dài bằng một que kem ốc quế cốm Tràng Tiền thơm mát dịu ngọt.',
          en: 'At nightfall on weekends, the entire lake perimeter transforms into a car-free festival with live buskers, street violinists, and traditional games like tug-of-war. Crown your night with a cool, subtly fragrant Young Green Rice (Com) ice cream cone on Trang Tien Street.',
        },
      },
    ],
    insiderTips: [
      { vi: 'Cuối tuần (tối thứ 6 đến hết Chủ nhật), toàn bộ khu vực quanh hồ Gươm cấm xe cơ giới, là thời điểm lý tưởng nhất để tản bộ thảnh thơi.', en: 'Weekend pedestrian hours (Fri evening to Sunday midnight) close the lake to motor traffic—ideal for carefree strolling.' },
      { vi: 'Muốn mua đồ lưu niệm hoặc quà đặc sản (ô mai, chè sen), hãy ghé Hàng Đường và Hàng Da thay vì các quầy hàng rong tự phát.', en: 'For genuine souvenir treats like salted dried apricots (o mai) or lotus tea, head to reputable stores on Hang Duong Street.' },
      { vi: 'Giữ điện thoại và tư trang cẩn thận khi chen chúc tại chợ đêm Hàng Đào vào tối cuối tuần.', en: 'Keep your phone and valuables secure when navigating dense weekend crowds at Hang Dao Night Market.' },
    ],
            images: [
      {
        src: '/images/destinations/hanoi/ho-guom/the-huc-bridge.jpg',
        alt: { vi: 'Cầu Thê Húc son đỏ dẫn lối vào Đền Ngọc Sơn sáng sớm', en: 'Vermilion The Huc Bridge leading into Ngoc Son Temple at dawn' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:The_Huc_Bridge_-_panoramio.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 3.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        verifiedLocation: true,
      },
      {
        src: '/images/destinations/hanoi/ho-guom/turtle-tower.jpg',
        alt: { vi: 'Tháp Rùa rêu phong cổ kính giữa làn nước biếc Hồ Gươm', en: 'Historic Turtle Tower resting peacefully on emerald Hoan Kiem Lake' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Th%C3%A1p_R%C3%B9a_H%E1%BB%93_G%C6%B0%C6%A1m_H%C3%A0_N%E1%BB%99i.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
      {
        src: '/images/destinations/hanoi/ho-guom/old-quarter-street.jpg',
        alt: { vi: 'Gánh hàng rong mộc mạc bên góc phố cổ Hà Nội', en: 'Rustic street vendor balancing crafts along Hanoi Old Quarter' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:G%C3%A1nh_h%C3%A0ng_rong_H%C3%A0_N%E1%BB%99i.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
      {
        src: '/images/destinations/hanoi/ho-guom/egg-coffee.jpg',
        alt: { vi: 'Ly cà phê trứng thơm béo ngậy mang hương vị truyền thống Hà Nội', en: 'Traditional hot egg coffee with rich custard foam in Hanoi' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:C%C3%A0_ph%C3%AA_tr%E1%BB%A9ng_H%C3%A0_N%E1%BB%99i.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
    ],
  },
  {
    id: 'dest-van-mieu-quoc-tu-giam',
    slug: 'van-mieu-quoc-tu-giam',
    provinceId: 'p-ha-noi',
    featured: true,
    name: {
      vi: 'Văn Miếu – Quốc Tử Giám',
      en: 'The Temple of Literature',
    },
    summary: {
      vi: 'Trường đại học đầu tiên của Việt Nam, chốn thanh tịnh mang tinh hoa Nho học Thăng Long với Khuê Văn Các và 82 bia Tiến sĩ rùa đá.',
      en: 'Vietnam’s first imperial university, an oasis of serene scholarship celebrating Confucian wisdom, Khue Van Cac Pavilion, and 82 turtle-borne Doctorate Stelae.',
    },
    description: {
      vi: `Tách biệt hoàn toàn khỏi nhịp xe cộ ồn ã trên phố Tôn Đức Thắng và Quốc Tử Giám, bước qua cổng Đại Trung Môn là một thế giới hoàn toàn khác: tĩnh mịch, trầm lắng và phảng phất hương gỗ đàn hương. Khởi dựng từ năm 1070 dưới triều vua Lý Thánh Tông và mở rộng thành Quốc Tử Giám năm 1076, nơi đây đã tôi rèn hàng ngàn bậc hiền tài kinh bang tế thế cho đất nước.

Tâm điểm của di tích chính là Khuê Văn Các bằng gỗ mộc mạc soi bóng xuống giếng Thiên Quang hình vuông — tượng trưng cho đất tròn trời vuông trong triết lý phương Đông. Hai bên giếng là hai hàng nhà bia lưu giữ 82 tấm bia Tiến sĩ vinh danh những người đỗ đại khoa từ năm 1442 đến 1779. Từng nét chạm khắc rồng mây hoa lá trên đá xanh Thanh Hóa trải qua hơn 500 năm mưa nắng vẫn uy nghi, là bằng chứng sống động cho lời dạy bất hủ: "Hiền tài là nguyên khí của quốc gia".`,
      en: `Stepping beyond the monumental Dai Trung Gate, the furious roar of Hanoi’s traffic dissolves into serene silence perfumed with antique sandalwood. Founded in 1070 under Emperor Ly Thanh Tong and established as Vietnam’s first university in 1076, this sanctuary nurtured thousands of scholars who shaped the nation’s golden dynasties.

The architectural centerpiece is the poetic Khue Van Cac (Pavilion of the Constellation of Literature), mirrored in the emerald square waters of the Well of Heavenly Clarity — evoking traditional cosmological harmony. Flanking the well stand two open pavilions housing 82 stone stelae mounted atop sacred stone turtles, honoring doctorate laureates from 1442 to 1779. Each meticulously carved inscription on blue stone stands as enduring testament to the immortal creed: "Virtuous talents are the vital vitality of the nation."`,
    },
    categoryIds: ['heritage'],
    coordinates: { latitude: 21.0287, longitude: 105.8355 },
    highlights: [
      { vi: 'Khuê Văn Các uy nghiêm — Biểu tượng chính thức trên huy hiệu thủ đô', en: 'Khue Van Cac Pavilion — The official emblem of the capital Hanoi' },
      { vi: 'Vườn 82 bia Tiến sĩ trên lưng rùa đá — Di sản Tư liệu Thế giới UNESCO', en: 'Garden of 82 Doctorate Stelae on stone turtles (UNESCO Memory of the World)' },
      { vi: 'Giếng Thiên Quang phẳng lặng và Đại Thành Điện tôn nghiêm', en: 'Tranquil Well of Heavenly Clarity and majestic Dai Thanh Sanctuary' },
    ],
    travelogue: [
      {
        time: '08:00 Sáng',
        title: { vi: 'Hít thở không khí trang nghiêm khi cổng vừa mở', en: 'Inhaling crisp reverent air right at opening gates' },
        narrative: {
          vi: 'Hãy đến đúng 08:00 khi các đoàn tham quan lớn chưa kịp tới. Dạo bước dưới bóng mát của những cây cổ thụ trăm tuổi, lắng nghe tiếng chim chuyền cành bên hồ sen tĩnh lặng, bạn sẽ cảm nhận trọn vẹn nét tôn nghiêm của chốn học thuật kinh kỳ.',
          en: 'Arrive right at 08:00 before the large tour buses pull up. Walking beneath ancient ironwood and banyan trees with birdsong echoing over lotus pools offers a profound sense of peace and historical gravitas.',
        },
        tip: { vi: 'Trang phục vào di tích cần lịch sự (áo có tay, quần hoặc váy dài qua gối).', en: 'Modest dress code required: covered shoulders and skirts/pants below the knee.' },
      },
      {
        time: '09:30 Sáng',
        title: { vi: 'Chiêm bái 82 bia đá và giải mã hoa văn rồng thời Lê', en: 'Contemplating the 82 stelae and decoding Le Dynasty dragon motifs' },
        narrative: {
          vi: 'Dành thời gian quan sát các đầu rùa đá: mỗi con rùa đều có nét mặt và thần thái riêng biệt, mang ánh nhìn kiên định đỡ lấy tấm bia nặng hàng tấn. Hãy ngắm hoa văn mây lửa và hoa cúc cách điệu trên đỉnh bia — đỉnh cao nghệ thuật điêu khắc đá thời Hậu Lê.',
          en: 'Take time to inspect the stone turtle heads: each turtle possesses a distinct countenance, stoically bearing tons of carved slate. Admire the flame clouds and stylized chrysanthemums cresting each stele — peak stonework of the Later Le era.',
        },
        tip: { vi: 'Tuyệt đối không sờ đầu rùa đá để cùng gìn giữ di sản cho mai sau.', en: 'Strictly avoid touching the stone turtle heads to help preserve the fragile historic stone.' },
      },
      {
        time: '11:00 Trưa',
        title: { vi: 'Xin chữ thư pháp của các ông đồ và thưởng trà sen', en: 'Receiving calligraphy from traditional masters & tasting lotus tea' },
        narrative: {
          vi: 'Trước khi rời đi, hãy ghé qua khu Tiền Đường mua một bức thư pháp chữ Hán hoặc chữ Quốc ngữ như "Trí", "Đức", "An", "Phúc" do các nhà thư pháp viết tay bằng mực tàu trên giấy điệp đỏ thắm.',
          en: 'Before leaving, visit the rear pavilion to commission a custom calligraphy scroll in Han or modern script (words like Wisdom, Virtue, Peace, or Fortune) penned in deep black ink on vermilion paper.',
        },
      },
    ],
    insiderTips: [
      { vi: 'Nên mua vé tham quan trực tuyến hoặc chuẩn bị sẵn tiền mặt 70.000đ/người lớn (học sinh/sinh viên mang thẻ được giảm 50%).', en: 'Admission is 70,000 VND for adults (50% discount with valid student ID).' },
      { vi: 'Mùa thu (tháng 9 - 11) là thời điểm Văn Miếu đẹp nhất với nắng vàng ruộm qua tán cây cổ thụ.', en: 'Autumn (Sept - Nov) provides the crispest lighting and golden rays through the ancient canopy.' },
      { vi: 'Đối diện cổng Văn Miếu có phố ẩm thực Văn Miếu với món bún chả và trà đá vỉa hè chuẩn vị Bắc.', en: 'Across the entrance, Van Mieu street features delicious sidewalk bun cha stalls favored by locals.' },
    ],
            images: [
      {
        src: '/images/destinations/hanoi/van-mieu/khue-van-cac.jpg',
        alt: { vi: 'Khuê Văn Các cổ kính soi bóng giếng Thiên Quang thanh tịnh', en: 'Ancient Khue Van Cac Pavilion reflected on tranquil Thien Quang Well' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Khu%C3%AA_V%C4%83n_C%C3%A1c.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
      {
        src: '/images/destinations/hanoi/van-mieu/doctor-stelae.jpg',
        alt: { vi: 'Vườn 82 bia Tiến sĩ trên lưng rùa đá — Di sản Tư liệu Thế giới', en: 'Garden of 82 Doctorate Stelae on stone turtles — UNESCO Memory of the World' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bia_ti%E1%BA%BFn_s%C4%A9_V%C4%83n_Mi%E1%BA%BFu.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
      {
        src: '/images/destinations/hanoi/van-mieu/main-gate.jpg',
        alt: { vi: 'Cổng Đại Trung Môn rợp bóng cổ thụ tại Văn Miếu - Quốc Tử Giám', en: 'Dai Trung Mon Gate beneath ancient tree canopies at Temple of Literature' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:C%E1%BB%95ng_%C4%90%E1%BA%A1i_Trung_M%C3%B4n_V%C4%83n_Mi%E1%BA%BFu.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
    ],
  },
  {
    id: 'dest-hoang-thanh-thang-long',
    slug: 'hoang-thanh-thang-long',
    provinceId: 'p-ha-noi',
    featured: true,
    name: {
      vi: 'Hoàng thành Thăng Long',
      en: 'Imperial Citadel of Thang Long',
    },
    summary: {
      vi: 'Di sản Văn hóa Thế giới UNESCO minh chứng cho hơn 13 thế kỷ quyền lực chính trị và văn hóa liên tục của kinh đô Thăng Long - Hà Nội.',
      en: 'UNESCO World Heritage site testifying to over 1,300 continuous years of imperial authority and cultural evolution in Thang Long - Hanoi.',
    },
    description: {
      vi: `Nằm trải rộng trên trục đường Hoàng Diệu và Điện Biên Phủ rợp bóng xà cừ, Hoàng thành Thăng Long như một cuốn biên niên sử đồ sộ bằng đất đá. Dưới mỗi tấc đất nơi đây là những tầng văn hóa chồng xếp lên nhau: từ thời An Nam Đô hộ phủ thế kỷ VII, thời Đinh - Tiền Lê thế kỷ X, đến thời vàng son của Lý - Trần - Lê và thời kháng chiến hiện đại.

Đứng trước cửa Đoan Môn sừng sững xây bằng gạch vồ thời Lê, bạn có thể bước qua cổng vòm chính giữa — lối đi từng chỉ dành riêng cho Hoàng đế. Tiếp tục bước lên nền Điện Kính Thiên, hai đôi rồng đá chầu với thân uốn 7 khúc thế kỷ XV sẽ khiến bạn kinh ngạc bởi nghệ thuật điêu khắc tinh xảo tột bậc. Đặc biệt, khu khảo cổ 18 Hoàng Diệu phía đối diện vẫn đang hé lộ những giếng nước cổ, đồ gốm ngự dụng và gạch ngói hoa sen rồng phượng tinh tế chưa từng thấy.`,
      en: `Sprawling along the majestic mahogany-shaded avenues of Hoang Dieu and Dien Bien Phu, the Imperial Citadel is an archaeological marvel. Beneath its manicured turf lie stacked cultural strata: from 7th-century Annam protectorate fortresses through the Ly, Tran, and Le dynastic pinnacles down to modern wartime command bunkers.

Stand before the colossal five-arched Doan Mon Gate, whose central passage was historically reserved exclusively for the Emperor. Ascend to the terrace of Kinh Thien Palace, where 15th-century stone dragons with seven serpentine coils guard the royal threshold in breathtaking monumental power. Across the boulevard at the 18 Hoang Dieu excavation site, visitors can look directly into royal wells and observe imperial celadon ceramics that once graced imperial banquets.`,
    },
    categoryIds: ['heritage'],
    coordinates: { latitude: 21.0345, longitude: 105.8398 },
    highlights: [
      { vi: 'Cột cờ Hà Nội (Kỳ Đài) cao 33m xây dựng kiên cố từ năm 1812', en: '33m Hanoi Flag Tower standing steadfast since 1812' },
      { vi: 'Thềm rồng đá Điện Kính Thiên kiệt tác nghệ thuật thời Lê sơ', en: 'Kinh Thien Palace stone dragon steps, monumental early Le masterpiece' },
      { vi: 'Khu khảo cổ 18 Hoàng Diệu với hàng triệu hiện vật cung đình vô giá', en: '18 Hoang Dieu archaeological pits with millions of royal relics' },
      { vi: 'Hầm Chỉ huy Tác chiến T1 gắn liền với những thời khắc lịch sử 1972', en: 'T1 Military Command Bunker preserving strategic wartime communications' },
    ],
    travelogue: [
      {
        time: '09:00 Sáng',
        title: { vi: 'Check-in dưới chân Cột cờ Hà Nội và bước qua Đoan Môn', en: 'Posing beneath Hanoi Flag Tower & stepping across Doan Mon Gate' },
        narrative: {
          vi: 'Bắt đầu hành trình từ đường Điện Biên Phủ, ngước nhìn lá cờ đỏ sao vàng tung bay trên đỉnh Kỳ Đài. Sau đó tiến vào Đoan Môn, trèo lên tầng lầu vọng cảnh để phóng tầm mắt bao quát toàn bộ trục trung tâm của cung điện cổ kính.',
          en: 'Begin at Dien Bien Phu Street gazing up at the giant national flag fluttering atop the Flag Tower. Enter through the fortress walls of Doan Mon and climb to its observation terrace for a panoramic view of the ancient palace spine.',
        },
        tip: { vi: 'Tầng 2 của Đoan Môn là góc chụp ảnh áo dài cổ phục với background mái ngói cực kỳ ăn ảnh.', en: 'The second terrace of Doan Mon Gate is the top photo spot for traditional Vietnamese costumes.' },
      },
      {
        time: '11:00 Trưa',
        title: { vi: 'Chạm tay vào thềm rồng Điện Kính Thiên và thăm Hầm D67', en: 'Touching the Kinh Thien dragon balustrades and entering House D67' },
        narrative: {
          vi: 'Đứng trước thềm rồng đá Điện Kính Thiên, bạn sẽ cảm nhận được khí phách uy nghi của các bậc đế vương thời Lê. Ngay sau lưng là Nhà và Hầm D67 — cơ quan đầu não của Quân đội Nhân dân Việt Nam trong chiến dịch Điện Biên Phủ trên không 1972 với những bản đồ tác chiến và điện thoại bàn vẫn giữ nguyên trạng.',
          en: 'Stand before the fierce stone dragons of Kinh Thien Palace to feel the ancient imperial aura. Just behind lies House and Bunker D67 — the clandestine command bunker of General Vo Nguyen Giap during the 1972 air defense campaign, with battle maps and phones fully intact.',
        },
      },
      {
        time: '14:30 Chiều',
        title: { vi: 'Khám phá tầng đất ngàn năm tại khu khảo cổ 18 Hoàng Diệu', en: 'Unearthing 1,300 years of history at 18 Hoang Dieu archaeology site' },
        narrative: {
          vi: 'Băng qua đường Hoàng Diệu rợp bóng cây, bước vào nhà mái vòm bảo tồn hố khai quật. Nhìn tận mắt các trụ móng sỏi thời Lý, giếng nước gạch thời Trần và những mảnh gốm men ngọc tinh xảo được phục dựng tỉ mỉ.',
          en: 'Cross tree-lined Hoang Dieu Avenue into the sheltered archaeological hangar. Gaze directly down at Ly Dynasty gravel foundation footings, Tran Dynasty brick wells, and exquisite excavated phoenix roof ridge ornaments.',
        },
        tip: { vi: 'Nên thuê máy thuyết minh tự động (audio guide) đa ngôn ngữ ở quầy lễ tân để hiểu sâu hơn về từng niên đại.', en: 'Rent an audio guide at the visitor center for rich context on each archaeological layer.' },
      },
    ],
    insiderTips: [
      { vi: 'Thời gian tham quan trọn vẹn cần khoảng 2.5 - 3 tiếng do khuôn viên rất rộng.', en: 'Allocate 2.5 to 3 hours to comfortably explore both the main citadel and the 18 Hoang Dieu site.' },
      { vi: 'Tour đêm "Giải mã Hoàng thành Thăng Long" vào tối thứ 6 và thứ 7 mang lại trải nghiệm xem múa cổ, dâng hương và giải đố cổ vật cực kỳ ấn tượng.', en: 'The Friday/Saturday Night Tour with torchlight rituals and ancient court dances offers an unforgettable experience.' },
      { vi: 'Đường Hoàng Diệu bên ngoài Hoàng thành là một trong những con đường rợp bóng cây đẹp nhất Hà Nội, rất thích hợp chụp ảnh tản bộ mùa hoa ban.', en: 'Hoang Dieu Street outside is one of Hanoi’s most scenic boulevards, breathtaking during spring Bauhinia flower blooms.' },
    ],
            images: [
      {
        src: '/images/destinations/hanoi/hoang-thanh/doan-mon.jpg',
        alt: { vi: 'Cổng Đoan Môn uy nghiêm thời Lê tại Hoàng thành Thăng Long', en: 'Monumental Doan Mon Gate of the Imperial Citadel of Thang Long' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:C%E1%BB%95ng_%C4%90oan_M%C3%B4n_Ho%C3%A0ng_th%C3%A0nh_Th%C4%83ng_Long.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
      {
        src: '/images/destinations/hanoi/hoang-thanh/flag-tower.jpg',
        alt: { vi: 'Cột cờ Hà Nội (Kỳ Đài) sừng sững hơn 200 năm lịch sử', en: 'Hanoi Flag Tower standing steadfast for over two centuries' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:C%E1%BB%99t_c%E1%BB%9D_H%C3%A0_N%E1%BB%99i.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
      {
        src: '/images/destinations/hanoi/hoang-thanh/hoang-thanh-central-sector.jpg',
        alt: { vi: 'Toàn cảnh khu di tích trung tâm Hoàng thành Thăng Long - Hà Nội', en: 'Panoramic view of the Central Sector of the Imperial Citadel of Thang Long' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Central_Sector_of_the_Imperial_Citadel_of_Thang_Long_-_Hanoi.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
    ],
  },
  {
    id: 'dest-ho-tay-chua-tran-quoc',
    slug: 'ho-tay-chua-tran-quoc',
    provinceId: 'p-ha-noi',
    featured: true,
    name: {
      vi: 'Hồ Tây & Chùa Trấn Quốc',
      en: 'West Lake & Tran Quoc Pagoda',
    },
    summary: {
      vi: 'Khoảng không gian khoáng đạt rộng lớn nhất thủ đô hòa quyện cùng ngôi chùa cổ nhất Việt Nam hơn 1.500 năm tuổi và những buổi hoàng hôn rực rỡ.',
      en: 'Hanoi’s most expansive waterscape combined with Vietnam’s oldest Buddhist sanctuary dating back 1,500 years, celebrated for spectacular fiery sunsets.',
    },
    description: {
      vi: `Nếu Hồ Gươm là viên ngọc nép mình giữa phố thị tấp nập, thì Hồ Tây (Kim Ngưu, Dâm Đàm xưa) lại mang vẻ đẹp phóng khoáng, mênh mông với diện tích mặt nước hơn 500 héc-ta và chu vi gần 17 cây số. Nằm trên một hòn đảo nhỏ phía đông của hồ, nối với đất liền bằng con đường Thanh Niên rợp bóng phượng vĩ và liễu rủ, Chùa Trấn Quốc sừng sững như một đóa sen ngát hương giữa dòng nước biếc.

Được xây dựng từ thế kỷ VI thời vua Lý Nam Đế (nguyên tên Khai Quốc), Chùa Trấn Quốc là một trong những ngôi chùa cổ nhất châu Á. Điểm nhấn thị giác đắt giá nhất là Bảo tháp lục độ đài sen cao 15 tầng đỏ thắm soi bóng xuống làn nước lung linh. Khi chiều buông, ánh hoàng hôn cam rực dần chuyển sang tím biếc nhuộm trọn mặt hồ, tiếng chuông chùa ngân nga xua tan mọi mỏi mệt của nhịp sống hiện đại.`,
      en: `If Hoan Kiem Lake is an intimate jewel tucked in the city center, West Lake (Ho Tay) is a vast inland sea spanning over 500 hectares with a 17km scenic perimeter. Sitting gracefully on an eastern islet connected to the mainland via the tree-shaded Thanh Nien causeway, Tran Quoc Pagoda emerges like a serene lotus flower floating on emerald waters.

Founded in the 6th century during the reign of Emperor Ly Nam De, Tran Quoc is one of Asia’s oldest Buddhist sites. Its crowning landmark is the 15-meter, 11-tiered hexagonal lotus stupa soaring toward the sky. When dusk descends, breathtaking orange-to-violet sunsets set the lake ablaze with light, while deep pagoda gong chimes dissolve the hurry of modern urban life.`,
    },
    categoryIds: ['nature', 'heritage'],
    coordinates: { latitude: 21.0478, longitude: 105.8368 },
    highlights: [
      { vi: 'Bảo tháp lục độ đài sen 11 tầng cao 15m uy nghi soi bóng nước', en: '15-meter 11-tiered lotus stupa reflected on calm lake waters' },
      { vi: 'Cây Bồ đề linh thiêng chiết từ cây Bồ đề nơi Đức Phật thành đạo tại Ấn Độ', en: 'Sacred Bodhi tree propagated from the original Enlightenment tree in Bodh Gaya' },
      { vi: 'Ngắm hoàng hôn lãng mạn từ bến thuyền đường Thanh Niên và quán cà phê ven hồ', en: 'Watching golden sunset vistas from Thanh Nien causeway & waterfront cafes' },
      { vi: 'Thưởng thức bánh tôm Hồ Tây giòn rụm và kem hồ Tây truyền thống', en: 'Crispy fried West Lake shrimp cakes and refreshing local ice creams' },
    ],
    travelogue: [
      {
        time: '06:00 Sáng',
        title: { vi: 'Đạp xe vòng quanh Hồ Tây đón gió mát lành', en: 'Cycling the 17km scenic loop in cool morning breeze' },
        narrative: {
          vi: 'Thuê một chiếc xe đạp thể thao tại phố Trích Sài hoặc Yên Phụ, bắt đầu vòng quay 17km ven hồ. Gió từ mặt nước phả vào mát rượi, qua những rặng sen thơm ngát vào mùa hè, qua phủ Tây Hồ tĩnh mịch và những biệt thự thơ mộng rợp hoa giấy.',
          en: 'Rent a touring bicycle along Trich Sai or Yen Phu to conquer the 17km lakeside circuit. Cool breeze sweeps across open waters past summer lotus marshes, historic Tay Ho Palace, and pastel villas overflowing with bougainvillea.',
        },
        tip: { vi: 'Nên đạp xe theo chiều ngược kim đồng hồ để luôn chạy sát mép bờ hồ ngắm cảnh.', en: 'Ride counter-clockwise so your bike stays on the water-facing curb for uninterrupted views.' },
      },
      {
        time: '16:00 Chiều',
        title: { vi: 'Chiêm bái Chùa Trấn Quốc và cây Bồ đề cổ thụ', en: 'Visiting Tran Quoc Pagoda & the sacred Bodhi tree' },
        narrative: {
          vi: 'Gửi xe ở đầu đường Thanh Niên, bước qua lối cầu đá nhỏ dẫn vào chùa. Dành vài phút chắp tay tĩnh tâm dưới tán cây bồ đề sum sê — món quà của Tổng thống Ấn Độ Prasat trao tặng Chủ tịch Hồ Chí Minh năm 1959. Không khí thanh tịnh và hương trầm phảng phất khiến tâm hồn lắng lại.',
          en: 'Park along Thanh Nien causeway and walk across the arched stone bridge into the pagoda. Stand quietly beneath the spreading canopy of the sacred Bodhi tree — presented by Indian President Rajendra Prasad to President Ho Chi Minh in 1959.',
        },
      },
      {
        time: '17:30 Chiều',
        title: { vi: 'Bữa tiệc hoàng hôn rực rỡ và đĩa bánh tôm nóng hổi', en: 'Fiery sunset panorama & a plate of crispy street shrimp cakes' },
        narrative: {
          vi: 'Tìm một quán cà phê sân thượng ven đường Thanh Niên hoặc bến Hàn Quốc. Mặt trời đỏ rực như lòng đỏ trứng gà từ từ lặn xuống phía sau đường chân trời, dát vàng lên từng gợn sóng. Kế đó, ghé quán bánh tôm Hồ Tây thưởng thức chiếc bánh chiên vàng ruộm bọc tôm tươi ngọt chấm nước mắm chua ngọt đu đủ giòn.',
          en: 'Secure a rooftop table along Thanh Nien or the lakeside boardwalk. The sun drops like a blazing ruby behind the skyline, gilding ripples in molten gold. Follow it with hot, crispy fried sweet potato cakes topped with freshwater shrimp dipped in tangy fish sauce.',
        },
      },
    ],
    insiderTips: [
      { vi: 'Chùa Trấn Quốc mở cửa từ 07:30 đến 18:00, miễn phí vé vào cửa nhưng cần mặc trang phục kín đáo.', en: 'Tran Quoc Pagoda is open 07:30–18:00 with free entry; strict modest dress code enforced.' },
      { vi: 'Hoàng hôn Hồ Tây đẹp nhất vào mùa hè và mùa thu (khoảng 17:15 - 18:00), hãy đến sớm 30 phút để có vị trí đẹp nhất.', en: 'Peak sunset colors occur between 17:15 and 18:00 during summer and autumn—arrive 30 minutes early.' },
      { vi: 'Khu vực đường Quảng Bá và Xuân Diệu có rất nhiều nhà hàng ẩm thực quốc tế và quán cà phê phong cách bohemian độc đáo.', en: 'Quang Ba and Xuan Dieu quarters host fantastic international bistros, bakeries, and bohemian cafes.' },
    ],
            images: [
      {
        src: '/images/destinations/hanoi/ho-tay/tran-quoc-stupa.jpg',
        alt: { vi: 'Bảo tháp Lục Độ Đài Sen chùa Trấn Quốc soi bóng nước Hồ Tây', en: 'Luc Do Dai Sen lotus stupa of Tran Quoc Pagoda reflected on West Lake' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tran_Quoc_Pagoda_Stupa.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
      {
        src: '/images/destinations/hanoi/ho-tay/west-lake-sunset.jpg',
        alt: { vi: 'Hoàng hôn nhuộm vàng mặt nước Hồ Tây mênh mang thơ mộng', en: 'Golden sunset over the vast poetic expanse of West Lake' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ho%C3%A0ng_h%C3%B4n_H%E1%BB%93_T%C3%A2y.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
      {
        src: '/images/destinations/hanoi/ho-tay/tran-quoc-gate.jpg',
        alt: { vi: 'Cổng tam quan cổ kính của Chùa Trấn Quốc bên đường Thanh Niên', en: 'Historic triple gate of Tran Quoc Pagoda on Thanh Nien causeway' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ch%C3%B9a_Tr%E1%BA%A5n_Qu%E1%BB%91c.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
    ],
  },
  {
    id: 'dest-nha-tho-lon-ha-noi',
    slug: 'nha-tho-lon-ha-noi',
    provinceId: 'p-ha-noi',
    featured: false,
    name: {
      vi: 'Nhà thờ Lớn Hà Nội (St. Joseph)',
      en: "St. Joseph's Cathedral Hanoi",
    },
    summary: {
      vi: 'Kiệt tác Gothic thời Pháp thế kỷ XIX mang vẻ đẹp rêu phong cổ kính giữa lòng phố cổ, nổi tiếng với văn hóa trà chanh vỉa hè nhộn nhịp.',
      en: '19th-century French Neo-Gothic architectural masterpiece with weathered patina walls, famed for its lively sidewalk lemon tea culture.',
    },
    description: {
      vi: `Khánh thành đúng dịp Giáng sinh năm 1886, Nhà thờ Chính tòa Thánh Giuse (thường gọi thân thương là Nhà thờ Lớn) là nhà thờ Công giáo cổ nhất thủ đô. Được thiết kế theo nguyên mẫu của Nhà thờ Đức Bà Paris với hai ngọn tháp chuông vuông vức vươn cao gần 31,5 mét, công trình mang đậm dấu ấn kiến trúc Gothic châu Âu thời Phục Hưng: những vòm cuốn nhọn, cửa sổ kính màu vẽ thánh tích tinh xảo và mặt ngoài trát vôi vữa phủ lớp rêu phong màu xám đen của thời gian.

Thế nhưng, điều khiến Nhà thờ Lớn trở thành một phần không thể tách rời trong đời sống người Hà Nội chính là quảng trường phía trước. Đây là nơi văn hóa "trà chanh Nhà Thờ" ra đời: chỉ với chiếc ghế nhựa con con, đĩa hướng dương rang thơm lừng và cốc trà chanh mát lạnh, bạn có thể ngồi hàng giờ ngắm dòng người dạo phố, lắng nghe tiếng chuông nhà thờ ngân vang từng hồi thanh thoát.`,
      en: `Inaugurated on Christmas 1886, St. Joseph’s Cathedral is the oldest Catholic church in the capital. Modeled after Notre-Dame de Paris with twin square bell towers soaring 31.5 meters, the basilica exemplifies European Neo-Gothic architecture: towering pointed ribbed vaults, radiant stained glass from France, and exterior lime plaster weathered to a poetic dark charcoal patina.

Yet what endears the cathedral to every traveler is the vibrant public plaza spreading at its feet. This is the birthplace of Hanoi’s famed "tra chanh Nha Tho" (Cathedral iced lemon tea) culture: perched on low plastic stools with sunflower seeds and frosty glasses of tea, you can watch street life unfold beneath soaring gothic pinnacles as church bells ring out across the terracotta roofs.`,
    },
    categoryIds: ['heritage', 'urban'],
    coordinates: { latitude: 21.0288, longitude: 105.8495 },
    highlights: [
      { vi: 'Kiến trúc Gothic châu Âu nguyên bản với tháp chuông đôi cao 31,5m', en: 'Original Neo-Gothic architecture with twin 31.5m bell towers' },
      { vi: 'Hệ thống kính màu nghệ thuật lung linh ánh sáng bên trong thánh đường', en: 'Intricate stained-glass rosette windows illuminating the central nave' },
      { vi: 'Trải nghiệm trà chanh chém gió và nem chua rán ngõ Ấu Triệu', en: 'Sidewalk lemon iced tea & fried fermented pork rolls on Au Trieu lane' },
    ],
    travelogue: [
      {
        time: '10:00 Sáng',
        title: { vi: 'Chiêm ngưỡng mặt tiền rêu phong và thánh đường trang nghiêm', en: 'Admiring the weathered gothic facade & reverent cathedral interior' },
        narrative: {
          vi: 'Buổi sáng là lúc mặt trời chiếu rọi từ hướng đông lên mặt tiền nhà thờ, làm nổi bật từng đường gờ phào và tượng Đức Mẹ bế Chúa Hài Đồng. Nếu ghé vào giờ mở cửa thánh lễ, hãy bước khẽ vào bên trong để chiêm ngưỡng trần vòm cao vút và ánh sáng kính màu huyền ảo.',
          en: 'Morning sunlight illuminates the east-facing facade, accentuating gothic ribbing and the statue of Mary holding the Christ Child. Step quietly inside during visiting hours to marvel at the towering vaulted nave bathed in multicolored jewel tones.',
        },
        tip: { vi: 'Thánh đường mở cửa cho khách tham quan vào các khung giờ ngoài lễ (thường 08:00 - 11:00 và 14:00 - 17:00).', en: 'Cathedral doors open for visitors outside mass services (typically 08:00–11:00 and 14:00–17:00).' },
      },
      {
        time: '15:30 Chiều',
        title: { vi: 'Ngồi trà chanh vỉa hè cắn hướng dương ngắm phố', en: 'Sitting on low plastic stools sipping lemon tea & people watching' },
        narrative: {
          vi: 'Chọn một góc quán ven phố Lý Quốc Sư hoặc Nhà Thờ, gọi cốc trà chanh mát lịm thơm mùi quất tươi và đĩa nem chua rán giòn rụm ngõ Ấu Triệu. Tiếng cười nói râm ran, tiếng xích lô qua lại tạo nên một nhịp sống Hà Nội rất đỗi gần gũi.',
          en: 'Grab a stool on Ly Quoc Su or Nha Tho street, ordering a zesty iced calamansi tea alongside hot crispy fried nem chua rolls from Au Trieu alley. The cheerful chatter of locals and passing cyclos paints quintessential Hanoi sidewalk poetry.',
        },
      },
      {
        time: '21:00 Đêm',
        title: { vi: 'Nhà thờ Lớn lung linh ánh đèn đêm Giáng sinh hoặc cuối tuần', en: 'Cathedral illuminated in amber glow under the starry night sky' },
        narrative: {
          vi: 'Đêm về, ánh đèn vàng ấm áp hắt lên nền tường đá cổ kính khiến Nhà thờ Lớn trông tựa một tòa lâu đài cổ tích giữa lòng phố cổ. Quanh quảng trường, các quán pub nhỏ và quán cà phê acoustic bắt đầu cất lên những giai điệu mộc mạc.',
          en: 'At night, warm spotlights flood the weathered stone walls, turning the cathedral into a fairytale bastion amidst lantern-lit lanes. Acoustic bars around the square begin strumming soft acoustic chords.',
        },
      },
    ],
    insiderTips: [
      { vi: 'Ngay cạnh nhà thờ có ngõ Ấu Triệu trứ danh với món nem chua nướng than hoa mềm dẻo không nơi nào sánh bằng.', en: 'Right beside the cathedral, Au Trieu alley serves unbeatable charcoal-grilled sour pork rolls.' },
      { vi: 'Vào dịp Giáng sinh (tháng 12), nơi đây được trang hoàng cây thông khổng lồ và tiểu cảnh hang đá rực rỡ nhất Hà Nội.', en: 'During Christmas week, the square hosts the city’s largest decorated pine tree and illuminated nativity scenes.' },
      { vi: 'Góc chụp toàn cảnh đẹp nhất là từ các quán cà phê tầng 2 hoặc 3 trên đường Nhà Chung đối diện.', en: 'Best elevated panoramic photos are captured from second-floor balcony cafes along Nha Chung Street.' },
    ],
            images: [
      {
        src: '/images/destinations/hanoi/nha-tho-lon/st-joseph-facade.jpg',
        alt: { vi: 'Mặt tiền kiến trúc Gothic rêu phong cổ kính của Nhà thờ Lớn Hà Nội', en: 'Weathered Neo-Gothic facade of St. Joseph Cathedral in Hanoi' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hanoi_St_Joseph%27s_cathedral.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
      {
        src: '/images/destinations/hanoi/nha-tho-lon/st-joseph-plaza.jpg',
        alt: { vi: 'Toàn cảnh Nhà thờ Lớn nhìn từ quảng trường và các quán cà phê phố Nhà Chung', en: 'Panoramic view of St. Joseph Cathedral from the plaza and Nha Chung cafes' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hanoi_Catholic_Cathedral.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
      {
        src: '/images/destinations/hanoi/nha-tho-lon/st-joseph-towers-view.jpg',
        alt: { vi: 'Tháp chuông đôi vươn cao uy nghiêm giữa nền trời xanh thủ đô', en: 'Twin bell towers soaring majestically against the Hanoi sky' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Kirche_St._Josef_Hanoi_Vietnam.JPG',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
    ],
  },
  {
    id: 'dest-cau-long-bien',
    slug: 'cau-long-bien',
    provinceId: 'p-ha-noi',
    featured: false,
    name: {
      vi: 'Cầu Long Biên — Chứng Nhân Lịch Sử',
      en: 'Long Bien Bridge — Historical Witness',
    },
    summary: {
      vi: 'Cây cầu thép trăm tuổi bắc qua sông Hồng, kiệt tác kiến trúc của công ty Daydé & Pillé gắn liền với những thăng trầm bom đạn của thủ đô.',
      en: 'Century-old cantilever steel bridge spanning the Red River, an engineering icon by Daydé & Pillé steeped in Hanoi’s wartime resilience.',
    },
    description: {
      vi: `Được khởi công năm 1898 và khánh thành năm 1902 dưới thời Toàn quyền Paul Doumer, cầu Long Biên từng là một trong bốn cây cầu thép dài nhất thế giới thời bấy giờ (dài 2.290 mét). Trải qua hơn 120 năm với bao lần trúng bom đạn trong chiến tranh chống Mỹ, những nhịp cầu sắt gỉ sét uốn lượn như dải lụa sắt vắt ngang sông Hồng vẫn kiên cường đứng đó, trở thành chứng nhân lịch sử bất tử của Hà Nội.

Đến cầu Long Biên hôm nay, bạn sẽ được chạm tay vào những thanh dầm thép mang vết tích thời gian, lắng nghe tiếng còi tàu hỏa hú vang khi đoàn tàu xình xịch lướt qua nhịp cầu gỗ rung rinh nhè nhẹ. Dưới chân cầu là bãi giữa sông Hồng với những nương ngô, bãi chuối xanh mướt ngút ngàn, tạo nên một sự tương phản diệu kỳ giữa sắt thép công nghiệp cổ điển và thiên nhiên hoang sơ giữa lòng đô thị.`,
      en: `Commissioned in 1898 and inaugurated in 1902, the Long Bien Bridge was once one of the longest steel cantilever bridges on the globe at 2,290 meters. Having survived fierce bombardments during wartime, its rusted iron trusses still gracefully arch across the Red River like a resilient metal dragon — the eternal witness to Hanoi’s trials and triumph.

Visiting Long Bien today, you can touch aged rivets bearing 120 years of history and hear the piercing whistle of diesel passenger trains rumbling along the single wooden sleeper tracks. Directly beneath lies the lush Red River alluvium island filled with banana groves and cornfields, forming an awe-inspiring juxtaposition between antique industrial ironwork and rustic pastoral greenery.`,
    },
    categoryIds: ['heritage', 'urban'],
    coordinates: { latitude: 21.0436, longitude: 105.8572 },
    highlights: [
      { vi: 'Dạo bộ trên nhịp cầu sắt ngắm toàn cảnh sông Hồng và bãi giữa', en: 'Walking along antique steel trusses overlooking the alluvial river plains' },
      { vi: 'Chụp ảnh hoài niệm cùng các chuyến tàu hỏa qua cầu lúc bình minh', en: 'Capturing evocative dawn portraits as passenger trains cross the bridge' },
      { vi: 'Ghé quán cà phê trên cao ngắm đường cong uốn lượn của dải cầu thép', en: 'Sipping rooftop coffee with panoramic vantage views over the bridge curve' },
    ],
    travelogue: [
      {
        time: '05:00 Sáng',
        title: { vi: 'Săn bình minh sông Hồng trên nhịp cầu thế kỷ', en: 'Hunting Red River sunrise from the century-old steel span' },
        narrative: {
          vi: '5 giờ sáng là khoảnh khắc kỳ diệu nhất trên cầu Long Biên. Khi dòng người gánh rau củ từ chợ đầu mối Long Biên lục tục qua cầu, mặt trời đỏ rực từ từ ló rạng từ phía chân trời bãi giữa, nhuộm vàng từng thanh thép rỉ sét và làn sương giăng trên mặt sông.',
          en: '5:00 AM is the most magical hour on Long Bien. As street vendors push heavy vegetable carts from the night market, a fiery sun rises over the river bend, gilding weathered iron rivets and the mist-shrouded river surface in radiant amber.',
        },
        tip: { vi: 'Vị trí chụp bình minh đẹp nhất là các nhịp cầu phía bờ Gia Lâm nhìn ngược về phía trung tâm thành phố.', en: 'Best sunrise angle: the eastern bridge spans facing back toward the city skyline.' },
      },
      {
        time: '08:30 Sáng',
        title: { vi: 'Chờ đón chuyến tàu hỏa xình xịch qua nhịp cầu rung rinh', en: 'Waiting for the morning passenger train to rumble across the ties' },
        narrative: {
          vi: 'Đứng sát lan can đi bộ, lắng nghe tiếng còi tàu ngân dài từ ga Long Biên. Khi đoàn tàu hỏa màu xanh đỏ lao qua, toàn bộ nhịp cầu hơi rung chuyển nhè nhẹ, mang lại cảm giác hoài niệm sống động như trở về Hà Nội của thế kỷ trước.',
          en: 'Lean against the pedestrian rail as the whistle announces a train approaching from Long Bien Station. The wooden ties tremor gently beneath your feet as vintage train cars glide by, instantly transporting you back to 20th-century Hanoi.',
        },
        tip: { vi: 'Tuyệt đối không trèo lên đường ray tàu hỏa để chụp ảnh nhằm đảm bảo an toàn giao thông đường sắt.', en: 'Never step onto live train tracks to take photos; stay safely within pedestrian footpaths.' },
      },
      {
        time: '17:00 Chiều',
        title: { vi: 'Ngắm hoàng hôn từ quán cà phê Serein Cafe ga Long Biên', en: 'Watching dusk settle over the bridge from Serein Rooftop Cafe' },
        narrative: {
          vi: 'Rời cầu, ghé quán cà phê trên tầng thượng của tòa nhà Pháp cổ ở khu tập thể ga Long Biên. Thưởng thức ly trà đào cam sả ngắm dòng xe máy nối đuôi nhau như đàn đom đóm đỏ rực trên cầu khi thành phố lên đèn.',
          en: 'Descend to a rooftop cafe nestled in an old French colonial building facing Long Bien Station. Sip chilled peach tea while watching endless streams of motorbike headlights illuminate the bridge like a fiery dragon.',
        },
      },
    ],
    insiderTips: [
      { vi: 'Cầu chỉ dành cho xe máy, xe đạp và người đi bộ (lưu thông theo chiều tay trái theo thiết kế nguyên bản của Pháp).', en: 'Traffic on Long Bien flows on the left side following original French engineering conventions.' },
      { vi: 'Chợ đầu mối hoa quả Long Biên họp thâu đêm ngay dưới gầm cầu, là nơi trải nghiệm nhịp sống lao động chân thực nhất của Hà Nội.', en: 'The Long Bien wholesale fruit market beneath the bridge bustles all night—a raw look at local working life.' },
      { vi: 'Xuống bãi giữa sông Hồng bằng lối mòn cầu thang sắt giữa cầu để khám phá những vườn chuối và bãi lau thơ mộng.', en: 'Iron staircases mid-bridge descend to the alluvial island below, perfect for exploring scenic reed fields.' },
    ],
            images: [
      {
        src: '/images/destinations/hanoi/cau-long-bien/long-bien-bridge.jpg',
        alt: { vi: 'Cầu Long Biên chứng nhân lịch sử vắt qua dòng sông Hồng', en: 'Historic Long Bien Bridge spanning across the Red River' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:C%E1%BA%A7u_Long_Bi%C3%AAn.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
      {
        src: '/images/destinations/hanoi/cau-long-bien/long-bien-train.jpg',
        alt: { vi: 'Đoàn tàu hỏa và dòng xe máy mộc mạc qua nhịp cầu thép cổ', en: 'Train and motorbikes traversing the historic steel span' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Long_Bien_Bridge_train.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
      {
        src: '/images/destinations/hanoi/cau-long-bien/long-bien-trusses.jpg',
        alt: { vi: 'Khung dầm thép uốn lượn như dải lụa sắt vắt ngang bãi giữa', en: 'Cantilever steel trusses gracefully arching over the alluvial riverbank' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Long_Bien_Bridge_structure.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
    ],
  },
  {
    id: 'dest-chua-mot-cot-lang-bac',
    slug: 'chua-mot-cot-lang-bac',
    provinceId: 'p-ha-noi',
    featured: false,
    name: {
      vi: 'Chùa Một Cột & Quảng Trường Ba Đình',
      en: 'One Pillar Pagoda & Ba Dinh Square',
    },
    summary: {
      vi: 'Ngôi chùa có kiến trúc đóa sen độc nhất vô nhị châu Á bên cạnh trung tâm chính trị lịch sử nơi Bác Hồ đọc Tuyên ngôn Độc lập.',
      en: 'Asia’s most uniquely designed lotus-shaped pagoda set beside historic Ba Dinh Square and Ho Chi Minh Mausoleum.',
    },
    description: {
      vi: `Chùa Một Cột (tên chữ Diên Hựu tự, nghĩa là "phước lành dài lâu") được khởi dựng vào mùa đông năm 1049 dưới triều vua Lý Thái Tông. Tương truyền vua chiêm bao thấy Phật Bà Quan Âm ngồi trên tòa sen dắt vua lên đài, thiền sư Thiền Tuệ đã khuyên vua dựng chùa dựng cột đá giữa hồ sen như hình đóa sen nghìn cánh vươn lên đón ánh dương. Với kiến trúc một gian gỗ vuông đặt trên cột đá nguyên khối đường kính 1,2 mét, công trình đã được Tổ chức Kỷ lục Châu Á xác lập là "Ngôi chùa có kiến trúc độc đáo nhất châu Á".

Ngay liền kề chùa là Quảng trường Ba Đình linh thiêng — quảng trường lớn nhất Việt Nam với 168 ô cỏ xanh mướt. Nơi đây ngày 2/9/1945, Chủ tịch Hồ Chí Minh đã đọc Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa. Dạo bước qua Lăng Bác, Nhà sàn gỗ mộc mạc và ao cá râm mát dưới bóng râm của hàng tre ngà, bạn sẽ cảm nhận trọn vẹn lòng tôn kính và sự bình dị của vị lãnh tụ kính yêu.`,
      en: `The One Pillar Pagoda (Dien Huu Tu, meaning "Prolonged Longevity") was founded in the winter of 1049 by Emperor Ly Thai Tong. Legend holds that after dreaming of the Bodhisattva Avalokiteshvara handing him a baby boy from a lotus blossom, the monk Thien Tue advised him to erect a temple shaped like a blossoming lotus rising from an emerald pool. Supported by a single stone pillar 1.2m in diameter, the Asian Records Organization designated it "The Most Unique Architectural Pagoda in Asia."

Bordering the temple lies sacred Ba Dinh Square — Vietnam’s grandest civic plaza divided into 168 grass plots. Here on September 2, 1945, President Ho Chi Minh proclaimed the Declaration of Independence. Walking past the granite Mausoleum to the modest wooden Stilt House and koi pond shaded by golden bamboo groves evokes deep reverence and tranquility.`,
    },
    categoryIds: ['heritage'],
    coordinates: { latitude: 21.0358, longitude: 105.8335 },
    highlights: [
      { vi: 'Kiến trúc Liên Hoa Đài độc nhất vô nhị trên thế giới', en: 'Unique single-pillar lotus blossom architectural pavilion' },
      { vi: 'Lễ thượng cờ và hạ cờ trang nghiêm trên Quảng trường Ba Đình (06:00 và 21:00)', en: 'Solemn flag raising (06:00) and lowering (21:00) ceremonies on Ba Dinh Square' },
      { vi: 'Thăm Nhà sàn Bác Hồ, ao cá Bác và vườn cây trái bốn mùa', en: 'Visiting Uncle Ho’s wooden stilt house, serene carp pond, and fruit orchards' },
    ],
    travelogue: [
      {
        time: '05:45 Sáng',
        title: { vi: 'Dự lễ Thượng cờ trang nghiêm trên Quảng trường Ba Đình', en: 'Witnessing the solemn National Flag Raising Ceremony' },
        narrative: {
          vi: 'Đúng 05:50 sáng, loa phát thanh cất lời hiệu triệu trang trọng. Đội tiêu binh danh dự gồm 34 chiến sĩ trong bộ quân phục trắng muốt bước đều tăm tắp theo tiếng nhạc bài hát "Tiến bước dưới quân kỳ". Đúng 06:00, lá cờ Tổ quốc từ từ bay lên đỉnh kỳ đài trong tiếng Quốc ca hào hùng.',
          en: 'At 05:50 AM, the public speaker sounds the ceremonial call. A 34-soldier honor guard in pristine white uniforms marches in perfect unison across Ba Dinh Square to martial brass music. At 06:00 sharp, the national flag unfurls proudly to the National Anthem.',
        },
        tip: { vi: 'Hãy có mặt trước 05:40 sáng để có chỗ đứng quan sát tốt nhất sát dải phân cách cỏ.', en: 'Arrive before 05:40 AM to secure a prime viewpoint near the grass boundary.' },
      },
      {
        time: '08:00 Sáng',
        title: { vi: 'Chiêm bái Chùa Một Cột và hồ sen Linh Chiểu', en: 'Paying respects at the One Pillar Pagoda & Linh Chieu lotus pool' },
        narrative: {
          vi: 'Sau lễ thượng cờ, tản bộ sang Chùa Một Cột. Đứng ngắm ngôi chùa gỗ sơn son lộng lẫy vươn lên từ mặt nước hồ Linh Chiểu nở hoa súng, chắp tay cầu nguyện bình an trước tượng Phật Bà Quan Âm nghìn mắt nghìn tay.',
          en: 'Stroll into the serene temple precinct. Admire the wooden lotus shrine rising gracefully from the water lily pond and bow in prayer before the thousand-armed Bodhisattva within.',
        },
      },
      {
        time: '09:30 Sáng',
        title: { vi: 'Vào thăm Nhà sàn Bác Hồ và cho cá ăn bên ao', en: 'Touring Uncle Ho’s Stilt House and koi pond' },
        narrative: {
          vi: 'Đi theo con đường lát sỏi rợp bóng xoài cổ thụ vào Phủ Chủ tịch. Chiêm ngưỡng ngôi nhà sàn bằng gỗ đơn sơ nơi Bác Hồ từng sống và làm việc từ 1958 đến 1969, ngắm đàn cá chép quẫy nước mỗi khi nghe tiếng vỗ tay của khách tham quan.',
          en: 'Walk down gravel paths shaded by mango trees into the Presidential Palace grounds. Tour the humble wooden stilt house where President Ho Chi Minh lived from 1958 to 1969, watching golden carp splash eagerly in the feeding pool.',
        },
      },
    ],
    insiderTips: [
      { vi: 'Vào Lăng viếng Bác cần mặc trang phục lịch sự, không quay phim chụp ảnh trong lăng và gửi balo túi xách ở cổng an ninh.', en: 'Strict decorum: no sleeveless shirts or shorts above knees; bags and cameras checked at security.' },
      { vi: 'Lăng Bác mở cửa đón khách viếng vào các buổi sáng thứ Ba, Tư, Năm, Bảy và Chủ nhật (đóng cửa thứ Hai và thứ Sáu).', en: 'Mausoleum opens for visits Tuesday, Wednesday, Thursday, Saturday, Sunday mornings (closed Mon & Fri).' },
      { vi: 'Khu vực quảng trường rất rộng và ít bóng râm, hãy mang theo mũ hoặc ô che nắng nếu tham quan vào buổi trưa.', en: 'Ba Dinh Square has little shade; carry a sun hat or umbrella for midday visits.' },
    ],
            images: [
      {
        src: '/images/destinations/hanoi/chua-mot-cot/one-pillar-pagoda.jpg',
        alt: { vi: 'Chùa Một Cột tựa đóa sen ngát hương vươn lên từ hồ Linh Chiểu', en: 'One Pillar Pagoda shaped like a lotus blossom emerging from the pond' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ch%C3%B9a_M%E1%BB%99t_C%E1%BB%99t.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
      {
        src: '/images/destinations/hanoi/chua-mot-cot/ho-chi-minh-mausoleum.jpg',
        alt: { vi: 'Lăng Chủ tịch Hồ Chí Minh uy nghi trên Quảng trường Ba Đình', en: 'President Ho Chi Minh Mausoleum presiding over Ba Dinh Square' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:L%C4%83ng_Ch%E1%BB%A7_t%E1%BB%8Bch_H%E1%BB%93_Ch%C3%AD_Minh.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
      {
        src: '/images/destinations/hanoi/chua-mot-cot/one-pillar-close.jpg',
        alt: { vi: 'Cận cảnh cột đá nguyên khối và kiến trúc gỗ Liên Hoa Đài', en: 'Close-up of the monolithic stone pillar and lotus shrine architecture' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ch%C3%B9a_M%E1%BB%99t_C%E1%BB%99t_g%E1%BA%A7n.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
    ],
  },
  {
    id: 'dest-lang-co-duong-lam',
    slug: 'lang-co-duong-lam',
    provinceId: 'p-ha-noi',
    featured: false,
    name: {
      vi: 'Làng Cổ Đường Lâm (Sơn Tây)',
      en: 'Duong Lam Ancient Village',
    },
    summary: {
      vi: 'Bảo tàng sống của văn hóa nông thôn Bắc Bộ với cổng làng trăm tuổi, giếng nước, sân đình và gần 1.000 ngôi nhà đá ong mộc mạc.',
      en: 'A living open-air museum of Northern Vietnamese village heritage with ancient gates, banyan trees, and rustic laterite stone farmsteads.',
    },
    description: {
      vi: `Nằm cách trung tâm Hà Nội khoảng 44km về phía Tây thuộc thị xã Sơn Tây, Đường Lâm là ngôi làng cổ đầu tiên ở Việt Nam được Nhà nước trao bằng Di tích Kiến trúc - Nghệ thuật Quốc gia. Vùng đất "địa linh nhân kiệt" này là nơi sinh ra hai vị vua anh hùng dân tộc: Phùng Hưng (Bố Cái Đại Vương) và Ngô Quyền — vị vua mở đầu nền độc lập tự chủ của dân tộc sau chiến thắng Bạch Đằng năm 938.

Bước qua cổng làng Mông Phụ xây bằng đá ong nép mình dưới tán cây đa thụ trăm tuổi, thời gian dường như ngưng đọng lại từ vài thế kỷ trước. Những con ngõ nhỏ lát gạch nghiêng sạch bóng, hai bên là những bức tường đá ong nâu trầm mộc mạc xây không cần vôi vữa. Trong mỗi khoảng sân nhà cổ, hàng chục chum tương nếp lớn phơi mình dưới nắng vàng ruộm, tỏa ra mùi thơm ngậy đặc trưng của văn hóa ẩm thực xứ Đoài mây trắng.`,
      en: `Located 44km west of downtown Hanoi in Son Tay, Duong Lam was the first rural village in Vietnam crowned a National Architectural Heritage Site. This celebrated soil gave birth to two heroic kings: Phung Hung and Ngo Quyen — who ended a millennium of Northern domination at the landmark Battle of Bach Dang River in 938 AD.

Passing beneath the ancient laterite gate of Mong Phu village shaded by a giant banyan tree, time feels frozen in the 17th century. Herringbone brick pathways weave between rustic walls constructed from dark red laterite stone quarried from local red clay. In every sunny brick courtyard, dozens of clay fermentation urns bask under golden sunlight, emitting the rich appetizing fragrance of traditional sticky rice soybean sauce.`,
    },
    categoryIds: ['heritage', 'nature'],
    coordinates: { latitude: 21.1436, longitude: 105.4983 },
    highlights: [
      { vi: 'Cổng làng Mông Phụ cổ kính và cây đa trăm tuổi biểu tượng làng quê Việt', en: 'Mong Phu village gate and ancient banyan tree, quintessential rural symbols' },
      { vi: 'Khám phá các ngôi nhà cổ bằng đá ong có niên đại từ 300 đến 400 năm', en: 'Touring 300 to 400-year-old laterite homesteads and open brick courtyards' },
      { vi: 'Đền thờ và lăng mộ hai vua Phùng Hưng và Ngô Quyền linh thiêng', en: 'Historic sacred shrines of King Phung Hung and King Ngo Quyen' },
      { vi: 'Thưởng thức cơm quê truyền thống: gà mía, thịt quay đòn và tương nếp', en: 'Feasting on Mia roasted chicken, herbal pork rolls, and fermented soybean sauce' },
    ],
    travelogue: [
      {
        time: '08:30 Sáng',
        title: { vi: 'Đến cổng làng Mông Phụ và thuê xe đạp cổ', en: 'Arriving at Mong Phu Gate & renting vintage touring bicycles' },
        narrative: {
          vi: 'Rời trung tâm Hà Nội theo đại lộ Thăng Long khoảng 1 giờ lái xe, bạn sẽ đến Đường Lâm. Thuê một chiếc xe đạp giỏ hoa ngay cổng làng, hít căng lồng ngực mùi khói rơm rạ và bắt đầu lướt qua những con ngõ lát gạch nghiêng uốn lượn.',
          en: 'A pleasant one-hour drive west of Hanoi brings you to Duong Lam. Rent a classic bicycle with a basket at the entrance gate and pedal along curving herringbone brick alleys perfumed with sweet rice straw smoke.',
        },
        tip: { vi: 'Giá thuê xe đạp chỉ khoảng 30.000 - 50.000đ/ngày, cách tốt nhất để khám phá làng.', en: 'Bicycle rentals cost 30,000–50,000 VND per day; the ideal way to wander.' },
      },
      {
        time: '10:30 Sáng',
        title: { vi: 'Thăm nhà cổ ông Huyến và thử tương nếp Đường Lâm', en: 'Visiting Mr. Huyen’s 300-year-old home & sampling aged soybean paste' },
        narrative: {
          vi: 'Ghé thăm ngôi nhà gỗ lim 5 gian cổ kính hơn 300 năm tuổi của gia đình ông Huyến. Gia chủ sẽ mời bạn chén trà xanh nóng hổi cùng đĩa kẹo dồi, kẹo lạc giòn tan, đồng thời mở nắp chiếc chum sành cho bạn ngắm lớp tương nếp vàng óng sánh mịn.',
          en: 'Step into Mr. Huyen’s 300-year-old 5-span ironwood residence. The welcoming host serves freshly brewed green tea with crunchy peanut brittle, lifting clay urn lids to demonstrate how sweet fermented sticky rice paste develops its deep amber luster.',
        },
      },
      {
        time: '12:30 Trưa',
        title: { vi: 'Bữa cơm quê thịnh soạn với gà Mía và rau muống luộc chấm tương', en: 'Authentic rustic lunch with Mia chicken & water spinach dipped in sauce' },
        narrative: {
          vi: 'Ngồi ăn trưa ngay tại hiên nhà cổ. Đĩa gà Mía da giòn thịt ngọt chấm muối tiêu chanh, đĩa thịt quay đòn nướng than hoa bì giòn rụm và bát canh rau muống luộc dầm sấu mát lành sẽ khiến bạn nhớ mãi hương vị ẩm thực xứ Đoài.',
          en: 'Dine on the veranda of a heritage home. Crisp-skinned roasted Mia chicken with chili lime salt, crackling spit-roasted pork wrapped in guava leaves, and boiled morning glory greens dipped in home-brewed soybean paste define rustic perfection.',
        },
        tip: { vi: 'Nên đặt trước bữa trưa tại các nhà cổ ngay khi vừa đến làng vào buổi sáng.', en: 'Pre-order your traditional lunch with host families when you arrive in the morning.' },
      },
    ],
    insiderTips: [
      { vi: 'Vé tham quan làng cổ là 20.000đ/người lớn mua tại bến xe cổng làng.', en: 'Village admission ticket is 20,000 VND for adults purchased at the outer lot.' },
      { vi: 'Đừng quên mua kẹo chè lam dẻo cay nồng vị gừng và một hũ tương nếp Đường Lâm về làm quà.', en: 'Must-buy souvenirs: spicy ginger Che Lam sticky cakes and a jar of sweet aged soybean sauce.' },
      { vi: 'Mùa lúa chín (tháng 5 và tháng 10) là lúc cảnh sắc đồng quê quanh làng đẹp rực rỡ nhất.', en: 'Golden harvest months (May and October) offer the most stunning rural photography around the village gates.' },
    ],
            images: [
      {
        src: '/images/destinations/hanoi/duong-lam/mong-phu-gate.jpg',
        alt: { vi: 'Cổng làng Mông Phụ cổ kính nép mình bên gốc đa trăm tuổi', en: 'Ancient Mong Phu village gate beneath the historic banyan tree' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:C%E1%BB%95ng_v%C3%A0o_l%C3%A0ng_c%E1%BB%95_%C4%90%C6%B0%E1%BB%9Dng_L%C3%A2m.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
      {
        src: '/images/destinations/hanoi/duong-lam/duong-lam-village.jpg',
        alt: { vi: 'Những bức tường đá ong nâu trầm và ngõ lát gạch làng cổ Đường Lâm', en: 'Laterite stone walls and herringbone brick paths of Duong Lam ancient village' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:%C4%90%C6%B0%E1%BB%9Dng_L%C3%A2m.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
    ],
  },
  {
    id: 'dest-vuon-quoc-gia-ba-vi',
    slug: 'vuon-quoc-gia-ba-vi',
    provinceId: 'p-ha-noi',
    featured: false,
    name: {
      vi: 'Vườn Quốc Gia Ba Vì',
      en: 'Ba Vi National Park',
    },
    summary: {
      vi: 'Nóc nhà xanh mát lạnh của thủ đô với rừng thông nguyên sinh bạt ngàn, phế tích nhà thờ Pháp cổ huyền bí và biển mây bồng bềnh.',
      en: 'The cool mountainous crown of Hanoi featuring misty pine trails, atmospheric French colonial ruins, and breathtaking cloud ocean vistas.',
    },
    description: {
      vi: `Chỉ cách trung tâm Hà Nội gần 60km về hướng Tây, dãy núi Ba Vì sừng sững như một bức bình phong khổng lồ che chở cho thủ đô. Ở độ cao từ 400m đến gần 1.300m so với mực nước biển, Vườn quốc gia Ba Vì sở hữu tiểu khí hậu á nhiệt đới trong lành, mát mẻ quanh năm, nhiệt độ thường thấp hơn nội thành từ 5 đến 8 độ C.

Cung đường uốn lượn vượt dốc lên cốt 400, cốt 600 rồi cốt 1100 sẽ đưa bạn qua những rừng thông reo vi vu trong gió ngàn. Tại cốt 600, phế tích nhà thờ Pháp cổ nằm nép mình giữa sương mờ với những bức tường đá phủ rêu xanh ngắt và cây đa cổ quấn rễ quanh ô cửa sổ vòm Gothic, tạo nên một khung cảnh huyền ảo tựa phim cổ tích. Lên đến đỉnh cao nhất, bạn có thể viếng Đền Thượng thờ Đức Thánh Tản Viên Sơn Tinh và đền thờ Bác Hồ trên Đỉnh Vua lộng gió.`,
      en: `Rising sharply just 60km west of Hanoi, the sacred three peaks of Mount Ba Vi stand like a guardian bulwark over the capital. Towering from 400m to 1,296m, Ba Vi National Park boasts a refreshing sub-alpine microclimate year-round, regularly 5 to 8 degrees cooler than downtown Hanoi.

The winding alpine road ascends past fragrant pine forests toward misty hill stations. At altitude 600m, the ruins of an abandoned French colonial basilica hide within the cloud forest: moss-carpeted stone walls and giant strangler fig roots drape across empty Gothic lancet arches, creating an otherworldly, gothic atmosphere. At King Peak (Dinh Vua), an eagle-eye viewpoint crowns Uncle Ho’s temple overlooking the sweeping curve of the Da River.`,
    },
    categoryIds: ['nature', 'mountains'],
    coordinates: { latitude: 21.0828, longitude: 105.3628 },
    highlights: [
      { vi: 'Check-in phế tích Nhà thờ Pháp cổ phủ rêu huyền bí giữa biển sương', en: 'Photographing atmospheric mossy French church ruins shrouded in mountain mist' },
      { vi: 'Nhà kính xương rồng hình vòm khổng lồ bảo tồn hơn 1.200 giống cây quý', en: 'Giant geodesic cactus conservatory housing over 1,200 rare arid species' },
      { vi: 'Chinh phục Đỉnh Vua viếng Đền Bác Hồ và Đền Thượng thờ Tản Viên Sơn Tinh', en: 'Conquering King Peak to visit Ho Chi Minh Shrine & Tan Vien Mountain Spirit Temple' },
      { vi: 'Ngắm mùa hoa dã quỳ vàng rực nở rộ khắp sườn núi vào tháng 11', en: 'Admiring blazing golden wild sunflowers lining mountain slopes in November' },
    ],
    travelogue: [
      {
        time: '07:30 Sáng',
        title: { vi: 'Khởi hành rời thành phố và chinh phục cung đường đèo mát rượi', en: 'Departing the city & winding up the misty mountain pass' },
        narrative: {
          vi: 'Rời Hà Nội từ sáng sớm bằng xe máy hoặc ô tô, bắt đầu leo dốc qua cổng vườn quốc gia. Không khí mát lạnh dần theo từng mét độ cao, mùi thông tươi hòa quyện cùng sương mù vờn quanh mũ bảo hiểm mang lại cảm giác sảng khoái vô cùng.',
          en: 'Depart Hanoi at dawn to ascend the scenic pass. The temperature plunges with each hairpin turn as crisp mountain air and pine scents envelope you, cutting through low-hanging morning clouds.',
        },
        tip: { vi: 'Đường đèo dốc nhiều khúc cua tay áo, hãy kiểm tra phanh xe cẩn thận và về số thấp khi xuống dốc.', en: 'Steep switchbacks require solid brakes; drive in low gears on the descent.' },
      },
      {
        time: '09:30 Sáng',
        title: { vi: 'Lạc bước vào phế tích nhà thờ Pháp cổ tại cốt 600', en: 'Lost in the mystical mossy French church ruins at 600m level' },
        narrative: {
          vi: 'Dừng chân ở cốt 600, đi bộ vào khu phế tích nhà thờ Pháp xây dựng từ đầu thế kỷ XX. Khi mây bay qua mái vòm gãy đổ, những tia nắng len qua tán lá rọi xuống tường đá phủ rêu xanh tạo nên những bức ảnh phong cảnh tuyệt đẹp.',
          en: 'Park at the 600m terrace and hike into the abandoned 20th-century French church ruins. As clouds drift through the roofless nave, sun rays pierce through ancient trees, illuminating emerald moss and tree roots.',
        },
      },
      {
        time: '13:30 Chiều',
        title: { vi: 'Khám phá vương quốc xương rồng và leo Đỉnh Vua', en: 'Exploring the geodesic cactus dome & ascending King Peak' },
        narrative: {
          vi: 'Ghé thăm nhà kính xương rồng độc đáo với hàng ngàn cây xương rồng gai góc đủ hình thù từ khắp nơi trên thế giới. Tiếp tục lên cốt 1100, leo hơn 1.300 bậc đá rợp bóng cây rừng để chạm đỉnh Vua ngắm trọn dòng sông Đà bạc lấp lánh bên dưới.',
          en: 'Tour the geodesic greenhouse packed with thousands of exotic cacti. Continue upward to the 1,100m staging area, climbing 1,300 stone steps through cloud forests to King Peak for vistas of the silvery Da River.',
        },
      },
    ],
    insiderTips: [
      { vi: 'Vé vào cổng vườn quốc gia là 60.000đ/người lớn (sinh viên 20.000đ, học sinh 10.000đ).', en: 'Entry ticket is 60,000 VND for adults (discounts for students with ID).' },
      { vi: 'Tháng 11 hàng năm là mùa hoa dã quỳ nở vàng rực khắp hai bên đường đèo, là thời điểm đông đảo du khách nhất trong năm.', en: 'November brings the glorious wild sunflower bloom, covering roadsides in vivid yellow.' },
      { vi: 'Nhớ mang theo áo khoác gió mỏng vì trên núi nhiệt độ luôn lạnh hơn nội đô kể cả giữa mùa hè.', en: 'Pack a windbreaker as mountain temperatures remain chilly even on summer days.' },
    ],
            images: [
      {
        src: '/images/destinations/hanoi/ba-vi/french-church-ruins.jpg',
        alt: { vi: 'Phế tích nhà thờ Pháp cổ huyền bí giữa rừng già Ba Vì', en: 'Atmospheric ruins of the French church in misty Ba Vi forest' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Nh%C3%A0_th%E1%BB%9D_%C4%91%E1%BB%95_Ba_V%C3%AC.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
      {
        src: '/images/destinations/hanoi/ba-vi/mountain-road.jpg',
        alt: { vi: 'Cung đường đèo rợp bóng thông xanh mướt lên đỉnh Ba Vì', en: 'Scenic pine-lined winding road ascending Mount Ba Vi' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ba_Vi_mountain_road.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
    ],
  },
  {
    id: 'dest-lang-gom-bat-trang',
    slug: 'lang-gom-bat-trang',
    provinceId: 'p-ha-noi',
    featured: false,
    name: {
      vi: 'Làng Gốm Bát Tràng & Bảo Tàng Gốm',
      en: 'Bat Trang Ceramic Village & Museum',
    },
    summary: {
      vi: 'Cái nôi gốm sứ truyền thống trứ danh ven sông Hồng hơn 500 năm tuổi với Trung tâm Tinh hoa kiến trúc 7 bàn xoay khổng lồ độc nhất.',
      en: 'The celebrated 500-year-old pottery village along the Red River, featuring the stunning Ceramic Art Center with seven giant terracotta swirls.',
    },
    description: {
      vi: `Nằm ở tả ngạn sông Hồng thuộc huyện Gia Lâm, Bát Tràng là làng nghề gốm sứ lâu đời và trứ danh bậc nhất Việt Nam với lịch sử hình thành từ thời Lý - Trần (thế kỷ XIV). Đất sét trắng mịn cùng bàn tay tài hoa của các nghệ nhân đã tôi luyện nên những dòng men đỉnh cao: từ men lam cổ điển, men ngọc thanh tao, đến men rạn độc bản chỉ có riêng ở Bát Tràng.

Đến Bát Tràng hôm nay, bạn không chỉ được lạc bước trong chợ gốm cổ với hàng vạn sản phẩm gốm mộc, gốm trang trí và trà cụ tinh xảo, mà còn được chiêm ngưỡng Trung tâm Tinh hoa Làng nghề Việt (Bảo tàng Gốm Bát Tràng). Với kiến trúc 7 khối xoắn ốc uốn lượn tượng trưng cho 7 bàn xoay gốm của người thợ, công trình đất nung màu đỏ son này là một kiệt tác kiến trúc đương đại vinh danh các nghệ nhân Việt Nam.`,
      en: `Resting on the eastern banks of the Red River in Gia Lam district, Bat Trang is Vietnam’s paramount ceramic crafting village, tracing its origins to the 14th-century Ly and Tran dynasties. The local white clay and virtuoso hands of master potters birthed illustrious glazes: royal cobalt blue, celadon jade, and the iconic crackle glaze unique to Bat Trang kilns.

Today’s visitors can wander through the historic pottery market displaying thousands of tea sets, vases, and sculptures, and marvel at the Center for Vietnamese Craft Quintessence (Bat Trang Ceramic Museum). With seven sweeping terracotta spirals evoking giant pottery wheels spinning toward the sky, this contemporary architectural wonder pays homage to centuries of Vietnamese craft heritage.`,
    },
    categoryIds: ['heritage', 'urban'],
    coordinates: { latitude: 20.9764, longitude: 105.9125 },
    highlights: [
      { vi: 'Check-in Bảo tàng Gốm Bát Tràng kiến trúc 7 bàn xoay khổng lồ tráng lệ', en: 'Photographing the Ceramic Museum’s 7 giant curved terracotta swirls' },
      { vi: 'Trải nghiệm tự tay nhào nặn đất sét và vuốt gốm trên bàn xoay', en: 'Hands-on clay spinning and pottery throwing on artisanal wheels' },
      { vi: 'Khám phá lò bầu cổ và những xưởng gốm rêu phong trong ngõ hẹp', en: 'Exploring historic multi-chamber dragon kilns in narrow village alleys' },
      { vi: 'Thưởng thức cỗ bát tràng truyền thống: canh măng mực và xôi chè', en: 'Savoring festive dishes: squid bamboo soup and sweet floral rice dessert' },
    ],
    travelogue: [
      {
        time: '09:00 Sáng',
        title: { vi: 'Check-in Bảo tàng Gốm với kiến trúc xoắn ốc tuyệt mỹ', en: 'Checking in at the architectural wonder Ceramic Museum' },
        narrative: {
          vi: 'Đến thôn 5 Bát Tràng, bạn sẽ choáng ngợp trước tòa nhà bảo tàng đất nung màu đỏ cam uốn lượn như những lớp sóng gốm. Tầng thượng và các vòm cửa cong là phông nền hoàn hảo cho những bức ảnh nghệ thuật tràn ngập ánh sáng tự nhiên.',
          en: 'Arrive at Village 5 to behold the sweeping terracotta museum billowing like ribbons of red clay. The open rooftop and dramatic arches frame exquisite architectural photographs filled with natural light.',
        },
        tip: { vi: 'Vé vào bảo tàng khoảng 50.000đ/người, nên lên tầng thượng chụp ảnh vào lúc nắng sớm.', en: 'Admission is 50,000 VND; shoot rooftop portraits early before midday sun glare.' },
      },
      {
        time: '11:00 Trưa',
        title: { vi: 'Tự tay vuốt gốm và nung tác phẩm mang về làm kỷ niệm', en: 'Throwing your own clay vase on the potter’s wheel' },
        narrative: {
          vi: 'Bước vào một lò gốm trong làng, ngồi trước bàn xoay với tảng đất sét dẻo quánh. Dưới sự hướng dẫn của thợ gốm, hai bàn tay bạn sẽ cảm nhận được sự chuyển động kỳ diệu khi khối đất từ từ biến thành chiếc cốc hoặc bình hoa xinh xắn.',
          en: 'Sit before a revolving wheel with a damp clay lump. Guided by seasoned artisans, feel the magic as your fingers guide the clay upward into a custom cup or small vase to be kiln-dried and glazed as a souvenir.',
        },
        tip: { vi: 'Chi phí nặn gốm chỉ 30.000 - 50.000đ/lượt; nếu sấy nung và tô màu mang về thêm 30.000đ.', en: 'Pottery throwing costs ~40,000 VND; kiln drying and painting adds ~30,000 VND.' },
      },
      {
        time: '14:30 Chiều',
        title: { vi: 'Khám phá chợ gốm và thưởng thức đặc sản canh măng mực', en: 'Shopping the pottery market & tasting famous squid bamboo soup' },
        narrative: {
          vi: 'Dạo quanh chợ gốm Bát Tràng để chọn những bộ ấm chén men rạn bọc đồng hoặc bình hoa mộc mạc với giá xưởng. Buổi trưa, ghé quán cỗ cổ thưởng thức món canh măng mực tiến vua với vị ngọt giòn sần sật đặc sắc.',
          en: 'Wander the sprawling pottery market to handpick crackle-glaze tea sets and rustic stoneware at workshop prices. Cap the day by savoring imperial squid bamboo shoot soup, a celebrated festive delicacy.' },
      },
    ],
    insiderTips: [
      { vi: 'Từ trung tâm Hà Nội có thể đi xe buýt tuyến 47A xuất phát từ bến Long Biên thẳng đến cổng làng Bát Tràng.', en: 'Bus route 47A from Long Biên station takes you directly to the village entrance for just 7,000 VND.' },
      { vi: 'Các con ngõ nhỏ trong làng cổ Bát Tràng có tường đắp bằng than bánh phơi khô đen nhánh rất độc đáo.', en: 'Narrow village alleys feature walls textured with dried coal briquettes, a unique vernacular sight.' },
      { vi: 'Nếu mua đồ gốm sứ cồng kềnh, các tiệm gốm đều hỗ trợ đóng gói xốp chống sốc và gửi xe về tận nhà an toàn.', en: 'Shops provide shock-proof bubble wrapping and home delivery for bulky porcelain sets.' },
    ],
            images: [
      {
        src: '/images/destinations/hanoi/bat-trang/pottery-artisan.jpg',
        alt: { vi: 'Nghệ nhân gốm Bát Tràng vuốt đất tạo hình trên bàn xoay truyền thống', en: 'Artisan handcrafting ceramic clay pottery on rotating wheel at Bat Trang' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bat_Trang_pottery_wheel.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
      {
        src: '/images/destinations/hanoi/bat-trang/crackle-glaze.jpg',
        alt: { vi: 'Những sản phẩm gốm sứ men rạn tinh xảo tại làng nghề Bát Tràng', en: 'Exquisite crackle-glaze ceramic pottery at Bat Trang craft workshops' },
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bat_Trang_crackle_glaze.jpg',
        photographer: 'Wikimedia Commons Contributor',
        licenseName: 'CC BY-SA 4.0',
        licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        verifiedLocation: true,
      },
    ],
  },

  // 5. Cao Bằng
  {
    id: 'dest-thac-ban-gioc',
    slug: 'thac-ban-gioc',
    provinceId: 'p-cao-bang',
    featured: true,
    name: {
      vi: 'Thác Bản Giốc',
      en: 'Ban Gioc Waterfall',
    },
    summary: {
      vi: 'Ngọn thác tự nhiên lớn nhất Đông Nam Á đổ trắng xóa giữa núi rừng biên cương tuyệt mỹ.',
      en: 'The largest natural waterfall in Southeast Asia, cascading dramatically amidst frontier mountain scenery.',
    },
    categoryIds: ['nature', 'mountains'],
    coordinates: { latitude: 22.8542, longitude: 106.7231 },
    highlights: [
      { vi: 'Chiêm ngưỡng tầng thác ba bậc hùng vĩ', en: 'Witnessing the multi-tiered cascading falls' },
      { vi: 'Khám phá động Ngườm Ngao thạch nhũ lung linh', en: 'Exploring Nguom Ngao Cave with magical stalactites' },
    ],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Thác Bản Giốc mùa nước đổ', en: 'Ban Gioc Waterfall during high water season' },
        sourceUrl: 'https://unsplash.com/photos/1484b3fdfc62',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 6. Huế
  {
    id: 'dest-dai-noi-hue',
    slug: 'dai-noi-hue',
    provinceId: 'p-hue',
    featured: true,
    name: {
      vi: 'Quần thể Di tích Cố đô Huế',
      en: 'Complex of Hue Monuments',
    },
    summary: {
      vi: 'Kinh đô triều Nguyễn với Đại Nội tráng lệ, lăng tẩm hoàng gia và nhã nhạc cung đình di sản thế giới.',
      en: 'Royal capital of the Nguyen Dynasty with the Imperial City, royal tombs, and UNESCO Court Music.',
    },
    categoryIds: ['heritage'],
    coordinates: { latitude: 16.4697, longitude: 107.5786 },
    highlights: [
      { vi: 'Khám phá Ngọ Môn và Tử Cấm Thành', en: 'Visiting the Noon Gate and Purple Forbidden City' },
      { vi: 'Thăm lăng Tự Đức và lăng Khải Định', en: 'Touring the ornate tombs of Tu Duc and Khai Dinh' },
    ],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Điện Thái Hòa trong Đại Nội Huế', en: 'Thai Hoa Palace inside the Imperial Citadel of Hue' },
        sourceUrl: 'https://unsplash.com/photos/351597cf2477',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 7. Đà Nẵng
  {
    id: 'dest-ba-na-hills',
    slug: 'ba-na-hills',
    provinceId: 'p-da-nang',
    featured: false,
    name: {
      vi: 'Khu du lịch Bà Nà Hills & Cầu Vàng',
      en: 'Ba Na Hills & The Golden Bridge',
    },
    summary: {
      vi: 'Cây Cầu Vàng trứ danh được nâng đỡ bởi bàn tay khổng lồ trên đỉnh núi Chúa mờ sương.',
      en: 'World-famous Golden Bridge held aloft by giant stone hands atop misty Mount Chua.',
    },
    categoryIds: ['mountains', 'urban'],
    coordinates: { latitude: 15.9988, longitude: 107.9881 },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Cầu Vàng Bà Nà Hills Đà Nẵng', en: 'The Golden Bridge in Ba Na Hills, Da Nang' },
        sourceUrl: 'https://unsplash.com/photos/7cec4d0cae2b',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 8. Đà Nẵng
  {
    id: 'dest-ngu-hanh-son',
    slug: 'ngu-hanh-son',
    provinceId: 'p-da-nang',
    featured: false,
    name: {
      vi: 'Danh thắng Ngũ Hành Sơn',
      en: 'Marble Mountains',
    },
    summary: {
      vi: 'Năm ngọn núi đá vôi mang tên ngũ hành với hệ thống hang động huyền ảo và chùa chiền cổ kính.',
      en: 'Cluster of five marble and limestone peaks named after the five elements, filled with sacred caves.',
    },
    categoryIds: ['heritage', 'nature'],
    coordinates: { latitude: 16.0042, longitude: 108.2618 },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Chùa Linh Ứng và cảnh sắc Ngũ Hành Sơn', en: 'Linh Ung Pagoda atop Marble Mountains' },
        sourceUrl: 'https://unsplash.com/photos/58e3b4079ab2',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Động Huyền Không ánh sáng huyền ảo', en: 'Mystical light beam in Huyen Khong Cave' },
        sourceUrl: 'https://unsplash.com/photos/d7adac402bff',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 9. Hải Phòng
  {
    id: 'dest-dao-cat-ba',
    slug: 'dao-cat-ba',
    provinceId: 'p-hai-phong',
    featured: false,
    name: {
      vi: 'Quần đảo Cát Bà & Vịnh Lan Hạ',
      en: 'Cat Ba Archipelago & Lan Ha Bay',
    },
    summary: {
      vi: 'Hòn ngọc xanh vịnh Bắc Bộ với Vườn quốc gia Cát Bà và vịnh Lan Hạ êm ả nguyên sơ.',
      en: 'The green gem of the Gulf of Tonkin featuring Cat Ba National Park and tranquil Lan Ha Bay.',
    },
    categoryIds: ['beaches', 'nature'],
    coordinates: { latitude: 20.7274, longitude: 107.0544 },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Vịnh Lan Hạ nước xanh như ngọc bích và núi đá vôi', en: 'Emerald waters and karst islands of Lan Ha Bay' },
        sourceUrl: 'https://unsplash.com/photos/be436bb09401',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Thuyền buồm lướt trên vịnh Lan Hạ', en: 'Sailing boat drifting through Lan Ha Bay' },
        sourceUrl: 'https://unsplash.com/photos/20b4ea2c4220',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 10. Sơn La
  {
    id: 'dest-cao-nguyen-moc-chau',
    slug: 'cao-nguyen-moc-chau',
    provinceId: 'p-son-la',
    featured: false,
    name: {
      vi: 'Cao nguyên Mộc Châu',
      en: 'Moc Chau Plateau',
    },
    summary: {
      vi: 'Miền thảo nguyên xanh ngát của Tây Bắc với đồi chè trái tim, vườn mận trắng muốt và thác Dải Yếm.',
      en: 'Lush green plateau of the Northwest famous for heart-shaped tea hills, plum blossoms, and waterfalls.',
    },
    categoryIds: ['mountains', 'nature'],
    coordinates: { latitude: 20.8433, longitude: 104.6481 },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Đồi chè xanh ngát trên cao nguyên Mộc Châu', en: 'Lush green tea hills across Moc Chau Plateau' },
        sourceUrl: 'https://unsplash.com/photos/9374bd1c798e',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Thảo nguyên xanh mướt và núi đồi Tây Bắc', en: 'Rolling green terraces and hills in Northwest Vietnam' },
        sourceUrl: 'https://unsplash.com/photos/2972f65dfb3f',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 11. Điện Biên
  {
    id: 'dest-di-tich-dien-bien-phu',
    slug: 'di-tich-dien-bien-phu',
    provinceId: 'p-dien-bien',
    featured: false,
    name: {
      vi: 'Chiến trường Điện Biên Phủ',
      en: 'Dien Bien Phu Battlefield Relics',
    },
    summary: {
      vi: 'Quần thể di tích lịch sử lừng lẫy năm châu: Đồi A1, Hầm De Castries và Tượng đài Chiến thắng.',
      en: 'Historic site of the renowned victory: Hill A1, De Castries bunker, and the Victory Monument.',
    },
    categoryIds: ['heritage'],
    coordinates: { latitude: 21.3883, longitude: 103.0181 },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Thung lũng Điện Biên Phủ và đồi núi Tây Bắc', en: 'Dien Bien Phu valley and Northwest mountains' },
        sourceUrl: 'https://unsplash.com/photos/f978cf4d019e',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Cảnh sắc thung lũng Mường Thanh trù phú', en: 'Panoramic view over Muong Thanh valley' },
        sourceUrl: 'https://unsplash.com/photos/d7adac402bff',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 12. Quảng Trị
  {
    id: 'dest-dia-dao-vinh-moc',
    slug: 'dia-dao-vinh-moc',
    provinceId: 'p-quang-tri',
    featured: false,
    name: {
      vi: 'Địa đạo Vịnh Mốc & Vĩ tuyến 17',
      en: 'Vinh Moc Tunnels & The 17th Parallel',
    },
    summary: {
      vi: 'Công trình làng hầm kỳ vĩ trong lòng đất chứng nhân cho lòng quả cảm của người dân vùng giới tuyến.',
      en: 'Remarkable underground civilian tunnel village preserving heroic memories of the demarcation zone.',
    },
    categoryIds: ['heritage'],
    coordinates: { latitude: 17.0622, longitude: 107.1044 },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Cầu Hiền Lương bắc qua sông Bến Hải vĩ tuyến 17', en: 'Hien Luong Bridge on the 17th Parallel across Ben Hai River' },
        sourceUrl: 'https://unsplash.com/photos/20b4ea2c4220',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Di tích lịch sử đôi bờ Bến Hải', en: 'Historic monuments along the demarcation river' },
        sourceUrl: 'https://unsplash.com/photos/5b9627545d1a',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 13. Quảng Ngãi
  {
    id: 'dest-dao-ly-son',
    slug: 'dao-ly-son',
    provinceId: 'p-quang-ngai',
    featured: false,
    name: {
      vi: 'Đảo Lý Sơn',
      en: 'Ly Son Island',
    },
    summary: {
      vi: 'Hòn đảo núi lửa hàng triệu năm tuổi với cổng Tò Vò tự nhiên, trầm tích núi Thới Lới và vương quốc tỏi.',
      en: 'Ancient volcanic island featuring natural To Vo Gate, Thoi Loi crater, and renowned garlic farming.',
    },
    categoryIds: ['beaches', 'nature'],
    coordinates: { latitude: 15.3789, longitude: 109.1172 },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Biển xanh ngọc bích quanh đảo Lý Sơn', en: 'Turquoise ocean surrounding Ly Son volcanic island' },
        sourceUrl: 'https://unsplash.com/photos/b723cf961d3e',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Trầm tích đá núi lửa và cổng Tò Vò đảo Lý Sơn', en: 'Volcanic rock cliffs and natural stone arch on Ly Son Island' },
        sourceUrl: 'https://unsplash.com/photos/be436bb09401',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 14. Khánh Hòa
  {
    id: 'dest-vinh-nha-trang',
    slug: 'vinh-nha-trang',
    provinceId: 'p-khanh-hoa',
    featured: true,
    name: {
      vi: 'Vịnh Nha Trang',
      en: 'Nha Trang Bay',
    },
    summary: {
      vi: 'Một trong những vịnh biển nhiệt đới đẹp nhất hành tinh với bãi cát vàng mịn màng và rạn san hô phong phú.',
      en: 'One of the world’s most beautiful tropical bays boasting golden sandy shores and vibrant coral reefs.',
    },
    categoryIds: ['beaches'],
    coordinates: { latitude: 12.2388, longitude: 109.1967 },
    highlights: [
      { vi: 'Lặn ngắm rạn san hô Hòn Mun', en: 'Scuba diving among Hon Mun coral reefs' },
      { vi: 'Trải nghiệm cáp treo vượt biển ra VinWonders', en: 'Crossing the sea by cable car to VinWonders' },
    ],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Bãi biển thành phố Nha Trang', en: 'City beach along Nha Trang coastline' },
        sourceUrl: 'https://unsplash.com/photos/4be289fbecef',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 15. Khánh Hòa
  {
    id: 'dest-thap-ba-ponagar',
    slug: 'thap-ba-ponagar',
    provinceId: 'p-khanh-hoa',
    featured: false,
    name: {
      vi: 'Tháp Bà Ponagar',
      en: 'Po Nagar Cham Towers',
    },
    summary: {
      vi: 'Quần thể tháp Chăm pa cổ kính từ thế kỷ VIII tọa lạc uy nghiêm trên đồi Cù Lao nhìn ra cửa biển.',
      en: 'Ancient 8th-century Cham temple towers situated majestically on Cu Lao Hill overlooking the sea.',
    },
    categoryIds: ['heritage'],
    coordinates: { latitude: 12.2653, longitude: 109.1958 },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Tháp Bà Ponagar kiến trúc gạch nung Champa độc đáo', en: 'Po Nagar Cham Towers with unique terracotta brick masonry' },
        sourceUrl: 'https://unsplash.com/photos/58e3b4079ab2',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Quần thể tháp Chăm cổ kính trên đồi Cù Lao', en: 'Ancient towers standing atop Cu Lao hill' },
        sourceUrl: 'https://unsplash.com/photos/f72dcac9c60e',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 16. Lâm Đồng
  {
    id: 'dest-ho-xuan-huong-da-lat',
    slug: 'ho-xuan-huong-da-lat',
    provinceId: 'p-lam-dong',
    featured: true,
    name: {
      vi: 'Hồ Xuân Hương & Trung tâm Đà Lạt',
      en: 'Xuan Huong Lake & Da Lat Center',
    },
    summary: {
      vi: 'Trái tim thơ mộng của thành phố ngàn hoa với bờ hồ tĩnh lặng, quảng trường Lâm Viên và biệt thự Pháp cổ.',
      en: 'The poetic heart of the City of Eternal Spring with calm waters, Lam Vien Square, and French villas.',
    },
    categoryIds: ['mountains', 'urban'],
    coordinates: { latitude: 11.9404, longitude: 108.4377 },
    highlights: [
      { vi: 'Đạp xe quanh hồ ngắm rừng thông trong sương sớm', en: 'Cycling around the lake in early morning pine mist' },
      { vi: 'Khám phá chợ đêm Đà Lạt và ẩm thực cao nguyên', en: 'Exploring Da Lat Night Market and highland culinary treats' },
    ],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Hồ Xuân Hương Đà Lạt ban mai', en: 'Morning view of Xuan Huong Lake in Da Lat' },
        sourceUrl: 'https://unsplash.com/photos/46273834b3fb',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 17. Lâm Đồng
  {
    id: 'dest-thac-datanla',
    slug: 'thac-datanla',
    provinceId: 'p-lam-dong',
    featured: false,
    name: {
      vi: 'Thác Datanla',
      en: 'Datanla Waterfall',
    },
    summary: {
      vi: 'Thác nước tự nhiên tuyệt đẹp đổ qua nhiều thềm đá với hệ thống máng trượt xuyên rừng thông dài nhất châu Á.',
      en: 'Natural waterfall flowing over rock shelves with Asia’s longest alpine coaster through pine canopy.',
    },
    categoryIds: ['nature', 'mountains'],
    coordinates: { latitude: 11.9036, longitude: 108.4489 },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Dòng thác Datanla tung bọt trắng xóa giữa rừng thông', en: 'Cascading waters of Datanla Waterfall among pine forest' },
        sourceUrl: 'https://unsplash.com/photos/c60b0225b8f9',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Rừng nguyên sinh xanh mát quanh thác Datanla', en: 'Lush greenery surrounding the waterfall canyon' },
        sourceUrl: 'https://unsplash.com/photos/f77fbcfc3843',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 18. Đắk Lắk
  {
    id: 'dest-thac-dray-nur',
    slug: 'thac-dray-nur',
    provinceId: 'p-dak-lak',
    featured: false,
    name: {
      vi: 'Thác Dray Nur',
      en: 'Dray Nur Waterfall',
    },
    summary: {
      vi: 'Ngọn thác vợ hùng vĩ nhất Tây Nguyên trên dòng sông Sêrêpôk huyền thoại với màn nước đổ trắng xóa.',
      en: 'The most majestic waterfall in the Central Highlands on the legendary Serepok River.',
    },
    categoryIds: ['nature', 'mountains'],
    coordinates: { latitude: 12.5358, longitude: 107.8931 },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Màn nước thác Dray Nur đổ ầm vang giữa núi rừng', en: 'Thunderous cascading curtain of Dray Nur Waterfall' },
        sourceUrl: 'https://unsplash.com/photos/f77fbcfc3843',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Dòng sông Sêrêpôk cuồn cuộn qua ghềnh đá', en: 'Serepok River surging past volcanic basalt shelves' },
        sourceUrl: 'https://unsplash.com/photos/c60b0225b8f9',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 19. Gia Lai
  {
    id: 'dest-bien-ho-pleiku',
    slug: 'bien-ho-pleiku',
    provinceId: 'p-gia-lai',
    featured: false,
    name: {
      vi: 'Biển Hồ Pleiku (Hồ T’Nung)',
      en: 'Pleiku Sea Lake (T’Nung Lake)',
    },
    summary: {
      vi: 'Được mệnh danh là "Đôi mắt Pleiku", hồ nước ngọt hình thành trên miệng núi lửa đã tắt hàng triệu năm.',
      en: 'Nicknamed the "Eyes of Pleiku", a stunning freshwater lake resting in an extinct volcanic crater.',
    },
    categoryIds: ['nature', 'mountains'],
    coordinates: { latitude: 14.0506, longitude: 108.0006 },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Biển Hồ T’Nung phẳng lặng soi bóng thông xanh', en: 'Tranquil emerald waters of T’Nung volcanic lake' },
        sourceUrl: 'https://unsplash.com/photos/af3ef285b470',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Hàng thông cổ thụ dẫn lối vào Biển Hồ Pleiku', en: 'Century-old pine avenue leading into Pleiku Sea Lake' },
        sourceUrl: 'https://unsplash.com/photos/9374bd1c798e',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 20. Thành phố Hồ Chí Minh
  {
    id: 'dest-buu-dien-nha-tho-duc-ba',
    slug: 'buu-dien-nha-tho-duc-ba',
    provinceId: 'p-ho-chi-minh-city',
    featured: true,
    name: {
      vi: 'Bưu điện Trung tâm Sài Gòn & Nhà thờ Đức Bà',
      en: 'Saigon Central Post Office & Notre-Dame',
    },
    summary: {
      vi: 'Biểu tượng kiến trúc thuộc địa Pháp cổ điển hòa quyện giữa không gian đô thị sôi động của trung tâm Sài Gòn.',
      en: 'Iconic French colonial architectural landmarks standing gracefully in the bustling core of Saigon.',
    },
    categoryIds: ['heritage', 'urban'],
    coordinates: { latitude: 10.7798, longitude: 106.6999 },
    highlights: [
      { vi: 'Chiêm ngưỡng mái vòm thép của Gustave Eiffel tại Bưu điện', en: 'Marveling at Gustave Eiffel’s steel arched ceiling' },
      { vi: 'Trải nghiệm cà phê bệt công viên 30/4', en: 'Experiencing sidewalk coffee culture at April 30th Park' },
    ],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Mặt tiền Bưu điện Trung tâm TP. Hồ Chí Minh', en: 'Facade of the Saigon Central Post Office' },
        sourceUrl: 'https://unsplash.com/photos/4a69db38a482',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 21. Thành phố Hồ Chí Minh
  {
    id: 'dest-dia-dao-cu-chi',
    slug: 'dia-dao-cu-chi',
    provinceId: 'p-ho-chi-minh-city',
    featured: false,
    name: {
      vi: 'Địa đạo Củ Chi',
      en: 'Cu Chi Tunnels',
    },
    summary: {
      vi: 'Hệ thống phòng thủ ngầm dài hơn 250km được đào thủ công, biểu tượng cho sức sống kiên cường trong kháng chiến.',
      en: 'Massive 250km underground defense network hand-dug, standing as a testament to resilience in wartime.',
    },
    categoryIds: ['heritage'],
    coordinates: { latitude: 11.1419, longitude: 106.4628 },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Rừng cây xanh bao bọc khu di tích Địa đạo Củ Chi', en: 'Lush forest canopy sheltering Cu Chi Tunnels memorial' },
        sourceUrl: 'https://unsplash.com/photos/882707db888b',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Đường mòn xuyên rừng vùng căn cứ kháng chiến Củ Chi', en: 'Historic jungle trail through the resistance base' },
        sourceUrl: 'https://unsplash.com/photos/4542c06a5843',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 22. Tây Ninh
  {
    id: 'dest-nui-ba-den',
    slug: 'nui-ba-den',
    provinceId: 'p-tay-ninh',
    featured: false,
    name: {
      vi: 'Quần thể Núi Bà Đen',
      en: 'Ba Den Mountain Complex',
    },
    summary: {
      vi: 'Ngọn núi cao nhất Đông Nam Bộ (986m) với tượng Phật Bà bằng đồng cao nhất châu Á tọa lạc trên đỉnh.',
      en: 'Southern Vietnam’s highest peak (986m) crowned by Asia’s tallest bronze Bodhisattva statue.',
    },
    categoryIds: ['mountains', 'heritage'],
    coordinates: { latitude: 11.3769, longitude: 106.1683 },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Đỉnh Núi Bà Đen bồng bềnh giữa biển mây trắng', en: 'Ba Den mountain summit emerging above a sea of clouds' },
        sourceUrl: 'https://unsplash.com/photos/fed622ff2c3b',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Tượng Phật Bà Tây Bổ Đà Sơn uy nghiêm trên đỉnh núi', en: 'Reverent bronze Bodhisattva statue crowning the peak' },
        sourceUrl: 'https://unsplash.com/photos/58e3b4079ab2',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 23. Đồng Nai
  {
    id: 'dest-vuon-quoc-gia-cat-tien',
    slug: 'vuon-quoc-gia-cat-tien',
    provinceId: 'p-dong-nai',
    featured: false,
    name: {
      vi: 'Vườn quốc gia Cát Tiên',
      en: 'Cat Tien National Park',
    },
    summary: {
      vi: 'Khu dự trữ sinh quyển thế giới bảo tồn hệ sinh thái rừng nhiệt đới gió mùa phong phú bậc nhất phương Nam.',
      en: 'UNESCO World Biosphere Reserve safeguarding one of the richest tropical lowland rainforests in Vietnam.',
    },
    categoryIds: ['nature'],
    coordinates: { latitude: 11.4317, longitude: 107.4286 },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Cánh rừng nguyên sinh bạt ngàn tại Vườn quốc gia Cát Tiên', en: 'Primeval tropical canopy in Cat Tien National Park' },
        sourceUrl: 'https://unsplash.com/photos/882707db888b',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Bàu Sấu thanh bình với hệ sinh thái đất ngập nước', en: 'Serene Crocodile Lake wetland ecosystem' },
        sourceUrl: 'https://unsplash.com/photos/3b5ec3a7fe05',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 24. Cần Thơ
  {
    id: 'dest-cho-noi-cai-rang',
    slug: 'cho-noi-cai-rang',
    provinceId: 'p-can-tho',
    featured: true,
    name: {
      vi: 'Chợ nổi Cái Răng',
      en: 'Cai Rang Floating Market',
    },
    summary: {
      vi: 'Di sản văn hóa phi vật thể quốc gia, bức tranh sinh hoạt sông nước sống động với hàng trăm ghe thuyền buôn bán.',
      en: 'National Intangible Cultural Heritage showcasing lively river commerce with hundreds of vendor boats.',
    },
    categoryIds: ['heritage', 'urban'],
    coordinates: { latitude: 10.0051, longitude: 105.7469 },
    highlights: [
      { vi: 'Ăn hủ tiếu và uống cà phê sáng trên ghe bồng bềnh', en: 'Savoring hot noodles and morning coffee aboard wooden boats' },
      { vi: 'Tìm hiểu phong tục "cây bẹo" treo hàng độc đáo', en: 'Observing the unique "cay beo" marketing method of hanging goods' },
    ],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Thương hồ tấp nập ghe thuyền trên chợ nổi Cái Răng', en: 'Vendor boats gathering at Cai Rang Floating Market' },
        sourceUrl: 'https://unsplash.com/photos/07fb3b4ae5f1',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Ghe thuyền chở trái cây miền Tây sông nước', en: 'Wooden boats loaded with tropical fruits on Mekong delta' },
        sourceUrl: 'https://unsplash.com/photos/9040b037703b',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 25. An Giang
  {
    id: 'dest-rung-tram-tra-su',
    slug: 'rung-tram-tra-su',
    provinceId: 'p-an-giang',
    featured: false,
    name: {
      vi: 'Rừng tràm Trà Sư',
      en: 'Tra Su Cajuput Forest',
    },
    summary: {
      vi: 'Vương quốc chim nước vùng Thất Sơn với thảm bèo xanh mướt trải dài dưới tán rừng tràm cổ thụ.',
      en: 'Iconic wetland wildlife sanctuary in An Giang with endless green duckweed carpeting calm waters.',
    },
    categoryIds: ['nature'],
    coordinates: { latitude: 10.5186, longitude: 105.0489 },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Tắc ráng rẽ sóng thảm bèo xanh mướt rừng tràm Trà Sư', en: 'Motorboat cruising through emerald duckweed carpet in Tra Su forest' },
        sourceUrl: 'https://unsplash.com/photos/07fb3b4ae5f1',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Xuồng chèo ba lá len lỏi dưới tán tràm cổ thụ', en: 'Rowing sampan gliding silently beneath ancient cajuput canopy' },
        sourceUrl: 'https://unsplash.com/photos/9040b037703b',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 26. Đồng Tháp
  {
    id: 'dest-lang-hoa-sa-dec',
    slug: 'lang-hoa-sa-dec',
    provinceId: 'p-dong-thap',
    featured: false,
    name: {
      vi: 'Làng hoa kiểng Sa Đéc',
      en: 'Sa Dec Flower Village',
    },
    summary: {
      vi: 'Làng hoa truyền thống hơn 100 năm tuổi với nét độc đáo hoa được trồng trên giàn ngập nước.',
      en: 'Century-old flower village where ornamental blooms are grown uniquely on elevated wooden trellises.',
    },
    categoryIds: ['nature', 'heritage'],
    coordinates: { latitude: 10.3089, longitude: 105.7486 },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Muôn hoa khoe sắc rực rỡ tại làng hoa Sa Đéc', en: 'Brilliant floral blooms across Sa Dec nurseries' },
        sourceUrl: 'https://unsplash.com/photos/f00d5f5c8f07',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Ghe xuồng chăm sóc hoa trên giàn sông nước', en: 'Farmers navigating river channels to tend raised flower beds' },
        sourceUrl: 'https://unsplash.com/photos/6e24ef2386f9',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },

  // 27. Cà Mau
  {
    id: 'dest-mui-ca-mau',
    slug: 'mui-ca-mau',
    provinceId: 'p-ca-mau',
    featured: false,
    name: {
      vi: 'Vườn quốc gia Mũi Cà Mau',
      en: 'Mui Ca Mau National Park',
    },
    summary: {
      vi: 'Điểm cực Nam của Tổ quốc, nơi du khách có thể ngắm mặt trời mọc ở biển Đông và lặn ở biển Tây.',
      en: 'The southernmost tip of mainland Vietnam, where visitors can view both sunrise in the East and sunset in the West.',
    },
    categoryIds: ['nature', 'beaches'],
    coordinates: { latitude: 8.6186, longitude: 104.7214 },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Biển trời mênh mông nơi Mũi Cà Mau cực Nam', en: 'Vast ocean and horizon at Cape Ca Mau southernmost tip' },
        sourceUrl: 'https://unsplash.com/photos/b723cf961d3e',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
      {
        src: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?auto=format&fit=crop&w=1600&q=80',
        alt: { vi: 'Rừng đước ngập mặn vươn mình ra biển lớn', en: 'Mangrove forests expanding into the sea at Cape Ca Mau' },
        sourceUrl: 'https://unsplash.com/photos/20b4ea2c4220',
        photographer: 'Unsplash Verified Contributor',
        licenseName: 'Unsplash License',
        licenseUrl: 'https://unsplash.com/license',
        verifiedLocation: true,
      },
    ],
  },
];
