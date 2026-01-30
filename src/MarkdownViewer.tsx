import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import rehypeRaw from 'rehype-raw';
import remarkAdmonitions from "./plugins/remarkAdmonitions";
import { NavItem, Theme } from './types';
import { generateId } from './utils';


function normalizeKind(kind: string) {
  if (kind === 'info') return 'note';
  if (kind === 'note' || kind === 'warning' || kind === 'tip' || kind === 'danger') return kind;
  return 'note';
}

function kindLabelFor(kind: string) {
  switch (kind) {
    case 'warning': return 'Warning';
    case 'danger': return 'Danger';
    case 'tip': return 'Tip';
    default: return 'Note';
  }
}

type MarkdownViewerProps = {
  content: string;
  prevItem: NavItem | null;
  nextItem: NavItem | null;
  handleNavClick: (item: NavItem) => void;
  theme: Theme;
  mainRef: React.RefObject<HTMLElement>;
};

export default function MarkdownViewer({
  content,
  prevItem,
  nextItem,
  handleNavClick,
  theme,
  mainRef,
}: MarkdownViewerProps) {
  return (
    <main
      ref={mainRef}
      style={{
        flex: 1,
        padding: '40px 60px',
        minWidth: 0,
        overflowY: 'auto',
        boxSizing: 'border-box',
        backgroundColor: theme.bg
      }}
    >
      <div className="markdown-body" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkDirective, remarkAdmonitions]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ node: _node, children, ...props }: any) => (
              <h1 id={generateId(String(children))} {...props}>
                {children}
              </h1>
            ),
            h2: ({ node: _node, children, ...props }: any) => (
              <h2 id={generateId(String(children))} {...props}>
                {children}
              </h2>
            ),
            img: ({ node: _node, ...props }: any) => {
              let src = props.src;
              if (src && src.startsWith('/')) {
                src = (import.meta as any).env.BASE_URL + src.substring(1);
              }
              return (
                <img
                  {...props}
                  src={src}
                  style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '10px 0' }}
                />
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>

        {/* 네비게이션 버튼 영역은 그대로 */}
        <div
          style={{
            marginTop: '60px',
            paddingTop: '20px',
            borderTop: `1px solid ${theme.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px'
          }}
        >
          {prevItem ? (
            <button
              onClick={() => handleNavClick(prevItem)}
              style={{
                flex: 1,
                textAlign: 'left',
                padding: '16px',
                border: `1px solid ${theme.border}`,
                borderRadius: '6px',
                backgroundColor: theme.bg,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                color: theme.text
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme.activeItemText;
                e.currentTarget.style.color = theme.activeItemText;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.border;
                e.currentTarget.style.color = theme.text;
              }}
            >
              <span style={{ fontSize: '12px', color: '#666' }}>Previous</span>
              <span style={{ fontWeight: '600' }}>{prevItem.text}</span>
            </button>
          ) : (
            <div style={{ flex: 1 }} />
          )}

          {nextItem ? (
            <button
              onClick={() => handleNavClick(nextItem)}
              style={{
                flex: 1,
                textAlign: 'right',
                padding: '16px',
                border: `1px solid ${theme.border}`,
                borderRadius: '6px',
                backgroundColor: theme.bg,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                alignItems: 'flex-end',
                color: theme.text
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme.activeItemText;
                e.currentTarget.style.color = theme.activeItemText;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.border;
                e.currentTarget.style.color = theme.text;
              }}
            >
              <span style={{ fontSize: '12px', color: '#666' }}>Next</span>
              <span style={{ fontWeight: '600' }}>{nextItem.text}</span>
            </button>
          ) : (
            <div style={{ flex: 1 }} />
          )}
        </div>
      </div>
    </main>
  );
}
