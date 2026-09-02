# CNS Typography & Editorial Design Rules

> Tài liệu quy chuẩn dành cho AI design/coding agent. Mục tiêu là tạo giao diện CNS mang tinh thần **editorial cao cấp + kỹ thuật hàng không**, lấy cảm hứng từ bố cục trong ảnh tham chiếu nhưng không sao chép nguyên mẫu.

## 1. Định hướng bắt buộc

- Cảm giác tổng thể: điềm tĩnh, có chiều sâu, thủ công, giàu khoảng thở; tránh giao diện SaaS/AI template phổ biến.
- Dùng serif display cho câu chuyện thương hiệu; sans-serif cho điều hướng và nội dung; monospace chỉ dành cho dữ liệu kỹ thuật.
- Không dùng một font cho toàn bộ trang.
- Không lạm dụng gradient, glassmorphism, glow, card bo tròn lớn hoặc heading sans-serif quá đậm.
- Ưu tiên nền xanh khoáng trầm, chữ ngà và một màu cam đất làm điểm nhấn.
- **Phong cách weight:** ưu tiên nhẹ nhàng, thanh lịch — tránh bold/black quá nhiều. Dùng `font-medium` (500) thay `font-bold` (700) trong hầu hết trường hợp.

## 2. Bộ font chuẩn

### 2.1. Font files (self-hosted, bản Việt hóa)

Tất cả font Cormorant Garamond đã được Việt hóa (bản **Gnosis**), đặt tại `src/fonts/`:

| File | Weight | Style |
|------|--------|-------|
| `CormorantGaramondGnosis-Light.ttf` | 300 | Normal |
| `CormorantGaramondGnosis-LightItalic.ttf` | 300 | Italic |
| `CormorantGaramondGnosis-Regular.ttf` | 400 | Normal |
| `CormorantGaramondGnosis-Italic.ttf` | 400 | Italic |
| `CormorantGaramondGnosis-Medium.ttf` | 500 | Normal |
| `CormorantGaramondGnosis-MediumItalic.ttf` | 500 | Italic |
| `CormorantGaramondGnosis-SemiBold.ttf` | 600 | Normal |
| `CormorantGaramondGnosis-SemiBoldItalic.ttf` | 600 | Italic |
| `CormorantGaramondGnosis-Bold.ttf` | 700 | Normal — **dự phòng, hạn chế sử dụng** |
| `CormorantGaramondGnosis-BoldItalic.ttf` | 700 | Italic — **dự phòng, hạn chế sử dụng** |
| `CormorantGaramondGnosis-Variable-Roman.ttf` | 300–700 | Variable font |
| `CormorantGaramondGnosis-Variable-Italic.ttf` | 300–700 | Variable font Italic |

### 2.2. Khai báo trong Next.js

Font được load qua `next/font/local` trong `src/app/layout.tsx`:

```tsx
// Serif display — Cormorant Garamond Gnosis (Việt hóa)
const cormorantGaramond = localFont({
  src: [
    { path: "../fonts/CormorantGaramondGnosis-Light.ttf", weight: "300", style: "normal" },
    { path: "../fonts/CormorantGaramondGnosis-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "../fonts/CormorantGaramondGnosis-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/CormorantGaramondGnosis-Italic.ttf", weight: "400", style: "italic" },
    { path: "../fonts/CormorantGaramondGnosis-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/CormorantGaramondGnosis-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "../fonts/CormorantGaramondGnosis-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/CormorantGaramondGnosis-SemiBoldItalic.ttf", weight: "600", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

// Sans-serif UI — Geist Sans (Google Fonts, next/font/google)
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

// Monospace data — Geist Mono (Google Fonts, next/font/google)
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
```

### 2.3. CSS Variables & Tailwind tokens

```css
/* globals.css */
@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --font-cormorant: var(--font-cormorant);
}
```

### 2.4. Ba vai trò font — Không ngoại lệ

| Vai trò | Font | CSS Variable | Tailwind class | Dùng cho |
|---------|------|-------------|----------------|----------|
| **Display** | Cormorant Garamond Gnosis | `var(--font-cormorant)` | `font-cormorant` | Hero title, section heading, brand name, slogan |
| **UI / Body** | Geist Sans | `var(--font-geist-sans)` | `font-sans` | Navigation, labels, buttons, body text, form |
| **Technical Data** | Geist Mono | `var(--font-geist-mono)` | `font-mono` | Tần số, tọa độ, status codes, metadata kỹ thuật |

Không được thay Geist Sans bằng Inter, Manrope, Montserrat hoặc Poppins.

## 3. Hệ phân cấp chữ

### 3.1. Tiêu đề chính — Hero Display

