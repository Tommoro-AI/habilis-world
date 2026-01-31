// import { visit } from "unist-util-visit";

// export default function remarkTabs() {
//   return (tree: any) => {
//     visit(tree, (node: any) => {
//       if (node.type === "containerDirective" && node.name === "tabs") {
//         node.data = node.data || {};
//         node.data.hName = "tabs";
//         node.data.hProperties = node.data.hProperties || {};

//         if (node.attributes?.title) node.data.hProperties.title = node.attributes.title;
//         if (node.attributes?.default) node.data.hProperties.default = node.attributes.default;

//         return;
//       }

//       if (node.type === "containerDirective" && node.name === "tab") {
//         node.data = node.data || {};
//         node.data.hName = "tab-item";
//         node.data.hProperties = node.data.hProperties || {};

//         const title =
//           node.attributes?.title ??
//           node.attributes?.label ??
//           node.label;

//         if (title) node.data.hProperties.title = title;
//         return;
//       }
//     });
//   };
// }
