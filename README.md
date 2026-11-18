# VietExplore — Dấu Chân Việt (MVP)

## Editorial workspace

The application includes Supabase email/password sign-in, an admin-only post manager, and a responsive block editor with draft/publish workflows. Published stories appear in the bilingual journal at `/vi/blog` and `/en/blog`.

Follow [the Supabase setup guide](docs/admin-blog/SETUP.md) to apply the database/storage migration, set `.env.local`, and provision an administrator. The [product specification](docs/admin-blog/PRODUCT.md) and [technical specification](docs/admin-blog/TECH.md) describe the feature and its access boundaries. Without backend configuration the public travel guide remains available and sign-in displays an unavailable state.

> **Cẩm nang du lịch biên soạn tinh tế, chất lượng tạp chí trên 34 đơn vị hành chính mới của Việt Nam.**  
> *An editorial travel discovery website covering Vietnam's 34 newly organized provinces and centrally governed cities.*

---

## 🌟 Tính năng nổi bật (Features)

- **Chuẩn mực địa lý 2025**: Tích hợp danh mục chính xác **34 tỉnh và thành phố** (6 thành phố trực thuộc Trung ương và 28 tỉnh theo Nghị quyết sắp xếp đơn vị hành chính).
- **Song ngữ hoàn chỉnh (vi / en)**: Hỗ trợ tự động phân tích ngôn ngữ trình duyệt theo trọng số chất lượng `q=` qua `src/proxy.ts`, ghi nhớ cookie và giữ nguyên URL query params khi chuyển đổi ngôn ngữ.
- **Tìm kiếm tiếng Việt không dấu thông minh**: Thuật toán bóc tách dấu tổ hợp (NFD) chuẩn hóa toàn diện cả chữ `đ/Đ` -> `d/D`.
- **Bộ lọc Facet đa năng**: Lọc tức thì theo khu vực (Bắc - Trung - Nam), theo danh mục trải nghiệm và theo từng tỉnh thành.
- **Minh bạch hình ảnh & nguồn gốc**: Tất cả điểm đến có thông tin giấy phép mở (Unsplash License), tọa độ địa lý kiểm chứng, cùng hệ thống ảnh dự phòng (`ImageWithFallback`).
- **Giao diện đẳng cấp biên tập (Editorial Travel)**: Thiết kế tông màu ấm áp tự nhiên (Forest Green `#194D42`, Terracotta `#C87956`, Warm Cream `#F8F7F3`), đạt chuẩn a11y và mượt mà trên di động.

---

## 🚀 Cài đặt & Chạy cục bộ (Local Development)

> [!IMPORTANT]
> Dự án **chỉ sử dụng duy nhất `pnpm`**. Tuyệt đối không dùng `npm`, `npx` hoặc `yarn`.

### 1. Yêu cầu hệ thống
- Node.js >= 20.x (Khuyến nghị Node.js 22+)
- `pnpm` >= 10.x (hoặc `12.x`)

### 2. Cài đặt dependencies
```bash
pnpm install
```

### 3. Khởi động môi trường phát triển (Dev server)
```bash
pnpm dev
```
Truy cập ứng dụng tại: `http://localhost:3000`

### 4. Chạy kiểm thử tự động (Unit & Integration Tests)
```bash
pnpm test
```

### 5. Kiểm tra chất lượng mã nguồn (Linter)
```bash
pnpm lint
```

### 6. Build bản sản xuất (Production Build)
```bash
pnpm build
```

---

## ☁️ Hướng dẫn Deploy lên Vercel (Vercel Deployment)

1. Đẩy mã nguồn lên kho chứa GitHub / GitLab.
2. Đăng nhập vào [Vercel](https://vercel.com) và chọn **Add New Project**.
3. Chọn repository và cấu hình:
   - **Framework Preset**: `Next.js`
   - **Package Manager**: Tự động phát hiện `pnpm` qua `pnpm-lock.yaml`.
   - **Build Command**: `pnpm build`
   - **Environment Variables**: Không yêu cầu biến môi trường cho bản MVP này.
4. Bấm **Deploy**.

---

## 📁 Cấu trúc thư mục (Project Structure)

```text
├── docs/                       # Tài liệu PRD, nguồn ảnh và ghi chú triển khai
│   ├── ai-build-prompt.md
│   ├── image-sources.md
│   └── implementation-notes.md
├── messages/                   # Từ điển giao diện next-intl
│   ├── en.json
│   └── vi.json
├── src/
│   ├── app/
│   │   ├── [locale]/           # Dynamic locale routes (App Router)
│   │   │   ├── destinations/   # Danh bạ điểm đến & trang chi tiết
│   │   │   ├── provinces/      # 34 tỉnh thành & trang chi tiết
│   │   │   ├── explore/        # Trang tôn chỉ & bản quyền
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── not-found.tsx
│   │   ├── globals.css         # Tailwind v4 theme & design tokens
│   │   ├── robots.ts           # Cấu hình crawler
│   │   └── sitemap.ts          # Sitemap tự động cho 133+ trang
│   ├── components/             # UI, Layout và các khối tính năng
│   │   ├── destinations/
│   │   ├── provinces/
│   │   ├── layout/
│   │   └── ui/
│   ├── data/                   # Typed local fixtures
│   │   ├── categories.ts
│   │   ├── destinations.ts
│   │   ├── provinces.ts
│   │   └── repositories/       # Tầng truy xuất dữ liệu độc lập
│   ├── i18n/                   # Cấu hình routing & request next-intl
│   ├── lib/                    # Utilities & thuật toán chuẩn hóa dấu tiếng Việt
│   ├── types/                  # TypeScript interface definitions
│   └── proxy.ts                # Next.js Proxy định tuyến ngôn ngữ
├── tests/                      # Bộ kiểm thử Vitest
│   ├── setup.ts
│   └── unit/
├── pnpm-workspace.yaml         # Cấu hình allowBuilds an toàn cho pnpm v12
└── package.json
```

---

## 📜 Giấy phép & Bản quyền
- Mã nguồn được phân phối dưới giấy phép MIT.
- Dữ liệu địa danh và trích lục ảnh được cấp phép công khai theo giấy phép Unsplash License.