- Font: `font-cormorant`
- Size desktop: `clamp(64px, 7.2vw, 112px)`
- Size mobile: `clamp(48px, 14vw, 68px)`
- Weight: `400` (`font-normal`) — **không dùng bold/black**
- Line-height: `0.86–0.94`
- Letter-spacing: `-0.035em`
- Màu: `#EEE9DE`
- Chiều rộng tối đa: `8–11ch`
- Dùng 2–3 dòng có chủ đích; mỗi dòng là một nhịp nghĩa.
- Không viết toàn bộ bằng chữ hoa trong giao diện thật.
- Không thêm shadow, gradient chữ hoặc stroke.

Ví dụ:

```tsx
<h1 className="font-cormorant font-normal text-[clamp(64px,7.2vw,112px)] leading-[0.9] tracking-[-0.035em]">
  Công nghệ dẫn đường<br/>kết nối bầu trời
</h1>
```

### 3.2. Nhãn trên tiêu đề — Eyebrow/Kicker

- Font: `font-sans` (Geist Sans)
- Size desktop: `11–13px`; mobile: `10–11px`
- Weight: `500` (`font-medium`) — **không dùng 600/700**
- Transform: `uppercase`
- Letter-spacing: `0.20–0.28em`
- Line-height: `1.4`
- Màu: `rgba(238, 233, 222, 0.78)`
- Đặt cách hero title `24–32px`.
- Nội dung ngắn, tối đa khoảng 45 ký tự.

### 3.3. Tiêu đề section — Section Heading

- Font: `font-cormorant`
- Size desktop: `48–72px`; tablet: `40–56px`; mobile: `36–44px`
- Weight: `400` (`font-normal`)
- Line-height: `0.95–1.05`
- Letter-spacing: `-0.025em`
- Màu: `#EEE9DE` trên nền tối; `#24382F` trên nền sáng.
- Tối đa 2 dòng, rộng `10–16ch`.

### 3.4. Tiêu đề phụ / Slogan — Lead/Subheading

- Font: `font-cormorant` — weight `300` (`font-light`) hoặc `300 italic`
- Hoặc: `font-sans` (Geist Sans) — weight `400` (`font-normal`)
- Size desktop: `22–28px`; mobile: `18–22px`
- Line-height: `1.30–1.42`
- Letter-spacing: `-0.01em`
- Màu: `rgba(238, 233, 222, 0.92)`
- Rộng tối đa `28–34ch`.
- **Không dùng weight 600 trở lên.**

Ví dụ slogan serif nhẹ:

```tsx
<p className="font-cormorant font-light italic text-xl tracking-widest text-cyan-200/80">
  Sáng tạo và Thích nghi
</p>
```

### 3.5. Nội dung — Body Copy

- Font: `font-sans` (Geist Sans) — **không dùng serif cho body dài**
- Size desktop: `16–18px`; mobile: `15–17px`
- Weight: `400` (`font-normal`)
- Line-height: `1.55–1.70`
- Letter-spacing: `0`
- Màu: `rgba(238, 233, 222, 0.76)`
- Độ dài dòng: `52–68ch`, lý tưởng khoảng `60ch`.
- Khoảng cách giữa các đoạn: `0.8–1em`.

### 3.6. Điều hướng — Navigation

- Font: `font-sans` (Geist Sans)
- Size: `13–15px`
- Weight: `500` (`font-medium`) — **không bold**
- Line-height: `1`
- Letter-spacing: `0.01–0.03em`
- Không viết hoa toàn bộ.
- Khoảng cách giữa mục desktop: `28–40px`.
- Trạng thái active dùng màu/đường gạch mảnh, không dùng bold quá mạnh.

### 3.7. Nút — Button/CTA

- Font: `font-sans` (Geist Sans)
- Size: `13–15px`
- Weight: `500` (`font-medium`) — **không bold**
- Letter-spacing: `0.01em`
- Line-height: `1`
- Chiều cao: `44–50px`
- Padding ngang: `20–28px`
- Border-radius: `6–10px`, không dùng pill trừ navigation capsule.
- Primary: nền cam đất `#C75A38`, chữ `#FFF8EE`.
- Secondary: nền trong suốt, viền `rgba(238,233,222,.38)`.
- Icon mũi tên cách chữ `10–14px`.

### 3.8. Dữ liệu kỹ thuật — Telemetry/Metadata

