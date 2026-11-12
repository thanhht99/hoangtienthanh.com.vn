/**
 * FILE CẤU HÌNH DỮ LIỆU TRANG WEB CÁ NHÂN "QTD 267"
 * -------------------------------------------------
 * Bạn có thể dễ dàng thêm, sửa, xóa bài viết (posts) hoặc công cụ (tools)
 * trực tiếp tại file này mà không cần sửa code giao diện.
 */

export const SITE_CONFIG = {
  brandName: "QTD 267",
  shortName: "267",
  logoUrl: "/logo.png",
  tagline: "Không gian lưu trữ bài viết, kiến thức công nghệ & bộ công cụ tiện ích cá nhân.",
  heroBadge: "Personal Digital Hub • QTD 267",
  author: {
    name: "QTD 267",
    role: "Developer & Tech Enthusiast",
    location: "Việt Nam",
    email: "contact@qtd267.dev",
    github: "https://github.com",
    facebook: "https://facebook.com",
  },
};

/**
 * DANH SÁCH CÁC CÔNG CỤ (TOOLS)
 * - type: "interactive" -> Tool tích hợp chạy trực tiếp ngay trên trang web (dựa theo toolKey)
 * - type: "external"    -> Tool dẫn link ra trang web bên ngoài (dựa theo url)
 */
export const TOOLS_DATA = [
  {
    id: "tool-json",
    title: "JSON Formatter & Validator",
    description: "Làm đẹp (Prettify), nén (Minify) và kiểm tra lỗi cú pháp JSON nhanh chóng ngay trên trình duyệt.",
    category: "Tích hợp sẵn",
    type: "interactive",
    toolKey: "json-formatter",
    icon: "Braces",
    badge: "Chạy ngay",
    featured: true,
    tags: ["JSON", "DevTools", "Format"],
  },
  {
    id: "tool-base64",
    title: "Base64 & URL Encoder / Decoder",
    description: "Mã hóa và giải mã chuỗi văn bản tiếng Việt (UTF-8) sang Base64 hoặc URL Encode an toàn.",
    category: "Tích hợp sẵn",
    type: "interactive",
    toolKey: "encoder",
    icon: "Binary",
    badge: "Chạy ngay",
    featured: true,
    tags: ["Base64", "URL", "Encode"],
  },
  {
    id: "tool-word-counter",
    title: "Đếm Từ & Chuyển Đổi Văn Bản",
    description: "Thống kê số từ, ký tự, dòng, thời gian đọc và chuyển đổi chữ HOA, chữ thường, tạo Slug URL.",
    category: "Tích hợp sẵn",
    type: "interactive",
    toolKey: "text-analyzer",
    icon: "FileText",
    badge: "Chạy ngay",
    featured: true,
    tags: ["Text", "Slug", "Word Count"],
  },
  {
    id: "tool-password-uuid",
    title: "Tạo Mật Khẩu Mạnh & UUID v4",
    description: "Sinh mật khẩu bảo mật cao tùy chỉnh độ dài, ký tự đặc biệt và tạo danh sách mã UUID v4 ngẫu nhiên.",
    category: "Tích hợp sẵn",
    type: "interactive",
    toolKey: "generator",
    icon: "KeyRound",
    badge: "Chạy ngay",
    featured: false,
    tags: ["Security", "Password", "UUID"],
  },
  {
    id: "tool-qrcode",
    title: "Tạo Mã QR Nhanh (QR Generator)",
    description: "Tạo mã QR Code sắc nét từ đường dẫn URL, văn bản hoặc thông tin liên hệ chỉ trong 1 giây.",
    category: "Tích hợp sẵn",
    type: "interactive",
    toolKey: "qrcode",
    icon: "QrCode",
    badge: "Chạy ngay",
    featured: true,
    tags: ["QR Code", "Utility", "Share"],
  },
  {
    id: "tool-timestamp",
    title: "Chuyển Đổi Unix Timestamp",
    description: "Đổi qua lại giữa Unix Epoch Timestamp (giây/mili-giây) và định dạng ngày giờ Việt Nam / ISO 8601.",
    category: "Tích hợp sẵn",
    type: "interactive",
    toolKey: "timestamp",
    icon: "Clock",
    badge: "Chạy ngay",
    featured: false,
    tags: ["Time", "Epoch", "Date"],
  },
  {
    id: "tool-regex101",
    title: "Regex101 — Kiểm Thử Biểu Thức Chính Quy",
    description: "Công cụ kiểm tra, giải thích chi tiết và debug Regular Expression trực quan cho JS, Python, Go, PHP.",
    category: "Dev & Code",
    type: "external",
    url: "https://regex101.com/",
    icon: "Code2",
    badge: "Link ngoài",
    featured: false,
    tags: ["Regex", "Debug", "Web"],
  },
  {
    id: "tool-excalidraw",
    title: "Excalidraw — Bảng Vẽ Sơ Đồ Hệ Thống",
    description: "Bảng trắng trực tuyến vẽ sơ đồ kiến trúc, luồng dữ liệu và wireframe theo phong cách vẽ tay cực đẹp.",
    category: "Thiết kế & Media",
    type: "external",
    url: "https://excalidraw.com/",
    icon: "PenTool",
    badge: "Link ngoài",
    featured: true,
    tags: ["Diagram", "Whiteboard", "Design"],
  },
  {
    id: "tool-squoosh",
    title: "Squoosh — Nén & Tối Ưu Hóa Hình Ảnh",
    description: "Ứng dụng nén ảnh WebP, AVIF, PNG chất lượng cao của Google Chrome Labs chạy hoàn toàn локаl.",
    category: "Thiết kế & Media",
    type: "external",
    url: "https://squoosh.app/",
    icon: "Image",
    badge: "Link ngoài",
    featured: false,
    tags: ["Image", "Compress", "WebP"],
  },
  {
    id: "tool-it-tools",
    title: "IT-Tools — Bộ Sưu Tập Tiện Ích Cho Dev",
    description: "Tổng hợp hàng chục công cụ nhỏ gọn hữu ích dành cho lập trình viên và quản trị viên hệ thống.",
    category: "Dev & Code",
    type: "external",
    url: "https://it-tools.tech/",
    icon: "Wrench",
    badge: "Link ngoài",
    featured: false,
    tags: ["DevOps", "Toolkit", "OpenSource"],
  },
];

