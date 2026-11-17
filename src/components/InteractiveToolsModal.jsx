import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Sparkles,
  RefreshCw,
  Trash2,
  ArrowRightLeft,
  Download,
  Braces,
  Binary,
  FileText,
  KeyRound,
  QrCode,
  Clock,
} from 'lucide-react';

export default function InteractiveToolsModal({ tool, allInteractiveTools, onSelectTool, onClose }) {
  const [copied, setCopied] = useState(false);

  // 1. JSON Formatter State
  const [jsonInput, setJsonInput] = useState(
    '{\n  "project": "HTT 267",\n  "author": "Hoàng Tiến Thành",\n  "website": "https://hoangtienthanh.com.vn",\n  "features": ["Blog Bài Viết", "Bộ Công Cụ Tiện Ích"],\n  "active": true\n}'
  );
  const [jsonError, setJsonError] = useState('');

  // 2. Encoder State (Base64 / URL)
  const [encInput, setEncInput] = useState('Chào mừng bạn đến với không gian cá nhân HTT 267 (hoangtienthanh.com.vn)!');
  const [encMode, setEncMode] = useState('base64-encode');
  const [encOutput, setEncOutput] = useState('');

  // 3. Text Analyzer State
  const [textInput, setTextInput] = useState(
    'Trang web cá nhân HTT 267 — Hoàng Tiến Thành: Nơi tổng hợp danh sách bài viết chia sẻ kiến thức và bộ công cụ tiện ích phục vụ công việc hàng ngày.'
  );

  // 4. Password & UUID Generator State
  const [pwdLength, setPwdLength] = useState(16);
  const [pwdIncludeSymbols, setPwdIncludeSymbols] = useState(true);
  const [pwdIncludeNumbers, setPwdIncludeNumbers] = useState(true);
  const [generatedPwd, setGeneratedPwd] = useState('Htt267#2026!Secure@99');
  const [uuidList, setUuidList] = useState(() => [
    crypto.randomUUID ? crypto.randomUUID() : '550e8400-e29b-41d4-a716-446655440000',
  ]);

  // 5. QR Code State
  const [qrText, setQrText] = useState('https://hoangtienthanh.com.vn');
  const [qrSize, setQrSize] = useState(240);

  // 6. Timestamp Converter State
  const [tsInput, setTsInput] = useState(() => Math.floor(Date.now() / 1000).toString());

  if (!tool) return null;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // JSON Handlers
  const handleFormatJson = (spaces = 2) => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, spaces));
      setJsonError('');
    } catch (err) {
      setJsonError(err.message);
    }
  };

  // Encoder Computation
  const computeEncoded = (input, mode) => {
    if (!input) return '';
    try {
      if (mode === 'base64-encode') {
        return btoa(unescape(encodeURIComponent(input)));
      }
      if (mode === 'base64-decode') {
        return decodeURIComponent(escape(atob(input.trim())));
      }
      if (mode === 'url-encode') {
        return encodeURIComponent(input);
      }
      if (mode === 'url-decode') {
        return decodeURIComponent(input);
      }
    } catch {
      return '⚠️ Chuỗi đầu vào không hợp lệ để giải mã!';
    }
    return '';
  };

  const activeEncodedResult = encOutput || computeEncoded(encInput, encMode);

  // Text Analyzer Helpers
  const wordCount = textInput.trim() ? textInput.trim().split(/\s+/).length : 0;
  const charCount = textInput.length;
  const charNoSpaceCount = textInput.replace(/\s/g, '').length;
  const lineCount = textInput ? textInput.split(/\r\n|\r|\n/).length : 0;
  const readingTimeSec = Math.max(1, Math.ceil((wordCount / 200) * 60));

  const toVietnameseSlug = (str) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

  // Password & UUID Helpers
  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const syms = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let pool = chars;
    if (pwdIncludeNumbers) pool += nums;
    if (pwdIncludeSymbols) pool += syms;
    let res = '';
    for (let i = 0; i < pwdLength; i++) {
      res += pool.charAt(Math.floor(Math.random() * pool.length));
    }
    setGeneratedPwd(res);
  };

  const generateUuids = (count = 3) => {
    const list = [];
    for (let i = 0; i < count; i++) {
      if (crypto.randomUUID) {
        list.push(crypto.randomUUID());
      } else {
        list.push(
          'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          })
        );
      }
    }
    setUuidList(list);
  };

  // Timestamp Helper
  const getParsedDate = () => {
    const num = Number(tsInput.trim());
    if (Number.isNaN(num)) return null;
    const ms = tsInput.trim().length <= 10 ? num * 1000 : num;
    const d = new Date(ms);
    return Number.isNaN(d.getTime()) ? null : d;
  };
  const parsedDate = getParsedDate();

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&margin=12&data=${encodeURIComponent(
    qrText || 'https://hoangtienthanh.com.vn'
  )}`;

  const getIconComponent = (key) => {
    switch (key) {
      case 'json-formatter':
        return <Braces className="w-4 h-4" />;
      case 'encoder':
        return <Binary className="w-4 h-4" />;
      case 'text-analyzer':
        return <FileText className="w-4 h-4" />;
      case 'generator':
        return <KeyRound className="w-4 h-4" />;
      case 'qrcode':
        return <QrCode className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-stone-900 border border-amber-500/30 shadow-2xl shadow-amber-950/50 overflow-hidden text-stone-100">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-900/95 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 via-amber-600 to-amber-500 text-white shadow-md shadow-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{tool.title}</h3>
                <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  HTT 267 Tool
                </span>
              </div>
              <p className="text-xs text-stone-400">{tool.description}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            title="Đóng (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Switcher Bar between Interactive Tools */}
        {allInteractiveTools?.length > 1 && (
          <div className="flex items-center gap-2 px-6 py-2.5 bg-stone-950/70 border-b border-stone-800 overflow-x-auto">
            <span className="text-xs font-medium text-stone-400 shrink-0 mr-1">Đổi nhanh:</span>
            {allInteractiveTools.map((item) => {
              const active = item.toolKey === tool.toolKey;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTool(item)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all ${
                    active
                      ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white shadow-sm'
                      : 'bg-stone-800/70 text-stone-300 hover:bg-stone-800 hover:text-white'
                  }`}
                >
                  {getIconComponent(item.toolKey)}
                  <span>{item.title.split('—')[0].split('(')[0].trim()}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Tool Workspace Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* TOOL 1: JSON FORMATTER */}
          {tool.toolKey === 'json-formatter' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleFormatJson(2)}
                    className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-rose-600 via-amber-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    Làm đẹp (Format 2 spaces)
                  </button>
                  <button
                    onClick={() => handleFormatJson(4)}
                    className="px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors"
                  >
                    Format 4 spaces
                  </button>
                  <button
                    onClick={() => handleFormatJson(0)}
                    className="px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors"
                  >
                    Nén (Minify)
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(jsonInput)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-medium transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Đã sao chép!' : 'Copy JSON'}
                  </button>
                  <button
                    onClick={() => {
                      setJsonInput('');
                      setJsonError('');
                    }}
                    className="p-2 rounded-lg bg-stone-800 hover:bg-rose-500/20 text-stone-400 hover:text-rose-300 transition-colors"
                    title="Xóa trắng"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {jsonError ? (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
                  ❌ Lỗi cú pháp JSON: {jsonError}
                </div>
              ) : (
                <div className="px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
                  ✓ Sẵn sàng xử lý JSON ngay trên trình duyệt của bạn.
                </div>
              )}

              <textarea
                rows={12}
                value={jsonInput}
                onChange={(e) => {
                  setJsonInput(e.target.value);
                  setJsonError('');
                }}
                placeholder="Dán chuỗi JSON của bạn vào đây..."
                className="w-full p-4 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-500 focus:outline-none font-mono text-sm text-amber-100 leading-relaxed"
              />
            </div>
          )}

          {/* TOOL 2: BASE64 & URL ENCODER */}
          {tool.toolKey === 'encoder' && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'base64-encode', label: 'Mã hóa Base64 (Encode)' },
                  { id: 'base64-decode', label: 'Giải mã Base64 (Decode)' },
                  { id: 'url-encode', label: 'URL Encode' },
                  { id: 'url-decode', label: 'URL Decode' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setEncMode(m.id);
                      setEncOutput('');
                    }}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                      encMode === m.id
                        ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white'
                        : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-stone-300">Dữ liệu đầu vào (Input)</label>
                    <button
                      onClick={() => setEncInput('')}
                      className="text-xs text-stone-400 hover:text-rose-400"
                    >
                      Xóa
                    </button>
                  </div>
                  <textarea
                    rows={8}
                    value={encInput}
                    onChange={(e) => {
                      setEncInput(e.target.value);
                      setEncOutput('');
                    }}
                    placeholder="Nhập văn bản hoặc chuỗi cần xử lý..."
                    className="w-full p-3.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-500 focus:outline-none font-mono text-sm text-stone-100"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-amber-300">Kết quả (Output)</label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEncInput(activeEncodedResult);
                          setEncMode(
                            encMode.includes('encode')
                              ? encMode.replace('encode', 'decode')
                              : encMode.replace('decode', 'encode')
                          );
                        }}
                        className="flex items-center gap-1 text-xs text-stone-300 hover:text-amber-300"
                        title="Đảo chiều Input/Output"
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5" /> Đảo chiều
                      </button>
                      <button
                        onClick={() => copyToClipboard(activeEncodedResult)}
                        className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold"
                      >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? 'Đã chép' : 'Copy'}
                      </button>
                    </div>
                  </div>
                  <textarea
                    rows={8}
                    readOnly
                    value={activeEncodedResult}
                    className="w-full p-3.5 rounded-xl bg-stone-950/70 border border-amber-500/20 font-mono text-sm text-amber-200"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TOOL 3: WORD COUNTER & TEXT ANALYZER */}
          {tool.toolKey === 'text-analyzer' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { label: 'Số từ', value: wordCount },
                  { label: 'Ký tự (có cách)', value: charCount },
                  { label: 'Ký tự (không cách)', value: charNoSpaceCount },
                  { label: 'Số dòng', value: lineCount },
                  { label: 'Thời gian đọc', value: `~${readingTimeSec}s` },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-center"
                  >
                    <div className="text-xl font-extrabold bg-gradient-to-r from-rose-500 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setTextInput(textInput.toUpperCase())}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-medium"
                >
                  IN HOA TOÀN BỘ
                </button>
                <button
                  onClick={() => setTextInput(textInput.toLowerCase())}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-medium"
                >
                  chữ thường toàn bộ
                </button>
                <button
                  onClick={() => setTextInput(toVietnameseSlug(textInput))}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-medium"
                >
                  Tạo Slug URL Tiếng Việt
                </button>
                <button
                  onClick={() => setTextInput(textInput.replace(/\s+/g, ' ').trim())}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-medium"
                >
                  Xóa khoảng trắng thừa
                </button>
                <button
                  onClick={() => copyToClipboard(textInput)}
                  className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-amber-500 text-white text-xs font-semibold"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Đã sao chép!' : 'Copy văn bản'}
                </button>
              </div>

              <textarea
                rows={9}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Nhập hoặc dán đoạn văn bản cần đếm từ và xử lý..."
                className="w-full p-4 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-500 focus:outline-none text-sm text-stone-100 leading-relaxed"
              />
            </div>
          )}

          {/* TOOL 4: PASSWORD & UUID GENERATOR */}
          {tool.toolKey === 'generator' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
                <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                  1. Tạo Mật Khẩu Bảo Mật Cao
                </h4>
                <div className="p-3.5 rounded-xl bg-stone-900 border border-amber-500/30 flex items-center justify-between gap-2">
                  <span className="font-mono text-sm text-amber-300 break-all">{generatedPwd}</span>
                  <button
                    onClick={() => copyToClipboard(generatedPwd)}
                    className="p-2 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 shrink-0"
                    title="Copy mật khẩu"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-300">Độ dài mật khẩu: <strong>{pwdLength} ký tự</strong></span>
                    <input
                      type="range"
                      min={8}
                      max={40}
                      value={pwdLength}
                      onChange={(e) => setPwdLength(Number(e.target.value))}
                      className="accent-amber-400"
                    />
                  </div>
                  <label className="flex items-center gap-2 text-stone-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pwdIncludeNumbers}
                      onChange={(e) => setPwdIncludeNumbers(e.target.checked)}
                      className="accent-amber-500"
                    />
                    Bao gồm chữ số (0-9)
                  </label>
                  <label className="flex items-center gap-2 text-stone-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pwdIncludeSymbols}
                      onChange={(e) => setPwdIncludeSymbols(e.target.checked)}
                      className="accent-amber-500"
                    />
                    Bao gồm ký tự đặc biệt (!@#$%^&*)
                  </label>
                </div>

                <button
                  onClick={generatePassword}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white text-xs font-semibold shadow-md"
                >
                  <RefreshCw className="w-4 h-4" /> Tạo mật khẩu mới
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                    2. Tạo Mã UUID v4
                  </h4>
                  <button
                    onClick={() => generateUuids(4)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs text-amber-300 font-medium"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Tạo 4 mã mới
                  </button>
                </div>

                <div className="space-y-2">
                  {uuidList.map((u, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 font-mono text-xs text-stone-200"
                    >
                      <span>{u}</span>
                      <button
                        onClick={() => copyToClipboard(u)}
                        className="text-amber-400 hover:text-amber-300"
                        title="Copy UUID"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TOOL 5: QR CODE GENERATOR */}
          {tool.toolKey === 'qrcode' && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <div className="md:col-span-3 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-2">
                    Nhập đường dẫn URL hoặc nội dung văn bản muốn tạo mã QR:
                  </label>
                  <textarea
                    rows={4}
                    value={qrText}
                    onChange={(e) => setQrText(e.target.value)}
                    placeholder="https://hoangtienthanh.com.vn hoặc nội dung bất kỳ..."
                    className="w-full p-3.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-500 focus:outline-none text-sm text-stone-100"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="text-xs text-stone-400">Kích thước ảnh:</label>
                  {[180, 240, 320].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setQrSize(sz)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                        qrSize === sz
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {sz}x{sz}px
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 flex flex-col items-center justify-center p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                <div className="p-3 bg-white rounded-2xl shadow-lg">
                  <img
                    src={qrImageUrl}
                    alt="QR Code HTT 267"
                    className="w-44 h-44 object-contain"
                  />
                </div>
                <a
                  href={qrImageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 via-amber-600 to-amber-500 text-white text-xs font-semibold shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" /> Mở ảnh QR chất lượng cao
                </a>
              </div>
            </div>
          )}

          {/* TOOL 6: UNIX TIMESTAMP CONVERTER */}
          {tool.toolKey === 'timestamp' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  value={tsInput}
                  onChange={(e) => setTsInput(e.target.value)}
                  placeholder="Nhập Unix Timestamp (VD: 1794932692)"
                  className="flex-1 min-w-[240px] px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-500 focus:outline-none font-mono text-sm text-amber-200"
                />
                <button
                  onClick={() => setTsInput(Math.floor(Date.now() / 1000).toString())}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-amber-600 to-amber-500 text-white text-xs font-semibold"
                >
                  Lấy Timestamp Hiện Tại
                </button>
              </div>

              {parsedDate ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                    <div className="text-xs text-stone-400">Giờ địa phương (Việt Nam GMT+7)</div>
                    <div className="text-base font-bold text-amber-300 mt-1 font-mono">
                      {parsedDate.toLocaleString('vi-VN', { hour12: false })}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                    <div className="text-xs text-stone-400">Chuẩn quốc tế (ISO 8601 / UTC)</div>
                    <div className="text-base font-bold text-orange-300 mt-1 font-mono">
                      {parsedDate.toISOString()}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                    <div className="text-xs text-stone-400">Unix Giây (Seconds)</div>
                    <div className="text-sm font-mono text-stone-200 mt-1">
                      {Math.floor(parsedDate.getTime() / 1000)}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                    <div className="text-xs text-stone-400">Unix Mili-giây (Milliseconds)</div>
                    <div className="text-sm font-mono text-stone-200 mt-1">
                      {parsedDate.getTime()}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  ⚠️ Vui lòng nhập chuỗi số Timestamp hợp lệ.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
