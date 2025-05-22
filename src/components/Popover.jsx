import { createPortal } from "react-dom";

export default function Popover({ children }) {
  return createPortal(
    <div className="popover">{children}</div>,
    document.body
  );
}
