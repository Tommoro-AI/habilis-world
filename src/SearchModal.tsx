import React, { useState, useMemo } from 'react';
import { NavItem, Theme } from './types';
import { findContent, getSnippet } from './utils';

type SearchModalProps = {
  navConfig: NavItem[];
  handleSearchSelect: (item: NavItem) => void;
  closeSearchModal: () => void;
  theme: Theme;
};

export default function SearchModal({
  navConfig,
  handleSearchSelect,
  closeSearchModal,
  theme,
}: SearchModalProps) {
  const [modalSearchTerm, setModalSearchTerm] = useState('');

  const filteredNavItems = useMemo(() => {
    const term = modalSearchTerm.trim();
    if (!term) return [];
    const lowerTerm = term.toLowerCase();
    return navConfig
      .map((item: NavItem) => {
        if (!item.link) return null;
        const textMatch = item.text.toLowerCase().includes(lowerTerm);
        const content = findContent(item.link);
        const contentMatch = content && content.toLowerCase().includes(lowerTerm);
        if (!textMatch && !contentMatch) return null;
        return {
          item,
          snippet: content ? getSnippet(content, lowerTerm) : '',
        };
      })
      .filter((entry): entry is { item: NavItem; snippet: string } => entry !== null);
  }, [modalSearchTerm, navConfig]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 40,
      }}
    >
      <div
        style={{
          width: 'min(680px, 90vw)',
          maxHeight: '80vh',
          overflowY: 'auto',
          backgroundColor: theme.modalBg,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 30px 80px rgba(15,23,42,0.25)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: theme.text }}>문서 검색</h3>
          <button
            onClick={closeSearchModal}
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '0.9rem',
              color: '#6b7280',
              cursor: 'pointer',
            }}
          >
            닫기
          </button>
        </div>
        <input
          type="text"
          placeholder="문서 이름이나 내용으로 검색하세요."
          value={modalSearchTerm}
          onChange={(e) => setModalSearchTerm(e.target.value)}
          autoFocus
          style={{
            width: '100%',
            padding: '12px 14px',
            borderRadius: '10px',
            border: `1px solid ${theme.inputBorder}`,
            backgroundColor: theme.inputBg,
            color: theme.text,
            fontSize: '16px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        <div style={{ marginTop: '18px', minHeight: '140px' }}>
          {modalSearchTerm.trim() ? (
            filteredNavItems.length > 0 ? (
              filteredNavItems.map(({ item, snippet }, index) => (
                <div
                  key={`${item.text}-${index}`}
                  style={{
                    borderRadius: '10px',
                    border: `1px solid ${theme.border}`,
                    padding: '12px 14px',
                    marginBottom: '10px',
                    backgroundColor: theme.bg,
                  }}
                >
                  <button
                    onClick={() => handleSearchSelect(item)}
                    style={{
                      width: '100%',
                      border: 'none',
                      background: 'transparent',
                      padding: 0,
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '1rem', color: theme.text }}>{item.text}</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '4px' }}>{item.link}</div>
                    {snippet && (
                      <div style={{ fontSize: '0.85rem', color: theme.text, opacity: 0.8, marginTop: '6px', lineHeight: 1.4 }}>
                        {snippet}
                      </div>
                    )}
                  </button>
                </div>
              ))
            ) : (
              <div style={{ color: '#6b7280', fontSize: '0.95rem' }}>검색 결과가 없습니다.</div>
            )
          ) : (
            <div style={{ color: '#6b7280', fontSize: '0.95rem' }}>검색어를 입력하면 문서를 찾을 수 있습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}