import React from 'react';
import { TocItem, Theme } from './types';

type TOCProps = {
  toc: TocItem[];
  theme: Theme;
  isMobile: boolean;
};

export default function TOC({ toc, theme, isMobile }: TOCProps) {
  return (
    <aside style={{
      width: '240px',
      padding: '40px 20px',
      flexShrink: 0,
      overflowY: 'auto',
      boxSizing: 'border-box',
      fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
      backgroundColor: theme.bg,
      display: isMobile ? 'none' : 'block'
    }}>
      {toc.length > 0 && (
        <>
          <h4 style={{ marginTop: 0, marginBottom: '10px', color: theme.tocText, fontSize: '0.9rem', textTransform: 'uppercase' }}>On this page</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderLeft: `2px solid ${theme.border}` }}>
            {toc.map((item, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                <a
                  href={`#${item.id}`}
                  style={{
                    display: 'block',
                    paddingLeft: '15px',
                    marginLeft: '-2px',
                    borderLeft: '2px solid transparent',
                    color: theme.tocText,
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    paddingTop: '2px',
                    paddingBottom: '2px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme.tocHover;
                    e.currentTarget.style.borderLeftColor = theme.tocHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme.tocText;
                    e.currentTarget.style.borderLeftColor = 'transparent';
                  }}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
}