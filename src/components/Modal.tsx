import { useEffect, useId, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
export interface ModalProps { open: boolean; onClose: () => void; title: string; children: ReactNode }
export function Modal({ open, onClose, title, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    const previous = document.activeElement as HTMLElement | null;
    dialog.showModal();
    return () => { dialog.close(); previous?.focus(); };
  }, [open]);
  return <dialog ref={ref} aria-labelledby={titleId} onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === e.currentTarget) { const r = e.currentTarget.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) onClose(); } }} className="modal"><div className="modal-heading"><h2 id={titleId}>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Close dialog"><X size={18}/></button></div>{children}</dialog>;
}
