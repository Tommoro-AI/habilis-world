import React, { useState, useMemo, useRef, useEffect } from 'react';
// @ts-ignore
import readme from '../README.md?raw';
// @ts-ignore
import navConfig from './nav.json';
import { NavItem, Theme } from './types';
import { findContent, generateId } from './utils';
import Sidebar from './Sidebar';
import Header from './Header';
import TOC from './TOC';
import SearchModal from './SearchModal';
import MarkdownViewer from './MarkdownViewer';

export default function ReadmeViewer() {
  const [currentContent, setCurrentContent] = useState(readme);
  const [activeItemText, setActiveItemText] = useState('시작하기');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 960 : false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 960);
      if (window.innerWidth > 960) setIsSidebarOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openSearchModal = () => {
    setIsSearchOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchOpen(false);
  };

  const handleNavClick = (item: NavItem) => {
    if (item.link) {
      const content = findContent(item.link);
      if (content) {
        setCurrentContent(content);
        setActiveItemText(item.text);
        if (mainRef.current) {
          mainRef.current.scrollTo(0, 0);
        }
      }
    }
  };

  const handleSearchSelect = (item: NavItem) => {
    handleNavClick(item);
    closeSearchModal();
  };

  const currentIndex = useMemo(() => (navConfig as NavItem[]).findIndex(item => item.text === activeItemText), [activeItemText]);

  const prevItem = useMemo(() => {
    let i = currentIndex - 1;
    while (i >= 0) {
      if ((navConfig as NavItem[])[i].link) return (navConfig as NavItem[])[i];
      i--;
    }
    return null;
  }, [currentIndex]);

  const nextItem = useMemo(() => {
    let i = currentIndex + 1;
    while (i < (navConfig as NavItem[]).length) {
      if ((navConfig as NavItem[])[i].link) return (navConfig as NavItem[])[i];
      i++;
    }
    return null;
  }, [currentIndex]);

  const toc = currentContent
    .split('\n')
    .filter((line: string) => /^#{1,2}\s/.test(line))
    .map((line: string) => {
      const match = line.match(/^(#{1,2})\s+(.*)$/);
      if (!match) return null;
      const level = match[1].length;
      const text = match[2];
      const id = generateId(text);
      return { level, text, id };
    })
    .filter((item): item is { level: number; text: string; id: string } => item !== null);

  const theme: Theme = {
    bg: isDarkMode ? '#0d1117' : '#ffffff',
    text: isDarkMode ? '#c9d1d9' : '#24292f',
    border: isDarkMode ? '#30363d' : '#e1e4e8',
    navBg: isDarkMode ? '#010409' : '#f8f9fa',
    activeItemBg: isDarkMode ? 'rgba(56,139,253,0.15)' : '#e7f1ff',
    activeItemText: isDarkMode ? '#58a6ff' : '#0056b3',
    hoverItemBg: isDarkMode ? '#161b22' : '#f1f1f1',
    codeBg: isDarkMode ? 'rgba(110,118,129,0.4)' : 'rgba(175,184,193,0.2)',
    preBg: isDarkMode ? '#161b22' : '#f6f8fa',
    tableBorder: isDarkMode ? '#30363d' : '#dfe2e5',
    tableRowAlt: isDarkMode ? '#161b22' : '#f6f8fa',
    blockquoteColor: isDarkMode ? '#8b949e' : '#57606a',
    blockquoteBorder: isDarkMode ? '#30363d' : '#dfe2e5',
    link: isDarkMode ? '#58a6ff' : '#0969da',
    searchButtonBg: isDarkMode ? '#21262d' : '#f6f8fa',
    searchButtonBorder: isDarkMode ? '#30363d' : 'transparent',
    searchButtonText: isDarkMode ? '#8b949e' : '#57606a',
    modalBg: isDarkMode ? '#161b22' : '#ffffff',
    inputBg: isDarkMode ? '#0d1117' : '#ffffff',
    inputBorder: isDarkMode ? '#30363d' : '#d0d7de',
    tocHover: isDarkMode ? '#58a6ff' : '#0056b3',
    tocText: isDarkMode ? '#8b949e' : '#666',
    buttonHover: isDarkMode ? '#30363d' : '#f3f4f6',
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <style>{`
        body { margin: 0; }
        .markdown-body { background-color: transparent; font-family: "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif; line-height: 1.7; color: ${theme.text}; font-size: 16px; }
        .markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6 { margin-top: 24px; margin-bottom: 16px; font-weight: 700; line-height: 1.25; color: ${isDarkMode ? '#f0f6fc' : '#111'}; }
        .markdown-body h1 { font-size: 2.25em; padding-bottom: 0.3em; border-bottom: 1px solid ${theme.border}; }
        .markdown-body h2 { font-size: 1.75em; padding-bottom: 0.3em; border-bottom: 1px solid ${theme.border}; }
        .markdown-body h3 { font-size: 1.5em; pdding-top: 1.5em}
        .markdown-body h4 { font-size: 1.25em; }
        .markdown-body p { margin-bottom: 16px; }
        .markdown-body ul, .markdown-body ol { padding-left: 2em; margin-bottom: 16px; }
        .markdown-body li { margin-bottom: 0.5em; }
        .markdown-body li > p { margin-bottom: 0.5em; }
        .markdown-body pre { background-color: ${theme.preBg}; color: ${isDarkMode ? '#c9d1d9' : '#24292f'}; padding: 16px; border-radius: 6px; overflow: auto; margin-bottom: 16px; line-height: 1.45; border: 1px solid ${theme.border}; }
        .markdown-body code { background-color: ${theme.codeBg}; padding: 0.2em 0.4em; border-radius: 3px; font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace; font-size: 85%; color: ${isDarkMode ? '#ff7b72' : '#eb5757'}; }
        .markdown-body pre code { background-color: transparent; padding: 0; font-size: 100%; color: inherit; }
        .markdown-body blockquote { margin: 0 0 16px; padding: 0 1em; color: ${theme.blockquoteColor}; border-left: 0.25em solid ${theme.blockquoteBorder}; background-color: ${isDarkMode ? 'rgba(56,139,253,0.1)' : '#f8f9fa'}; padding-top: 8px; padding-bottom: 8px; }
        .markdown-body table { border-spacing: 0; border-collapse: collapse; display: block; width: 100%; overflow: auto; margin-bottom: 16px; }
        .markdown-body table tr { background-color: ${theme.bg}; border-top: 1px solid ${theme.border}; }
        .markdown-body table tr:nth-child(2n) { background-color: ${theme.tableRowAlt}; }
        .markdown-body table th, .markdown-body table td { padding: 10px 13px; border: 1px solid ${theme.tableBorder}; }
        .markdown-body table th { font-weight: 600; background-color: ${theme.tableRowAlt}; }
        .markdown-body img { max-width: 100%; box-sizing: content-box; background-color: ${theme.bg}; border: 1px solid ${theme.border}; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .markdown-body a { color: ${theme.link}; text-decoration: none; }
        .markdown-body a:hover { text-decoration: underline; }
        .markdown-body hr { height: 0.25em; padding: 0; margin: 24px 0; background-color: ${theme.border}; border: 0; }
      `}</style>

      <Sidebar
        navConfig={navConfig}
        activeItemText={activeItemText}
        handleNavClick={handleNavClick}
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        theme={theme}
      />

      {isMobile && isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 40,
          }}
        />
      )}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100%', backgroundColor: theme.bg }}>
        <Header
          openSearchModal={openSearchModal}
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          theme={theme}
        />
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <MarkdownViewer
            content={currentContent}
            prevItem={prevItem}
            nextItem={nextItem}
            handleNavClick={handleNavClick}
            theme={theme}
            mainRef={mainRef}
          />
          <TOC toc={toc} theme={theme} isMobile={isMobile} />
        </div>
      </div>
      {isSearchOpen && (
        <SearchModal
          navConfig={navConfig}
          handleSearchSelect={handleSearchSelect}
          closeSearchModal={closeSearchModal}
          theme={theme}
        />
      )}
    </div>
  );
}
