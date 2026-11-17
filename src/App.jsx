import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  Wrench,
  BookOpen,
  Sparkles,
  ExternalLink,
  Play,
  Calendar,
  Clock,
  ArrowRight,
  Star,
  LayoutGrid,
  List,
  Sun,
  Moon,
  Braces,
  Binary,
  FileText,
  KeyRound,
  QrCode,
  Code2,
  PenTool,
  Image,
  Globe,
  Terminal,
  FolderGit2,
} from 'lucide-react';
import { SITE_CONFIG, TOOLS_DATA, POSTS_DATA } from './data/siteData';
import InteractiveToolsModal from './components/InteractiveToolsModal';
import PostDetailModal from './components/PostDetailModal';

const ICON_MAP = {
  Braces,
  Binary,
  FileText,
  KeyRound,
  QrCode,
  Clock,
  Code2,
  PenTool,
  Image,
  Wrench,
};

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'posts' | 'tools'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedToolCategory, setSelectedToolCategory] = useState('Tất cả');
  const [selectedPostCategory, setSelectedPostCategory] = useState('Tất cả');
  const [postViewMode, setPostViewMode] = useState('grid'); // 'grid' | 'list'

  // Modals
  const [activeInteractiveTool, setActiveInteractiveTool] = useState(null);
  const [activePost, setActivePost] = useState(null);

  // Pinned tools persisted in localStorage
  const [pinnedToolIds, setPinnedToolIds] = useState(() => {
    try {
      const saved = localStorage.getItem('htt267_pinned_tools') || localStorage.getItem('qtd267_pinned_tools');
      return saved ? JSON.parse(saved) : ['tool-json', 'tool-qrcode'];
    } catch {
      return ['tool-json', 'tool-qrcode'];
    }
  });

  const searchInputRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    try {
      localStorage.setItem('htt267_pinned_tools', JSON.stringify(pinnedToolIds));
    } catch {
      // ignore storage errors
    }
  }, [pinnedToolIds]);

  // Keyboard shortcut Ctrl+K to focus search and Esc to close modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setActiveInteractiveTool(null);
        setActivePost(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const togglePinTool = (id, e) => {
    e.stopPropagation();
    setPinnedToolIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Categories
  const toolCategories = useMemo(() => {
    const cats = Array.from(new Set(TOOLS_DATA.map((t) => t.category)));
    return ['Tất cả', 'Đã ghim ⭐', ...cats];
  }, []);

  const postCategories = useMemo(() => {
    const cats = Array.from(new Set(POSTS_DATA.map((p) => p.category)));
    return ['Tất cả', ...cats];
  }, []);

  // Filtered Tools
  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((tool) => {
      const matchesCategory =
        selectedToolCategory === 'Tất cả'
          ? true
          : selectedToolCategory === 'Đã ghim ⭐'
          ? pinnedToolIds.includes(tool.id)
          : tool.category === selectedToolCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        tool.title.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      const aPinned = pinnedToolIds.includes(a.id) ? 1 : 0;
      const bPinned = pinnedToolIds.includes(b.id) ? 1 : 0;
      return bPinned - aPinned;
    });
  }, [selectedToolCategory, searchQuery, pinnedToolIds]);

  // Filtered Posts
  const filteredPosts = useMemo(() => {
    return POSTS_DATA.filter((post) => {
      const matchesCategory =
        selectedPostCategory === 'Tất cả' || post.category === selectedPostCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedPostCategory, searchQuery]);

  const interactiveToolsList = useMemo(
    () => TOOLS_DATA.filter((t) => t.type === 'interactive'),
    []
  );

  const handleOpenTool = (tool) => {
    if (tool.type === 'interactive') {
      setActiveInteractiveTool(tool);
    } else if (tool.url) {
      window.open(tool.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? 'bg-stone-950 text-stone-100'
          : 'bg-stone-50 text-stone-900'
      }`}
    >
      {/* Ambient Background Glow - Warm Terracotta & Amber */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-rose-600/15 blur-[140px]" />
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-amber-500/15 blur-[140px]" />
      </div>

      {/* Sticky Header / Navbar */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors ${
          darkMode
            ? 'bg-stone-950/85 border-stone-800/80'
            : 'bg-white/85 border-stone-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a
            href="#top"
            onClick={() => setActiveTab('all')}
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-white p-1 shadow-md shadow-amber-500/15 border border-amber-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
              <img
                src={SITE_CONFIG.logoUrl}
                alt={SITE_CONFIG.brandName}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-rose-500 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
                  {SITE_CONFIG.brandName}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  hoangtienthanh.com.vn
                </span>
              </div>
              <p className={`text-xs hidden sm:block ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                Blog Bài Viết & Bộ Công Cụ
              </p>
            </div>
          </a>

          {/* Quick Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm bài viết hoặc công cụ... (Ctrl + K)"
              className={`w-full pl-10 pr-16 py-2 rounded-xl text-sm border transition-all focus:outline-none ${
                darkMode
                  ? 'bg-stone-900/90 border-stone-800 text-stone-100 placeholder:text-stone-500 focus:border-amber-500'
                  : 'bg-stone-100 border-stone-200 text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-amber-600'
              }`}
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-amber-400 hover:underline"
              >
                Xóa
              </button>
            ) : (
              <kbd
                className={`hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono rounded border ${
                  darkMode
                    ? 'bg-stone-800 border-stone-700 text-stone-400'
                    : 'bg-white border-stone-300 text-stone-500'
                }`}
              >
                Ctrl K
              </kbd>
            )}
          </div>

          {/* Nav Pills + Theme Toggle */}
          <div className="flex items-center gap-2">
            <nav
              className={`hidden md:flex items-center p-1 rounded-xl border ${
                darkMode
                  ? 'bg-stone-900 border-stone-800'
                  : 'bg-stone-100 border-stone-200'
              }`}
            >
              {[
                { id: 'all', label: 'Trang chủ' },
                { id: 'tools', label: `Tools (${TOOLS_DATA.length})` },
                { id: 'posts', label: `Bài viết (${POSTS_DATA.length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-rose-600 via-amber-600 to-amber-500 text-white shadow-sm'
                      : darkMode
                      ? 'text-stone-400 hover:text-white'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl border transition-colors ${
                darkMode
                  ? 'bg-stone-900 border-stone-800 text-amber-400 hover:bg-stone-800'
                  : 'bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200'
              }`}
              title={darkMode ? 'Chuyển sang Giao diện Sáng' : 'Chuyển sang Giao diện Tối'}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="top" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* HERO BANNER */}
        <section
          className={`relative overflow-hidden rounded-3xl border p-6 sm:p-10 ${
            darkMode
              ? 'bg-gradient-to-br from-stone-900 via-stone-900/95 to-amber-950/30 border-stone-800/90'
              : 'bg-gradient-to-br from-white via-amber-50/40 to-orange-50/60 border-stone-200 shadow-lg shadow-stone-200/50'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                <Globe className="w-3.5 h-3.5" />
                <span>{SITE_CONFIG.heroBadge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Xin chào, đây là không gian số{' '}
                <span className="bg-gradient-to-r from-rose-500 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
                  {SITE_CONFIG.brandName}
                </span>
              </h1>

              <p
                className={`text-sm sm:text-base max-w-2xl leading-relaxed ${
                  darkMode ? 'text-stone-300' : 'text-stone-600'
                }`}
              >
                {SITE_CONFIG.tagline} Tích hợp các tiện ích xử lý nhanh ngay trên trình duyệt và
                lưu trữ danh sách các bài viết, ghi chú kỹ thuật cá nhân.
              </p>

              {/* Quick Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#tools-section"
                  onClick={() => setActiveTab('all')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-amber-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white text-sm font-semibold shadow-lg shadow-amber-950/30 transition-all"
                >
                  <Wrench className="w-4 h-4" />
                  Khám phá Bộ Công Cụ ({TOOLS_DATA.length})
                </a>
                <a
                  href="#posts-section"
                  onClick={() => setActiveTab('all')}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                    darkMode
                      ? 'bg-stone-800/80 hover:bg-stone-800 border-stone-700 text-stone-100'
                      : 'bg-white hover:bg-stone-100 border-stone-300 text-stone-800'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  Đọc Bài Viết ({POSTS_DATA.length})
                </a>
              </div>
            </div>

            {/* Right Logo & Quick Stats Showcase */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-4">
              <div className="relative group">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-rose-600 via-amber-500 to-yellow-400 opacity-25 blur-xl group-hover:opacity-45 transition-opacity" />
                <div className="relative bg-white rounded-2xl p-4 shadow-xl border border-amber-500/30">
                  <img
                    src={SITE_CONFIG.logoUrl}
                    alt="HTT 267 Logo"
                    className="w-48 sm:w-56 h-28 object-contain"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5 w-full max-w-xs text-center">
                <div
                  className={`p-2.5 rounded-xl border ${
                    darkMode
                      ? 'bg-stone-950/60 border-stone-800'
                      : 'bg-white/90 border-stone-200'
                  }`}
                >
                  <div className="text-lg font-extrabold text-amber-400">
                    {interactiveToolsList.length}
                  </div>
                  <div className="text-[11px] text-stone-400">Tool chạy ngay</div>
                </div>
                <div
                  className={`p-2.5 rounded-xl border ${
                    darkMode
                      ? 'bg-stone-950/60 border-stone-800'
                      : 'bg-white/90 border-stone-200'
                  }`}
                >
                  <div className="text-lg font-extrabold text-orange-400">
                    {TOOLS_DATA.length}
                  </div>
                  <div className="text-[11px] text-stone-400">Tổng số Tool</div>
                </div>
                <div
                  className={`p-2.5 rounded-xl border ${
                    darkMode
                      ? 'bg-stone-950/60 border-stone-800'
                      : 'bg-white/90 border-stone-200'
                  }`}
                >
                  <div className="text-lg font-extrabold text-rose-400">
                    {POSTS_DATA.length}
                  </div>
                  <div className="text-[11px] text-stone-400">Bài viết</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile View Switcher */}
        <div className="flex md:hidden items-center gap-2">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'tools', label: `Danh sách Tool (${TOOLS_DATA.length})` },
            { id: 'posts', label: `Bài viết (${POSTS_DATA.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-rose-600 via-amber-600 to-amber-500 text-white'
                  : darkMode
                  ? 'bg-stone-900 text-stone-400 border border-stone-800'
                  : 'bg-white text-stone-600 border border-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* =========================================================
            PHẦN 1: DANH SÁCH CÁC CÔNG CỤ (TOOLS SECTION)
        ========================================================= */}
        {(activeTab === 'all' || activeTab === 'tools') && (
          <section id="tools-section" className="space-y-6 scroll-mt-20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                  <Terminal className="w-4 h-4" />
                  <span>Utilities & Bookmarks</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-3">
                  <span>Danh Sách Các Tool</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 font-semibold">
                    {filteredTools.length} công cụ
                  </span>
                </h2>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {toolCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedToolCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                      selectedToolCategory === cat
                        ? 'bg-gradient-to-r from-rose-600 via-amber-600 to-amber-500 text-white shadow-sm'
                        : darkMode
                        ? 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
                        : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Tools Grid */}
            {filteredTools.length === 0 ? (
              <div
                className={`p-10 rounded-2xl border text-center ${
                  darkMode
                    ? 'bg-stone-900/50 border-stone-800 text-stone-400'
                    : 'bg-white border-stone-200 text-stone-500'
                }`}
              >
                Không tìm thấy công cụ nào khớp với từ khóa "{searchQuery}".
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredTools.map((tool) => {
                  const IconComp = ICON_MAP[tool.icon] || Wrench;
                  const isInteractive = tool.type === 'interactive';
                  const isPinned = pinnedToolIds.includes(tool.id);

                  return (
                    <div
                      key={tool.id}
                      onClick={() => handleOpenTool(tool)}
                      className={`group relative rounded-2xl border p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 ${
                        darkMode
                          ? 'bg-stone-900/80 hover:bg-stone-900 border-stone-800/90 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-950/30'
                          : 'bg-white hover:bg-amber-50/20 border-stone-200 hover:border-amber-500 hover:shadow-lg'
                      }`}
                    >
                      <div>
                        {/* Card Top Row */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                              isInteractive
                                ? 'bg-gradient-to-br from-rose-600 via-amber-600 to-amber-500 text-white shadow-md shadow-amber-500/20'
                                : darkMode
                                ? 'bg-stone-800 text-amber-400 border border-stone-700'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            <IconComp className="w-5 h-5" />
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                                isInteractive
                                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                  : darkMode
                                  ? 'bg-stone-800 text-stone-300 border-stone-700'
                                  : 'bg-stone-100 text-stone-600 border-stone-200'
                              }`}
                            >
                              {tool.badge}
                            </span>

                            <button
                              onClick={(e) => togglePinTool(tool.id, e)}
                              className={`p-1.5 rounded-lg transition-colors ${
                                isPinned
                                  ? 'text-amber-400 bg-amber-500/10'
                                  : 'text-stone-500 hover:text-amber-300'
                              }`}
                              title={isPinned ? 'Bỏ ghim công cụ' : 'Ghim công cụ lên đầu'}
                            >
                              <Star
                                className="w-4 h-4"
                                fill={isPinned ? 'currentColor' : 'none'}
                              />
                            </button>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-base font-bold group-hover:text-amber-400 transition-colors mb-1.5">
                          {tool.title}
                        </h3>
                        <p
                          className={`text-xs sm:text-sm leading-relaxed line-clamp-2 ${
                            darkMode ? 'text-stone-400' : 'text-stone-600'
                          }`}
                        >
                          {tool.description}
                        </p>
                      </div>

                      {/* Footer Tags & Action */}
                      <div className="mt-5 pt-3.5 border-t border-stone-800/60 flex items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1.5">
                          {tool.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className={`px-2 py-0.5 rounded-md text-[10px] font-mono ${
                                darkMode
                                  ? 'bg-stone-950 text-stone-400 border border-stone-800'
                                  : 'bg-stone-100 text-stone-600'
                              }`}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:translate-x-0.5 transition-transform shrink-0">
                          {isInteractive ? (
                            <>
                              <Play className="w-3.5 h-3.5 fill-current" /> Mở Tool
                            </>
                          ) : (
                            <>
                              Truy cập <ExternalLink className="w-3.5 h-3.5" />
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* =========================================================
            PHẦN 2: DANH SÁCH CÁC BÀI VIẾT (POSTS SECTION)
        ========================================================= */}
        {(activeTab === 'all' || activeTab === 'posts') && (
          <section id="posts-section" className="space-y-6 scroll-mt-20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                  <BookOpen className="w-4 h-4" />
                  <span>Blog & Knowledge Notes</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-3">
                  <span>Danh Sách Các Bài Viết</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 font-semibold">
                    {filteredPosts.length} bài viết
                  </span>
                </h2>
              </div>

              {/* Post Category Filter + View Mode Toggle */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {postCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedPostCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                        selectedPostCategory === cat
                          ? 'bg-gradient-to-r from-rose-600 via-amber-600 to-amber-500 text-white shadow-sm'
                          : darkMode
                          ? 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
                          : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Grid / List View Switcher */}
                <div
                  className={`hidden sm:flex items-center p-1 rounded-xl border ${
                    darkMode
                      ? 'bg-stone-900 border-stone-800'
                      : 'bg-white border-stone-200'
                  }`}
                >
                  <button
                    onClick={() => setPostViewMode('grid')}
                    className={`p-1.5 rounded-lg ${
                      postViewMode === 'grid'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                    title="Chế độ Lưới (Grid)"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPostViewMode('list')}
                    className={`p-1.5 rounded-lg ${
                      postViewMode === 'list'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                    title="Chế độ Danh sách (List)"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Posts List / Grid */}
            {filteredPosts.length === 0 ? (
              <div
                className={`p-10 rounded-2xl border text-center ${
                  darkMode
                    ? 'bg-stone-900/50 border-stone-800 text-stone-400'
                    : 'bg-white border-stone-200 text-stone-500'
                }`}
              >
                Không tìm thấy bài viết nào khớp với từ khóa "{searchQuery}".
              </div>
            ) : postViewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post, idx) => {
                  const isFirstFeatured = idx === 0 && post.featured && selectedPostCategory === 'Tất cả' && !searchQuery;
                  return (
                    <article
                      key={post.id}
                      onClick={() => setActivePost(post)}
                      className={`group rounded-2xl border p-6 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 ${
                        isFirstFeatured ? 'md:col-span-2' : ''
                      } ${
                        darkMode
                          ? 'bg-stone-900/80 hover:bg-stone-900 border-stone-800/90 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-950/20'
                          : 'bg-white hover:bg-amber-50/20 border-stone-200 hover:border-amber-500 hover:shadow-lg'
                      }`}
                    >
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-rose-600/20 via-amber-600/20 to-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold">
                              {post.category}
                            </span>
                            {post.featured && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[11px] font-semibold">
                                <Sparkles className="w-3 h-3" /> Nổi bật
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3 text-xs text-stone-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-amber-400" />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-rose-400" />
                              {post.readTime}
                            </span>
                          </div>
                        </div>

                        <h3
                          className={`font-extrabold group-hover:text-amber-400 transition-colors mb-2.5 ${
                            isFirstFeatured ? 'text-xl sm:text-2xl' : 'text-lg'
                          }`}
                        >
                          {post.title}
                        </h3>

                        <p
                          className={`text-sm leading-relaxed ${
                            darkMode ? 'text-stone-400' : 'text-stone-600'
                          }`}
                        >
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-stone-800/60 flex items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.map((t) => (
                            <span
                              key={t}
                              className={`px-2 py-0.5 rounded-md text-[11px] font-mono ${
                                darkMode
                                  ? 'bg-stone-950 text-stone-400 border border-stone-800'
                                  : 'bg-stone-100 text-stone-600'
                              }`}
                            >
                              #{t}
                            </span>
                          ))}
                        </div>

                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform shrink-0">
                          <span>Đọc chi tiết</span>
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              /* Compact List View for Posts */
              <div className="space-y-3">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => setActivePost(post)}
                    className={`group rounded-2xl border p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-all ${
                      darkMode
                        ? 'bg-stone-900/80 hover:bg-stone-900 border-stone-800 hover:border-amber-500/40'
                        : 'bg-white hover:bg-stone-50 border-stone-200 hover:border-amber-500'
                    }`}
                  >
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2.5 text-xs">
                        <span className="font-bold text-amber-400">{post.category}</span>
                        <span className="text-stone-600">•</span>
                        <span className="text-stone-400">{post.date}</span>
                        <span className="text-stone-600">•</span>
                        <span className="text-stone-400">{post.readTime}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold group-hover:text-amber-400 transition-colors">
                        {post.title}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm line-clamp-1 ${
                          darkMode ? 'text-stone-400' : 'text-stone-600'
                        }`}
                      >
                        {post.excerpt}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/10 text-amber-400 text-xs font-bold shrink-0 self-start sm:self-center">
                      <span>Đọc bài</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer
        className={`mt-16 border-t py-8 ${
          darkMode
            ? 'bg-stone-950 border-stone-900 text-stone-400'
            : 'bg-white border-stone-200 text-stone-600'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <img
              src={SITE_CONFIG.logoUrl}
              alt="HTT 267"
              className="w-8 h-8 rounded-lg bg-white p-0.5 object-contain border border-stone-700"
            />
            <span>
              © {new Date().getFullYear()} <strong>{SITE_CONFIG.brandName}</strong> ({SITE_CONFIG.author.name}). Trang web cá nhân lưu trữ Bài viết & Bộ công cụ.
            </span>
          </div>

          <div className="flex items-center gap-2 text-stone-400">
            <FolderGit2 className="w-4 h-4 text-amber-400" />
            <span>
              Chỉnh sửa nội dung tại:{' '}
              <code className="px-1.5 py-0.5 rounded bg-stone-900 text-amber-300 font-mono">
                src/data/siteData.js
              </code>
            </span>
          </div>
        </div>
      </footer>

      {/* Interactive Tool Modal */}
      {activeInteractiveTool && (
        <InteractiveToolsModal
          tool={activeInteractiveTool}
          allInteractiveTools={interactiveToolsList}
          onSelectTool={(t) => setActiveInteractiveTool(t)}
          onClose={() => setActiveInteractiveTool(null)}
        />
      )}

      {/* Post Reader Modal */}
      {activePost && (
        <PostDetailModal
          post={activePost}
          relatedPosts={POSTS_DATA.filter((p) => p.id !== activePost.id)}
          onSelectPost={(p) => setActivePost(p)}
          onClose={() => setActivePost(null)}
        />
      )}
    </div>
  );
}
