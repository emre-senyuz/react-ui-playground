import { useId, useState, type ReactNode } from 'react';
import { Plus } from 'lucide-react';
export interface AccordionProps { items: { title: string; content: ReactNode }[]; multiple?: boolean }
export function Accordion({ items, multiple = false }: AccordionProps) {
  const [expanded, setExpanded] = useState<number[]>([]); const id = useId();
  return <div className="accordion">{items.map((item, i) => { const open = expanded.includes(i); return <div key={item.title} className="accordion-item"><h3><button id={`${id}-heading-${i}`} aria-expanded={open} aria-controls={`${id}-content-${i}`} onClick={() => setExpanded(old => open ? old.filter(n => n !== i) : multiple ? [...old, i] : [i])}>{item.title}<Plus size={16} className={open ? 'rotated' : ''}/></button></h3><div id={`${id}-content-${i}`} role="region" aria-labelledby={`${id}-heading-${i}`} hidden={!open} className="accordion-content">{item.content}</div></div>; })}</div>;
}
