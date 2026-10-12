import { useId, useRef, useState, type ReactNode } from 'react';
export interface TabItem { label: string; content: ReactNode }
export interface TabsProps { items: TabItem[]; label: string }
export function Tabs({ items, label }: TabsProps) {
  const [active, setActive] = useState(0); const id = useId(); const refs = useRef<(HTMLButtonElement | null)[]>([]);
  return <div className="tabs"><div role="tablist" aria-label={label} className="tab-list">{items.map((item, i) => <button key={item.label} ref={el => { refs.current[i] = el; }} role="tab" id={`${id}-tab-${i}`} aria-controls={`${id}-panel-${i}`} aria-selected={active === i} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={e => { let next: number; if (e.key === 'ArrowRight') next = (i + 1) % items.length; else if (e.key === 'ArrowLeft') next = (i - 1 + items.length) % items.length; else if (e.key === 'Home') next = 0; else if (e.key === 'End') next = items.length - 1; else return; e.preventDefault(); setActive(next); refs.current[next]?.focus(); }}>{item.label}</button>)}</div>{items.map((item, i) => <div key={item.label} role="tabpanel" id={`${id}-panel-${i}`} aria-labelledby={`${id}-tab-${i}`} tabIndex={0} hidden={active !== i} className="tab-panel">{item.content}</div>)}</div>;
}
