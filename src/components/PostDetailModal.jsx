import React, { useState } from 'react';
import { X, Calendar, Clock, Tag, Share2, Check, BookOpen, ArrowRight } from 'lucide-react';

export default function PostDetailModal({ post, relatedPosts, onSelectPost, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!post) return null;

  const handleCopyShare = () => {
    const url = `${window.location.origin}/#post-${post.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple formatted content renderer supporting headings, bullet points, and code blocks
  const renderFormattedContent = (raw) => {
    const blocks = raw.split('```');
    return blocks.map((block, index) => {
      // Odd indices are code blocks
      if (index % 2 === 1) {
        const lines = block.trim().split('\n');
        const firstLine = lines[0]?.trim();
        const codeBody =
          /^[a-zA-Z]+$/.test(firstLine) ? lines.slice(1).join('\n') : block.trim();
        return (
          <pre
            key={index}
            className="my-4 p-4 rounded-xl bg-stone-950 border border-amber-500/20 overflow-x-auto font-mono text-xs sm:text-sm text-amber-200 leading-relaxed"
          >
            <code>{codeBody}</code>
          </pre>
        );
      }

      // Even indices are regular paragraphs / headings / lists
      return block
        .trim()
        .split('\n\n')
        .map((para, pIdx) => {
          const trimmed = para.trim();
          if (!trimmed) return null;

          if (trimmed.startsWith('### ')) {
            return (
              <h4
                key={`${index}-${pIdx}`}
                className="text-lg font-bold text-white mt-6 mb-2 flex items-center gap-2"
              >
                <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-rose-500 to-amber-400 inline-block" />
                {trimmed.replace('### ', '')}
              </h4>
            );
          }

          if (trimmed.split('\n').every((l) => l.trim().startsWith('- ') || /^\d+\.\s/.test(l.trim()))) {
            return (
              <ul key={`${index}-${pIdx}`} className="my-3 space-y-2 pl-4">
                {trimmed.split('\n').map((item, iIdx) => (
                  <li key={iIdx} className="text-stone-300 text-sm sm:text-base leading-relaxed flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2.5 shrink-0" />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: item
                          .replace(/^(-|\d+\.)\s+/, '')
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                          .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-stone-800 text-amber-300 font-mono text-xs">$1</code>'),
                      }}
                    />
                  </li>
                ))}
              </ul>
            );
          }

          return (
            <p
              key={`${index}-${pIdx}`}
              className="my-3 text-stone-300 text-sm sm:text-base leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: trimmed
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                  .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-stone-800 text-amber-300 font-mono text-xs">$1</code>'),
              }}
            />
          );
        });
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl overflow-hidden text-stone-100">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-900/95 border-b border-stone-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <BookOpen className="w-4 h-4" />
            <span>{post.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-medium text-stone-200 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-amber-400" /> : <Share2 className="w-3.5 h-3.5" />}
              {copied ? 'Đã chép link!' : 'Chia sẻ'}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400 mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-rose-400" />
              {post.readTime}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4">
            {post.title}
          </h2>

          <div className="p-4 rounded-xl bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/30 border border-amber-500/20 text-stone-300 text-sm italic mb-6">
            {post.excerpt}
          </div>

          <div className="space-y-2">{renderFormattedContent(post.content)}</div>

          {/* Tags */}
          <div className="mt-8 pt-5 border-t border-stone-800 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-stone-400 mr-1" />
            {post.tags.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg bg-stone-800 text-stone-300 text-xs font-medium"
              >
                #{t}
              </span>
            ))}
          </div>

          {/* Related Posts */}
          {relatedPosts?.length > 0 && (
            <div className="mt-8 pt-6 border-t border-stone-800">
              <h5 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
                Bài viết khác trên HTT 267
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedPosts.slice(0, 2).map((rp) => (
                  <button
                    key={rp.id}
                    onClick={() => onSelectPost(rp)}
                    className="p-3.5 rounded-xl bg-stone-950/70 hover:bg-stone-800/80 border border-stone-800 text-left transition-all group"
                  >
                    <div className="text-[11px] text-amber-400 font-semibold mb-1">{rp.category}</div>
                    <div className="text-sm font-bold text-stone-100 group-hover:text-amber-300 line-clamp-2">
                      {rp.title}
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-stone-400 group-hover:text-amber-400">
                      <span>Đọc tiếp</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