/**
 * DANH SÁCH CÁC BÀI VIẾT (POSTS)
 */
export const POSTS_DATA = [
  {
    id: "post-welcome-267",
    title: "Chào mừng đến với QTD 267 — Ngôi nhà số & Bộ công cụ cá nhân",
    excerpt: "Lý do mình xây dựng trang web QTD 267: một nơi tập trung các ghi chú kỹ thuật, bài viết chia sẻ kinh nghiệm và những công cụ mình sử dụng hàng ngày.",
    category: "Góc cá nhân",
    date: "04/11/2026",
    readTime: "3 phút đọc",
    featured: true,
    tags: ["QTD267", "Personal Web", "Productivity"],
    content: `
### Tại sao lại là QTD 267?

Khi làm việc với hàng chục dự án và công cụ mỗi ngày, mình nhận ra việc lưu trữ rải rác trên nhiều nền tảng khiến việc tìm lại một đoạn snippet hay mở nhanh một công cụ tốn khá nhiều thời gian.

Vì vậy, **QTD 267** ra đời với hai mục tiêu chính:
1. **Danh sách Bài viết (Knowledge Base):** Lưu lại các bài hướng dẫn, kinh nghiệm xử lý lỗi, kiến trúc hệ thống và những góc nhìn cá nhân.
2. **Danh sách Công cụ (Tools Hub):** Tích hợp trực tiếp những công cụ nhỏ gọn (như format JSON, tạo QR, mã hóa Base64, chuyển đổi văn bản...) chạy ngay trên trình duyệt mà không cần mở tab thứ ba hay lo ngại về quyền riêng tư dữ liệu.

### Cách thêm bài viết hoặc công cụ mới

Toàn bộ dữ liệu của trang web được quản lý tập trung tại file \`src/data/siteData.js\`. Bạn chỉ cần thêm một object mới vào mảng \`POSTS_DATA\` hoặc \`TOOLS_DATA\` là trang chủ sẽ tự động cập nhật giao diện, bộ lọc và thanh tìm kiếm!
    `.trim(),
  },
  {
    id: "post-dev-workflow-2026",
    title: "Tối ưu hóa quy trình làm việc của Developer với bộ công cụ tối giản",
    excerpt: "Tổng hợp những thói quen, phím tắt và cách tổ chức môi trường làm việc giúp tăng gấp đôi tốc độ xử lý công việc hàng ngày mà không bị quá tải.",
    category: "Thủ thuật & Tools",
    date: "02/11/2026",
    readTime: "5 phút đọc",
    featured: true,
    tags: ["Workflow", "Developer", "Tips"],
    content: `
### 1. Giảm thiểu Context Switching (Chuyển đổi ngữ cảnh)

Mỗi lần bạn phải chuyển từ trình soạn thảo code sang trình duyệt, tìm kiếm Google một công cụ đổi Timestamp hoặc Format JSON, bạn mất trung bình từ 2 đến 5 phút để lấy lại sự tập trung sâu.

Giải pháp hiệu quả nhất là:
- Gom toàn bộ các tiện ích hay dùng về **một trang Dashboard duy nhất** (như trang QTD 267 này).
- Tận dụng phím tắt tìm kiếm nhanh (\`Ctrl + K\` hoặc \`/\`) để truy cập công cụ trong tích tắc.

### 2. Tự động hóa những tác vụ lặp đi lặp lại

Nếu một thao tác bạn phải làm quá 3 lần mỗi tuần (ví dụ: tạo chuỗi slug cho bài viết, kiểm tra cấu trúc JSON trả về từ API, hay tạo mật khẩu phân quyền), hãy biến nó thành một script hoặc mini-tool cố định.

\`\`\`javascript
// Ví dụ hàm tạo Slug tiếng Việt gọn nhẹ
const toSlug = (str) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\\s-]/g, '')
    .trim()
    .replace(/\\s+/g, '-');
\`\`\`
    `.trim(),
  },
  {
    id: "post-react-tailwind-architecture",
    title: "Kinh nghiệm thiết kế giao diện Dark Mode hiện đại với React & Tailwind CSS",
    excerpt: "Cách phối màu chuẩn thị giác với tông Xanh Dương - Ngọc Lục Bảo (Blue-Teal), sử dụng hiệu ứng kính mờ (Glassmorphism) và phân cấp độ tương phản.",
    category: "Lập trình",
    date: "28/10/2026",
    readTime: "6 phút đọc",
    featured: false,
    tags: ["React", "TailwindCSS", "UI/UX"],
    content: `
### Nguyên tắc phối màu theo nhận diện thương hiệu QTD 267

Logo **QTD 267** mang dải chuyển sắc đặc trưng từ **Xanh đại dương đậm (Ocean Blue)** sang **Xanh ngọc (Teal/Cyan)**. Khi đưa lên giao diện web:

- **Nền chính (Background):** Sử dụng tông \`slate-950\` hoặc \`slate-900\` ở chế độ tối để làm nổi bật ánh sáng xanh ngọc mà không gây mỏi mắt.
- **Điểm nhấn (Accent Gradient):** Kết hợp \`from-blue-600 via-cyan-500 to-teal-400\` cho các nút hành động chính (Primary CTA) và đường viền thẻ nổi bật.
- **Độ tương phản chữ:** Luôn đảm bảo văn bản chính đạt độ sáng cao (\`slate-100\`) và văn bản phụ dùng \`slate-400\` để phân tách rõ ràng tiêu đề và mô tả.
    `.trim(),
  },
  {
    id: "post-api-security-checklist",
    title: "Checklist bảo mật cơ bản trước khi đưa ứng dụng Web lên Production",
    excerpt: "Những điểm quan trọng cần rà soát về CORS, Rate Limiting, biến môi trường (.env), xác thực JWT và bảo vệ dữ liệu người dùng.",
    category: "Hệ thống",
    date: "20/10/2026",
    readTime: "4 phút đọc",
    featured: false,
    tags: ["Security", "Backend", "Checklist"],
    content: `
### 5 Điểm không thể bỏ qua trước khi Deploy

1. **Không bao giờ commit file \`.env\` hoặc khóa bí mật (Secret Keys) lên Git:** Luôn kiểm tra kỹ \`.gitignore\` và sử dụng biến môi trường trên nền tảng hosting.
2. **Giới hạn tần suất gọi API (Rate Limiting):** Chặn đứng các đợt tấn công brute-force đăng nhập hoặc spam request làm sập máy chủ.
3. **Cấu hình HTTP Headers an toàn:** Kích hoạt \`Content-Security-Policy\`, \`X-Content-Type-Options: nosniff\`, và \`Strict-Transport-Security\`.
4. **Kiểm tra dữ liệu đầu vào (Input Validation):** Luôn xác thực schema ở phía Backend ngay cả khi Frontend đã kiểm tra.
5. **Sao lưu tự động (Automated Backups):** Đảm bảo cơ sở dữ liệu có lịch snapshot định kỳ và đã từng thử nghiệm khôi phục thành công.
    `.trim(),
  },
  {
    id: "post-git-clean-history",
    title: "Mẹo giữ lịch sử Git gọn gàng, dễ đọc và dễ truy vết lỗi",
    excerpt: "Áp dụng chuẩn Conventional Commits, sử dụng git rebase thông minh và cách viết commit message giúp đồng đội (và chính bạn sau 6 tháng) hiểu ngay.",
    category: "Lập trình",
    date: "12/10/2026",
    readTime: "4 phút đọc",
    featured: false,
    tags: ["Git", "Clean Code", "Teamwork"],
    content: `
### Chuẩn hóa Commit Message với Conventional Commits

Thay vì viết những dòng commit chung chung như \`fix bug\` hay \`update code\`, hãy sử dụng cấu trúc có tiền tố rõ ràng:

- \`feat:\` Thêm tính năng mới (ví dụ: \`feat(tools): thêm công cụ tạo mã QR trực tiếp\`)
- \`fix:\` Sửa lỗi (ví dụ: \`fix(blog): khắc phục lỗi tìm kiếm tiếng Việt có dấu\`)
- \`docs:\` Cập nhật tài liệu, hướng dẫn
- \`refactor:\` Tối ưu cấu trúc code mà không làm thay đổi logic chạy

Nhờ vậy, khi nhìn vào danh sách commit của dự án **267**, bạn có thể nắm bắt ngay tiến độ phát triển chỉ trong vài giây!
    `.trim(),
  },
];