- Font: `font-mono` (Geist Mono)
- Size: `12–14px`
- Weight: `400` (`font-normal`) hoặc `500` (`font-medium`)
- Line-height: `1.4`
- Letter-spacing: `0.04–0.08em`
- Màu: `rgba(238, 233, 222, 0.68)`
- Có thể viết hoa cho status ngắn: `OPERATIONAL`, `VOR/DME`, `113.00 MHz`.
- Không dùng monospace cho đoạn văn thường.
- **Không dùng `font-bold` cho mono tags** — dùng `font-medium` nếu cần nhấn.

### 3.9. Chú thích — Caption/Footnote

- Font: `font-sans` (Geist Sans)
- Size: `11–13px`
- Weight: `400` (`font-normal`)
- Line-height: `1.45`
- Letter-spacing: `0.02em`
- Màu: `rgba(238, 233, 222, 0.58)`

### 3.10. Brand Name — Tên thương hiệu

- Font: `font-cormorant`
- Weight: `500` (`font-medium`) — thanh lịch, không quá đậm
- Size: tùy vị trí — header `text-xl`, hero `text-3xl`
- Tracking: `tracking-wide`
- Không dùng `font-black` hoặc `font-extrabold` cho brand.

## 4. Quy tắc weight — Phong cách nhẹ nhàng

> **Nguyên tắc vàng:** Phân cấp bằng kích thước, font family và khoảng trắng — không phải bằng độ đậm.

| Weight | Tailwind class | Vai trò | Giới hạn sử dụng |
|--------|---------------|---------|-------------------|
| `300` | `font-light` | Slogan, subtitle, nội dung nhẹ (chỉ Cormorant) | ✅ Dùng thoải mái |
| `400` | `font-normal` | Hero title, section heading, body text | ✅ Weight mặc định |
| `500` | `font-medium` | Eyebrow, nav, button, brand, nhấn nhẹ | ✅ Thay thế bold |
| `600` | `font-semibold` | Hub label, badge quan trọng | ⚠️ Hạn chế — chỉ khi cần nổi bật rõ |
| `700` | `font-bold` | **Hầu như không dùng** | 🚫 Chỉ dùng cho trường hợp đặc biệt |
| `800–900` | `font-extrabold/black` | **Cấm sử dụng** | 🚫 Không bao giờ |

## 5. Tỷ lệ khoảng cách

Dùng hệ `8px`, với các token chính:

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
  --space-32: 128px;
}
```

- Padding ngang trang desktop: `clamp(32px, 5.5vw, 96px)`.
- Padding ngang mobile: `20–24px`.
- Khoảng cách giữa các section: desktop `112–160px`; mobile `72–96px`.
- Hero content căn trái, đặt gần 1/3 chiều ngang; không căn giữa mặc định.
- Duy trì nhiều khoảng trống; không nhét mọi nội dung vào card.

## 6. Màu và chất liệu hỗ trợ typography

```css
:root {
  --bg-deep: #24382F;
  --bg-mineral: #3F554A;
  --text-primary: #EEE9DE;
  --text-muted: rgba(238, 233, 222, 0.72);
  --accent-earth: #C75A38;
  --line-subtle: rgba(238, 233, 222, 0.20);
}
```

- Ảnh nền phải được phủ overlay xanh tối đủ để chữ đạt contrast tối thiểu 4.5:1 đối với body.
- Có thể thêm grain rất nhẹ `2–4%`, không làm giảm khả năng đọc.
- Accent chỉ chiếm khoảng `5–10%` diện tích thị giác.

## 7. Quy tắc responsive

- Không scale mọi thứ theo cùng một tỷ lệ; giữ body gần như ổn định, chỉ giảm mạnh display heading.
- Dưới `768px`, hero chuyển thành một cột; ảnh đặt sau hoặc dưới nội dung.
- Hero title mobile không vượt quá 3 dòng và không nhỏ hơn `44px`.
- Navigation desktop chuyển thành menu gọn; không ép toàn bộ mục lên một hàng nhỏ.
- Button mobile cao tối thiểu `44px` để dễ chạm.
- Monospace metadata có thể xuống dòng theo cụm, không cắt giữa giá trị và đơn vị.

## 8. Những điều AI agent không được làm

- Không dùng combo `Geist/Inter + gradient tím xanh + card radius 24px`.
- Không biến mọi section thành lưới card.
- Không dùng quá 3 họ font.
- Không dùng serif cho body dài hoặc form.
- Không dùng monospace như một hiệu ứng trang trí tràn lan.
- **Không đặt heading weight 700/800/900; phong cách này dựa vào tỷ lệ, font-family, tương phản và khoảng trắng — không dựa vào độ đậm.**
- Không dùng `font-bold` hoặc `font-black` cho labels, buttons, nav items.
- Không dùng chữ xám quá nhạt trên ảnh nền phức tạp.
- Không sao chép chiếc chum, nội dung hay thương hiệu trong ảnh gốc; chỉ kế thừa quy luật thị giác.
- **Không load Cormorant Garamond từ Google Fonts CDN** — luôn dùng bản Gnosis Việt hóa self-hosted.

## 9. CSS mẫu tối thiểu (Tailwind class)

```tsx
{/* Hero Title — serif display, nhẹ nhàng */}
<h1 className="font-cormorant font-normal text-[clamp(64px,7.2vw,112px)] leading-[0.9] tracking-[-0.035em] max-w-[10ch]">
  Công nghệ dẫn đường<br/>kết nối bầu trời
