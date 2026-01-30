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
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});
  const [hoverKey, setHoverKey] = React.useState<string | null>(null);

  const companyBlue = '#2F6BFF';

  const toggle = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <nav
      style={{
        width: '280px',
        borderRight: `1px solid ${theme.border}`,
        padding: '20px',
        backgroundColor: theme.navBg,
        flexShrink: 0,
        height: '100%',
        overflowY: 'auto',
        boxSizing: 'border-box',
        fontFamily:
          '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
        position: isMobile ? 'fixed' : 'static',
        left: isMobile ? (isSidebarOpen ? 0 : '-280px') : 'auto',
        top: 0,
        bottom: 0,
        zIndex: 50,
        transition: 'left 0.3s ease',
        boxShadow: isMobile && isSidebarOpen ? '0 0 20px rgba(0,0,0,0.2)' : 'none',
        visibility: isMobile && !isSidebarOpen ? 'hidden' : 'visible',
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.2rem', color: theme.text }}>
        <a
          href="https://tommoro.ai"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          Tommoro Robotics
        </a>
      </h3>

      <div>
        {navConfig.map((item, index) => {
          const hasChildren = !!item.children?.length;
          const isOpen = !!expanded[item.text];

          const isActive = activeItemText === item.text;
          const isEmphasized = isOpen || isActive;

          const rowKey = `parent:${item.text}`;

          const rowBg =
            hoverKey === rowKey
              ? 'rgba(0,0,0,0.04)'
              : isActive
                ? theme.activeItemBg
                : 'transparent';

                const isH1 = item.tag === 'h1';

                const rowWeight = isH1
                  ? 700
                  : isEmphasized
                    ? 600
                    : 400;
                
                const rowFontSize = isH1 ? '15.5px' : '14px';
                
                const rowColor = isH1
                  ? theme.text  
                  : isEmphasized
                    ? companyBlue
                    : theme.text;

          const onParentClick = () => {
            if (item.link) handleNavClick(item);
            else if (hasChildren) toggle(item.text);
          };

          return (
            <div key={index} style={{ marginBottom: '6px' }}>
              <button
                type="button"
                onClick={onParentClick}
                onMouseEnter={() => setHoverKey(rowKey)}
                onMouseLeave={() => setHoverKey(null)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  textAlign: 'left',
                  padding: '9px 10px 9px 12px',
                  border: 'none',
                  borderRadius: '10px',
                  backgroundColor: rowBg,
                  color: rowColor,
                  fontWeight: rowWeight,
                  cursor: item.link || hasChildren ? 'pointer' : 'default',
                  fontSize: '14px',
                  transition: 'background-color 0.15s ease, color 0.15s ease',
                }}
              >
                <span style={{ lineHeight: 1.2 }}>{item.text}</span>

                {hasChildren ? (
                  <span
                    aria-hidden="true"
                    style={{
                      width: '18px',
                      height: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(0,0,0,0.45)', 
                      transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.15s ease',
                      userSelect: 'none',
                      fontSize: '18px',
                      fontWeight: 600,
                    }}
                  >
                    ›
                  </span>
                ) : (
                  <span style={{ width: '18px', height: '18px' }} />
                )}
              </button>

              {hasChildren && isOpen && (
                <div style={{ marginTop: '6px', paddingLeft: '14px' }}>
                  {item.children!.map((child, cIdx) => {
                    const childKey = `child:${item.text}:${child.text}`;
                    const childActive = activeItemText === child.text;

                    const childBg =
                      hoverKey === childKey
                        ? 'rgba(0,0,0,0.04)'
                        : childActive
                          ? theme.activeItemBg
                          : 'transparent';

                    const childColor = childActive ? companyBlue : theme.text;
                    const childWeight = childActive ? 600 : 400;

                    return (
                      <button
                        key={`${index}-${cIdx}`}
                        type="button"
                        onClick={() => child.link && handleNavClick(child)}
                        onMouseEnter={() => setHoverKey(childKey)}
                        onMouseLeave={() => setHoverKey(null)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          textAlign: 'left',
                          padding: '8px 10px 8px 12px',
                          border: 'none',
                          borderRadius: '10px',
                          backgroundColor: childBg,
                          color: childColor,
                          fontWeight: childWeight,
                          cursor: child.link ? 'pointer' : 'default',
                          fontSize: '13.5px',
                          transition: 'background-color 0.15s ease, color 0.15s ease',
                          marginBottom: '4px',
                        }}
                      >
                        <span>{child.text}</span>
                        <span style={{ width: '18px', height: '18px' }} />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
