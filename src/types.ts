export type NavItem = {
  tag: string;
  text: string;
  link?: string;
};

export type TocItem = {
  level: number;
  text: string;
  id: string;
};

export type Theme = {
  bg: string;
  text: string;
  border: string;
  navBg: string;
  activeItemBg: string;
  activeItemText: string;
  hoverItemBg: string;
  codeBg: string;
  preBg: string;
  tableBorder: string;
  tableRowAlt: string;
  blockquoteColor: string;
  blockquoteBorder: string;
  link: string;
  searchButtonBg: string;
  searchButtonBorder: string;
  searchButtonText: string;
  modalBg: string;
  inputBg: string;
  inputBorder: string;
  tocHover: string;
  tocText: string;
  buttonHover: string;
};