</h1>

{/* Eyebrow — sans-serif, medium weight */}
<span className="font-sans font-medium text-xs uppercase tracking-[0.24em] leading-relaxed">
  TRUNG TÂM BẢO ĐẢM KỸ THUẬT
</span>

{/* Slogan — serif light italic */}
<p className="font-cormorant font-light italic text-lg tracking-widest">
  Sáng tạo và Thích nghi
</p>

{/* Body copy — sans-serif, normal weight */}
<p className="font-sans font-normal text-base leading-relaxed max-w-[60ch]">
  Nội dung mô tả...
</p>

{/* Brand name — serif medium */}
<span className="font-cormorant font-medium text-xl tracking-wide">
  ATTECH
</span>

{/* Technical data — mono, medium weight (không bold) */}
<span className="font-mono font-medium text-xs tracking-wider uppercase">
  VOR/DME · 113.00 MHz · OPERATIONAL
</span>

{/* Button — sans-serif, medium weight (không bold) */}
<button className="font-sans font-medium text-sm tracking-wide">
  Kiểm tra danh mục
</button>
```

## 10. Prompt giao việc cho AI design agent

```text
Thiết kế website CNS theo quy chuẩn trong file này.

Mục tiêu thị giác: editorial cao cấp kết hợp kỹ thuật hàng không; yên tĩnh, có chiều sâu, nhiều khoảng thở và không mang cảm giác SaaS/AI template.

Bắt buộc:
1. Cormorant Garamond Gnosis (Việt hóa, self-hosted từ src/fonts/) cho display heading, Geist Sans cho UI/body, Geist Mono cho dữ liệu kỹ thuật.
2. Tuân thủ đúng type scale, line-height, letter-spacing, line length và responsive rules trong tài liệu.
3. Dùng nền xanh khoáng trầm, chữ ngà, cam đất làm accent có kiểm soát.
4. Hero căn trái, serif lớn 2–3 dòng; eyebrow nhỏ uppercase; metadata kỹ thuật bằng mono.
5. Kiểm tra contrast, font loading, tiếng Việt và bố cục tại 375px, 768px, 1440px.
6. Không sao chép nội dung/đồ vật từ ảnh tham chiếu; chỉ áp dụng hệ thống thiết kế.
7. Phong cách weight nhẹ nhàng — ưu tiên font-normal (400) và font-medium (500), hạn chế tối đa font-bold (700) trở lên.

Trước khi code, hãy xuất:
- danh sách typography tokens;
- wireframe từng section;
- quyết định responsive;
- các component sẽ tạo.
Sau đó mới triển khai giao diện.
```

## 11. Checklist nghiệm thu

- [ ] Font Cormorant Garamond Gnosis (Việt hóa) load từ `src/fonts/`, không từ Google Fonts CDN.
- [ ] Font tiếng Việt hiển thị đúng dấu và không fallback ngoài ý muốn.
- [ ] Chỉ dùng đúng 3 vai trò font: display (`font-cormorant`), UI/body (`font-sans`), technical data (`font-mono`).
- [ ] Hero title có line-height chặt nhưng dấu tiếng Việt không bị cắt.
- [ ] Body đạt line length 52–68 ký tự và contrast tối thiểu 4.5:1.
- [ ] **Không có heading weight 700 trở lên** — mọi heading dùng 400–600.
- [ ] **Không có button/label/nav dùng font-bold** — dùng font-medium.
- [ ] Không lạm dụng card, gradient, glow và pill.
- [ ] Bố cục đã kiểm tra ở 375px, 768px và 1440px.
- [ ] CTA chính nổi bật nhưng accent không vượt quá 10% thị giác.
- [ ] Dữ liệu tần số/trạng thái/toạ độ dùng monospace nhất quán.
- [ ] Tổng thể vẫn mang tính kỹ thuật CNS nhưng có chất editorial riêng.

---

**Quy tắc ưu tiên khi có xung đột:** khả năng đọc → phân cấp nội dung → responsive → thẩm mỹ. Không hy sinh khả năng đọc chỉ để giống ảnh tham chiếu.
