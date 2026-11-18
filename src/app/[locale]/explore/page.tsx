import { Compass, BookOpen, ShieldCheck } from 'lucide-react';
import { createPageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return createPageMetadata({
    locale,
    path: '/explore',
    title: locale === 'vi' ? 'Tôn chỉ Biên tập & Chuẩn mực Địa lý' : 'Editorial & Geographic Standards',
    description: locale === 'vi'
      ? 'Tìm hiểu tôn chỉ biên tập, chuẩn mực dữ liệu và nguồn ảnh của VietExplore.'
      : 'Learn about VietExplore’s editorial principles, data standards, and image provenance.',
  });
}

export default async function ExplorePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EC] text-[#194D42] text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Về VietExplore</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#202723] mb-4">
          Tôn chỉ Biên tập & Chuẩn mực Địa lý
        </h1>
        <p className="text-base text-[#5B665F] leading-relaxed max-w-2xl mx-auto">
          VietExplore hướng tới trải nghiệm du lịch thẩm mỹ, thanh lịch, dựa trên dữ liệu hành chính 34 tỉnh thành chính thức của Việt Nam.
        </p>
      </div>

      <div className="space-y-8">
        <section className="bg-white rounded-3xl border border-[#E2DDD5] p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#E8F0EC] text-[#194D42] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h2 className="font-serif text-xl font-bold text-[#202723]">
              Nguyên tắc trung thực dữ liệu
            </h2>
          </div>
          <p className="text-sm text-[#5B665F] leading-relaxed mb-3">
            Chúng tôi cam kết không sử dụng đánh giá giả mạo, không bịa đặt bảng giá dịch vụ hay số lượng danh thắng khi chưa được đối soát. Các địa danh lịch sử quen thuộc như Đà Lạt, Hội An, Phú Quốc, Phong Nha được giữ nguyên danh xưng truyền thống đồng thời gắn kết chuẩn xác với cơ cấu tỉnh thành hiện thời.
          </p>
        </section>

        <section id="sources" className="bg-white rounded-3xl border border-[#E2DDD5] p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#E8F0EC] text-[#194D42] flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <h2 className="font-serif text-xl font-bold text-[#202723]">
              Nguồn cấp ảnh & Giấy phép sử dụng
            </h2>
          </div>
          <p className="text-sm text-[#5B665F] leading-relaxed mb-3">
            Tất cả hình ảnh trên hệ thống được lựa chọn kỹ lưỡng từ các nền tảng mở uy tín (Pexels, Unsplash, Pixabay) tuân thủ giấy phép tự do thương mại và phi thương mại, kèm theo định danh tác giả và xuất xứ địa lý trung thực.
          </p>
        </section>
      </div>
    </div>
  );
}
