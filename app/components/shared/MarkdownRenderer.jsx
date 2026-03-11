"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * A modular Markdown renderer that applies consistent Tailwind styling
 * to markdown elements. Use this whenever you need to render content
 * from an API that contains Markdown.
 */
export default function MarkdownRenderer({ content, className = "" }) {
  if (!content) return null;

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-2xl font-bold mb-4 mt-8" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-xl font-bold mb-3 mt-6" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-lg font-bold mb-2 mt-4" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-4 leading-relaxed text-muted" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-5 mb-4 space-y-2" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-5 mb-4 space-y-2" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="text-muted leading-relaxed" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-text" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a
              className="text-link hover:underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-subtle pl-4 italic text-muted mb-4"
              {...props}
            />
          ),
          code: ({ node, inline, ...props }) => (
            <code
              className={`${
                inline
                  ? "bg-subtle px-1.5 py-0.5 rounded text-sm font-mono text-primary"
                  : "block bg-subtle p-4 rounded-sm text-sm font-mono text-primary overflow-x-auto mb-4"
              }`}
              {...props}
            />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto mb-6">
              <table
                className="w-full border-collapse border border-border"
                {...props}
              />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th
              className="bg-subtle border border-border px-4 py-2 text-left font-semibold"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-border px-4 py-2" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
