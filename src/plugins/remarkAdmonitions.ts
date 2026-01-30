import { visit } from "unist-util-visit";

export default function remarkAdmonitions() {
  return (tree: any) => {
    visit(tree, (node: any) => {
      if (node.type !== "containerDirective") return;

      const kind = node.name || "note";
      
      let title = kind.toUpperCase();
      const firstChild = node.children[0];
      
      if (firstChild?.data?.directiveLabel) {
        title = firstChild.children[0]?.value || title;
        node.children.shift();
      } else if (node.attributes?.label) {
        title = node.attributes.label;
      }

      const data = node.data || (node.data = {});
      
      data.hName = "div";
      data.hProperties = {
        className: ["admonition", `admonition-${kind}`],
      };

      const titleNode = {
        type: "paragraph",
        data: {
          hName: "div",
          hProperties: { className: ["admonition-title"] },
        },
        children: [
            { type: "text", value: ` ${title}` }
        ],
      };

      const contentNode = {
          type: "paragraph",
          data: {
              hName: "div",
              hProperties: { className: ["admonition-content"] }
          },
          children: node.children
      };

      node.children = [titleNode, contentNode];
    });
  };
}

// function iconFor(kind: string) {
//     switch (kind) {
//         case "info": return "ℹ️";
//         case "warning": return "⚠️";
//         case "danger": return "🔥";
//         case "tip": return "💡";
//         default: return "📝";
//     }
// }