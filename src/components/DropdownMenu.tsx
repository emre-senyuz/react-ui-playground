import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { ChevronDown } from 'lucide-react';
export interface MenuItem { label: string; onSelect: () => void; destructive?: boolean }
export interface DropdownMenuProps { label: string; items: MenuItem[] }
export function DropdownMenu({ label, items }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const first = useRef(0);
  const id = useId();
  useEffect(() => { if (open) refs.current[first.current]?.focus(); }, [open]);
  useEffect(() => { const outside = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); }; document.addEventListener('pointerdown', outside); return () => document.removeEventListener('pointerdown', outside); }, []);
  function key(e: KeyboardEvent) {
    const index = refs.current.findIndex(el => el === document.activeElement);
    let next = index;
    if (e.key === 'ArrowDown') next = (index + 1) % items.length;
    else if (e.key === 'ArrowUp') next = (index - 1 + items.length) % items.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    else if (e.key === 'Escape') { e.preventDefault(); setOpen(false); trigger.current?.focus(); return; }
    else if (e.key === 'Tab') { setOpen(false); return; }
    else if (e.key.length === 1) { next = items.findIndex((item, i) => i > index && item.label.toLowerCase().startsWith(e.key.toLowerCase())); if (next < 0) next = items.findIndex(item => item.label.toLowerCase().startsWith(e.key.toLowerCase())); }
    else return;
    e.preventDefault(); refs.current[next]?.focus();
  }
  return <div className="dropdown" ref={root}><button ref={trigger} className="button secondary" aria-haspopup="menu" aria-expanded={open} aria-controls={open ? id : undefined} onClick={() => { first.current = 0; setOpen(!open); }} onKeyDown={e => { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); first.current = e.key === 'ArrowUp' ? items.length - 1 : 0; setOpen(true); } }}>{label}<ChevronDown size={16}/></button>{open && <div className="menu" id={id} role="menu" aria-label={label} onKeyDown={key}>{items.map((item, i) => <button key={item.label} role="menuitem" tabIndex={-1} ref={el => { refs.current[i] = el; }} className={item.destructive ? 'danger' : ''} onClick={() => { setOpen(false); trigger.current?.focus(); item.onSelect(); }}>{item.label}</button>)}</div>}</div>;
}
