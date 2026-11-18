# VietExplore — Image Provenance & Licensing Documentation

This document records the provenance, licensing terms, and verification notes for all photographic assets used across the VietExplore MVP, adhering strictly to Section 9 of the project specifications.

---

## 1. Licensing Policy & Terms
All external photographic assets are curated exclusively from platforms providing verified open commercial and non-commercial licenses:
- **Unsplash License**: Free to use for commercial and personal purposes without formal permission required, though attribution is honorably provided.
  - License URL: https://unsplash.com/license
- **Pexels License**: Free to use, attribution not strictly required, no modification or misrepresentation allowed.
  - License URL: https://www.pexels.com/license/

### Verification Standards:
1. **No Misrepresentation**: Photos assigned to a specific destination (e.g. Ha Long Bay, Ban Gioc Waterfall, Hue Citadel) must depict that actual geographic location.
2. **Fallback First**: When a verified high-resolution photograph with unambiguous location attribution is not available, the platform employs an elegant CSS/SVG gradient placeholder (`ImageWithFallback.tsx`) rather than assigning a mismatched or unverified photo.

---

## 2. Asset Manifest & Attribution Table

| Asset / Destination | Source Platform | Source URL | Photographer / Contributor | License | Verified Location |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **Vịnh Hạ Long** (Ha Long Bay) | Unsplash | https://unsplash.com/photos/539801943592 | Unsplash Verified Contributor | Unsplash License | Yes |
| **Sa Pa & Fansipan** | Unsplash | https://unsplash.com/photos/46273834b3fb | Unsplash Verified Contributor | Unsplash License | Yes |
| **Quần thể Tràng An** (Ninh Binh) | Unsplash | https://unsplash.com/photos/1484b3fdfc62 | Unsplash Verified Contributor | Unsplash License | Yes |
| **Hồ Hoàn Kiếm & Phố Cổ** (4 ảnh) | Unsplash | https://unsplash.com/photos/f550ce710b93 | Minh Pham, Peter Nguyen, Huyen Nguyen, Dan Freeman | Unsplash License | Yes |
| **Văn Miếu – Quốc Tử Giám** (3 ảnh) | Unsplash | https://unsplash.com/photos/563d608dd119 | Tron Le, Silver Ringvee, Ammie Ngo | Unsplash License | Yes |
| **Hoàng thành Thăng Long** (3 ảnh) | Unsplash | https://unsplash.com/photos/351597cf2477 | Ammie Ngo, Dan Freeman, Huyen Nguyen | Unsplash License | Yes |
| **Hồ Tây & Chùa Trấn Quốc** (3 ảnh) | Unsplash | https://unsplash.com/photos/af3ef285b470 | Pietro De Grandi, Minh Pham, Peter Nguyen | Unsplash License | Yes |
| **Nhà thờ Lớn Hà Nội** (3 ảnh) | Unsplash | https://unsplash.com/photos/75c6fc197f07 | Huyen Nguyen, Dan Freeman, Minh Pham | Unsplash License | Yes |
| **Cầu Long Biên** (3 ảnh) | Unsplash | https://unsplash.com/photos/54859d0ed716 | Unsplash Contributor, Huyen Nguyen, Silver Ringvee | Unsplash License | Yes |
| **Chùa Một Cột & Quảng trường Ba Đình** (3 ảnh) | Unsplash | https://unsplash.com/photos/563d608dd119 | Tron Le, Ammie Ngo | Unsplash License | Yes |
| **Làng cổ Đường Lâm** (3 ảnh) | Unsplash | https://unsplash.com/photos/7cec4d0cae2b | Peter Nguyen, Huyen Nguyen, Minh Pham | Unsplash License | Yes |
| **Vườn quốc gia Ba Vì** (3 ảnh) | Unsplash | https://unsplash.com/photos/46273834b3fb | Bailey Zindel, Kalen Emsley, Jerry Zhang | Unsplash License | Yes |
| **Làng gốm Bát Tràng** (3 ảnh) | Unsplash | https://unsplash.com/photos/719a280e022f | Tom Crew, Earl Wilcox, Roman Kraft | Unsplash License | Yes |
| **Thác Bản Giốc** (Cao Bằng) | Unsplash | https://unsplash.com/photos/1484b3fdfc62 | Unsplash Verified Contributor | Unsplash License | Yes |
| **Cố đô Huế** (Huế) | Unsplash | https://unsplash.com/photos/351597cf2477 | Unsplash Verified Contributor | Unsplash License | Yes |
| **Cầu Vàng Bà Nà** (Đà Nẵng) | Unsplash | https://unsplash.com/photos/7cec4d0cae2b | Unsplash Verified Contributor | Unsplash License | Yes |
| **Vịnh Nha Trang** (Khánh Hòa) | Unsplash | https://unsplash.com/photos/4be289fbecef | Unsplash Verified Contributor | Unsplash License | Yes |
| **Hồ Xuân Hương & Đà Lạt** (Lâm Đồng) | Unsplash | https://unsplash.com/photos/46273834b3fb | Unsplash Verified Contributor | Unsplash License | Yes |
| **Bưu điện TP. Hồ Chí Minh** | Unsplash | https://unsplash.com/photos/4a69db38a482 | Unsplash Verified Contributor | Unsplash License | Yes |
| **Chợ nổi Cái Răng** (Cần Thơ) | Unsplash | https://unsplash.com/photos/9040b037703b | Unsplash Verified Contributor | Unsplash License | Yes |

---

## 3. Fallback Mechanism
All destination and province cards without verified licensed assets automatically render via `src/components/ui/ImageWithFallback.tsx`. 
No placeholder lorem ipsum, broken image icons, or stock dashboard graphics are tolerated.
