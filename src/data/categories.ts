import { Category } from '@/types/content';

export const categories: Category[] = [
  {
    id: 'beaches',
    slug: 'beaches',
    name: {
      vi: 'Biển đảo & Vịnh biển',
      en: 'Coastal & Islands',
    },
    description: {
      vi: 'Khám phá các bờ biển nhiệt đới, vịnh biển kỳ vĩ và những hòn đảo nguyên sơ của Việt Nam.',
      en: 'Discover tropical coastlines, majestic bays, and pristine islands of Vietnam.',
    },
    iconName: 'Waves',
  },
  {
    id: 'mountains',
    slug: 'mountains',
    name: {
      vi: 'Núi non & Cao nguyên',
      en: 'Mountains & Highlands',
    },
    description: {
      vi: 'Chinh phục những dãy núi hùng vĩ, thung lũng mờ sương và cao nguyên trập trùng.',
      en: 'Conquer majestic mountain peaks, misty valleys, and rolling highlands.',
    },
    iconName: 'Mountain',
  },
  {
    id: 'heritage',
    slug: 'heritage',
    name: {
      vi: 'Di sản & Văn hóa',
      en: 'Heritage & Culture',
    },
    description: {
      vi: 'Tìm về ngàn năm văn hiến, di sản thế giới UNESCO và kiến trúc cổ kính.',
      en: 'Explore millennia of heritage, UNESCO World Heritage sites, and ancient architecture.',
    },
    iconName: 'Landmark',
  },
  {
    id: 'nature',
    slug: 'nature',
    name: {
      vi: 'Sinh thái & Rừng quốc gia',
      en: 'Nature & National Parks',
    },
    description: {
      vi: 'Đắm mình trong rừng nguyên sinh, hệ sinh thái đất ngập nước và vườn quốc gia.',
      en: 'Immerse in primeval forests, wetland ecosystems, and rich national parks.',
    },
    iconName: 'Trees',
  },
  {
    id: 'urban',
    slug: 'urban',
    name: {
      vi: 'Đô thị & Nhịp sống',
      en: 'Urban & City Escapes',
    },
    description: {
      vi: 'Trải nghiệm không gian đô thị sôi động, ẩm thực đường phố và phong cách sống đương đại.',
      en: 'Experience vibrant urban hubs, street food culture, and contemporary lifestyles.',
    },
    iconName: 'Building2',
  },
];
