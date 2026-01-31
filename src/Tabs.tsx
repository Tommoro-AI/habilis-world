// import React, { useState } from 'react';
// import './markdown.css'; 

// export const Tabs = ({ children }: any) => {
//   const [activeIdx, setActiveIdx] = useState(0);

//   const allChildren = React.Children.toArray(children);
//   const tabItems = allChildren.filter(
//     (child) => React.isValidElement(child)
//   ) as React.ReactElement[];

//   return (
//     <div className="tab-container">
//       <div className="tab-buttons">
//         {tabItems.map((child, idx) => {
//           const label = child.props.title || child.props.label || `Tab ${idx + 1}`;
//           return (
//             <button
//               key={idx} 
//               className={activeIdx === idx ? 'active' : ''}
//               onClick={() => setActiveIdx(idx)}
//             >
//               {label}
//             </button>
//           );
//         })}
//       </div>
//       <div className="tab-content-box">
//         {tabItems.length > 0 ? tabItems[activeIdx] : null}
//       </div>
//     </div>
//   );
// };

// export const TabItem = ({ children }: any) => {
//   return <div className="tab-item-content">{children}</div>;
// };