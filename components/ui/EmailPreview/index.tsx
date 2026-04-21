import { render } from "react-email";
import { useEffect, useRef, useState } from "react";

type EmailPreviewProps = {
  email: React.ReactElement;
  height?: number;
};

export const EmailPreview = ({ email, height = 600 }: EmailPreviewProps) => {
  const [html, setHtml] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    render(email).then(setHtml);
  }, [email]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !html) return;
    const doc = iframe.contentDocument;
    if (!doc) return;
    doc.open();
    doc.write(html);
    doc.close();
  }, [html]);

  return (
    <iframe
      ref={iframeRef}
      style={{ width: "100%", height, border: "none", borderRadius: "8px" }}
      title="Email preview"
    />
  );
};
