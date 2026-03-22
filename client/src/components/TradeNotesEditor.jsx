import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ align: [] }],
  ["link", "image"],
  ["clean"],
];

function setEditorHtml(quill, html) {
  const safe = html?.trim() ? html : "<p><br></p>";
  const delta = quill.clipboard.convert({ html: safe, text: "" });
  quill.setContents(delta, Quill.sources.SILENT);
}

/**
 * Quill 2 “Snow” editor without react-quill (that package uses findDOMNode,
 * which React 19 removed). Parent should pass key={trade.id} to reset when
 * switching trades or after a server refresh (e.g. key with trade.updatedAt).
 */
export default function TradeNotesEditor({ value, onChange, placeholder }) {
  const hostRef = useRef(null);
  const quillRef = useRef(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const q = new Quill(el, {
      theme: "snow",
      placeholder: placeholder ?? "",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
      },
    });
    quillRef.current = q;

    setEditorHtml(q, value ?? "");

    const handleTextChange = () => {
      onChangeRef.current(q.root.innerHTML);
    };
    q.on("text-change", handleTextChange);

    return () => {
      q.off("text-change", handleTextChange);
      const toolbar = q.getModule("toolbar");
      if (toolbar?.container?.parentNode) {
        toolbar.container.remove();
      }
      el.classList.remove("ql-container", "ql-snow");
      el.innerHTML = "";
      quillRef.current = null;
    };
    // Intentionally run once per mount: parent resets via `key` when trade or
    // server data changes. Do not list `value` here or Quill remounts every keystroke.
  }, []);

  return <div className="trade-notes-editor" ref={hostRef} />;
}
