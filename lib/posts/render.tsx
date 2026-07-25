import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export type TiptapMark = {
  type: string;
  attrs?: Record<string, unknown>;
};

export type TiptapNode = {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TiptapNode[];
  marks?: TiptapMark[];
  text?: string;
};

export type TiptapDoc = {
  type: "doc";
  content?: TiptapNode[];
};

const attr = (node: TiptapNode, key: string) =>
  node.attrs?.[key] === undefined || node.attrs[key] === null
    ? undefined
    : String(node.attrs[key]);

/** Only http(s) and mailto survive; javascript: and data: URLs are dropped. */
function safeHref(value: string | undefined) {
  if (!value) return undefined;
  try {
    const url = new URL(value, "https://example.com");
    if (["http:", "https:", "mailto:"].includes(url.protocol)) return value;
  } catch {
    return undefined;
  }
  return undefined;
}

function applyMarks(text: ReactNode, marks: TiptapMark[] | undefined, key: string) {
  if (!marks?.length) return text;

  return marks.reduce<ReactNode>((acc, mark, index) => {
    const markKey = `${key}-m${index}`;
    switch (mark.type) {
      case "bold":
        return <strong key={markKey} className="font-medium">{acc}</strong>;
      case "italic":
        return <em key={markKey}>{acc}</em>;
      case "strike":
        return <s key={markKey}>{acc}</s>;
      case "code":
        return (
          <code
            key={markKey}
            className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.9em] text-zinc-800"
          >
            {acc}
          </code>
        );
      case "link": {
        const href = safeHref(
          mark.attrs?.href === undefined ? undefined : String(mark.attrs.href),
        );
        if (!href) return acc;
        return (
          <Link
            key={markKey}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-900"
          >
            {acc}
          </Link>
        );
      }
      default:
        return acc;
    }
  }, text);
}

function renderNodes(nodes: TiptapNode[] | undefined, keyPrefix: string) {
  if (!nodes?.length) return null;
  return nodes.map((node, index) => renderNode(node, `${keyPrefix}-${index}`));
}

function renderNode(node: TiptapNode, key: string): ReactNode {
  switch (node.type) {
    case "text":
      return applyMarks(node.text ?? "", node.marks, key);

    case "paragraph":
      return (
        <p
          key={key}
          className="mt-5 font-raleway text-base leading-relaxed text-zinc-700 sm:text-lg"
        >
          {renderNodes(node.content, key)}
        </p>
      );

    case "heading": {
      const level = Number(node.attrs?.level ?? 2);
      const Tag = (level === 2 ? "h2" : level === 3 ? "h3" : "h4") as
        | "h2"
        | "h3"
        | "h4";
      const size =
        level === 2
          ? "text-2xl sm:text-3xl"
          : level === 3
            ? "text-xl sm:text-2xl"
            : "text-lg sm:text-xl";
      return (
        <Tag
          key={key}
          className={`mt-10 font-poppins font-medium tracking-tight text-zinc-900 ${size}`}
        >
          {renderNodes(node.content, key)}
        </Tag>
      );
    }

    case "bulletList":
      return (
        <ul key={key} className="mt-5 space-y-2">
          {renderNodes(node.content, key)}
        </ul>
      );

    case "orderedList":
      return (
        <ol key={key} className="mt-5 list-decimal space-y-2 pl-5">
          {renderNodes(node.content, key)}
        </ol>
      );

    case "listItem":
      return (
        <li
          key={key}
          className="font-raleway text-base leading-relaxed text-zinc-700 marker:text-zinc-400 sm:text-lg [&>p]:mt-0"
        >
          {renderNodes(node.content, key)}
        </li>
      );

    case "blockquote":
      return (
        <blockquote
          key={key}
          className="mt-6 border-l-2 border-zinc-300 pl-5 font-merriweather text-lg leading-relaxed font-light text-zinc-800 italic sm:text-xl [&>p]:mt-0"
        >
          {renderNodes(node.content, key)}
        </blockquote>
      );

    case "codeBlock":
      return (
        <div key={key} className="mt-6 overflow-hidden rounded-xl bg-zinc-100">
          <div className="overflow-x-auto">
            <pre className="px-4 py-4 sm:px-5">
              <code className="font-mono text-xs leading-relaxed whitespace-pre text-zinc-800 sm:text-sm">
                {node.content?.map((child) => child.text ?? "").join("")}
              </code>
            </pre>
          </div>
        </div>
      );

    case "image": {
      const src = attr(node, "src");
      if (!src) return null;
      return (
        <figure key={key} className="mt-8">
          <div className="overflow-hidden rounded-xl bg-zinc-100">
            <Image
              src={src}
              alt={attr(node, "alt") ?? ""}
              width={Number(node.attrs?.width ?? 1600)}
              height={Number(node.attrs?.height ?? 1000)}
              className="h-auto w-full object-cover"
            />
          </div>
          {attr(node, "title") ? (
            <figcaption className="mt-3 font-raleway text-sm text-zinc-600 sm:text-base">
              {attr(node, "title")}
            </figcaption>
          ) : null}
        </figure>
      );
    }

    case "horizontalRule":
      return <hr key={key} className="mt-10 border-zinc-200" />;

    case "hardBreak":
      return <br key={key} />;

    default:
      return renderNodes(node.content, key);
  }
}

export function RenderedPost({ doc }: { doc: TiptapDoc }) {
  return <>{renderNodes(doc.content, "n")}</>;
}
