import React from 'react';
import { NavItem, Theme } from './types';

type SidebarProps = {
  navConfig: NavItem[];
  activeItemText: string;
  handleNavClick: (item: NavItem) => void;
  isMobile: boolean;
  isSidebarOpen: boolean;
  theme: Theme;
};

export default function Sidebar({
  navConfig,
  activeItemText,
  handleNavClick,
  isMobile,
  isSidebarOpen,
  theme,
}: SidebarProps) {
  return (
    <nav style={{
      width: '280px',
      borderRight: `1px solid ${theme.border}`,
      padding: '20px',
      backgroundColor: theme.navBg,
      flexShrink: 0,
      height: '100%',
      overflowY: 'auto',
      boxSizing: 'border-box',
      fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
      position: isMobile ? 'fixed' : 'static',
      left: isMobile ? (isSidebarOpen ? 0 : '-280px') : 'auto',
      top: 0,
      bottom: 0,
      zIndex: 50,
      transition: 'left 0.3s ease',
      boxShadow: isMobile && isSidebarOpen ? '0 0 20px rgba(0,0,0,0.2)' : 'none',
      visibility: isMobile && !isSidebarOpen ? 'hidden' : 'visible',
    }}>
      <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.2rem', color: theme.text }}>
        <a href="https://tommoro.ai" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          Tommoro Robotics
        </a>
      </h3>
      <div>
        {navConfig.map((item, index) => (
          <div key={index} style={{ marginBottom: '5px' }}>
            {item.link ? (
              <button
                onClick={() => handleNavClick(item)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 12px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: activeItemText === item.text ? theme.activeItemBg : 'transparent',
                  color: activeItemText === item.text ? theme.activeItemText : theme.text,
                  fontWeight: activeItemText === item.text ? '600' : '400',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s',
                }}
              >
                {item.text}
              </button>
            ) : (
              <div style={{ fontWeight: 'bold', color: theme.text, marginTop: '15px', marginBottom: '5px', fontSize: '14px', paddingLeft: '12px' }}>
                {item.text}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}