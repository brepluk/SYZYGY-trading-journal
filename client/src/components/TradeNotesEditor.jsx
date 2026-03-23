import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

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

async function selectImageFileFromDevice() {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => resolve(input.files?.[0] ?? null);
    input.click();
  });
}

async function uploadImageToCloudinary(file) {
  const formData = new FormData();
  formData.append("image", file);
  const { data } = await customFetch.post("/trades/upload-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data?.url;
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

    const toolbar = q.getModule("toolbar");
    toolbar?.addHandler("image", async () => {
      try {
        const file = await selectImageFileFromDevice();
        if (!file) return;
        const imageUrl = await uploadImageToCloudinary(file);
        if (!imageUrl) {
          toast.error("Image upload failed");
          return;
        }
        const range = q.getSelection(true);
        const index = range ? range.index : q.getLength();
        q.insertEmbed(index, "image", imageUrl, Quill.sources.USER);
        q.setSelection(index + 1, Quill.sources.SILENT);
      } catch (error) {
        toast.error(
          error?.response?.data?.message ?? "Could not upload image. Try again.",
        );
      }
    });

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
