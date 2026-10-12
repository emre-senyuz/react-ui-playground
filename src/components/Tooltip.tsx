import { useId, useState, type ReactNode } from 'react';
export interface TooltipProps { content: string; children: ReactNode; label: string }
export function Tooltip({ content, children, label }: TooltipProps) {
  const id = useId(); const [open, setOpen] = useState(false);
  return <span className="tooltip-anchor" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}><button className="icon-button tooltip-trigger" aria-label={label} aria-describedby={open ? id : undefined} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} onClick={() => setOpen(v => !v)} onKeyDown={e => { if (e.key === 'Escape') setOpen(false); }}>{children}</button>{open && <span className="tooltip" role="tooltip" id={id}>{content}</span>}</span>;
}
