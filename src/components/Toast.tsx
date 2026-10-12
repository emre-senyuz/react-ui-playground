import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';
export interface ToastMessage { id: number; title: string; description?: string; variant: 'success' | 'info' }
export function useToasts() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]); const nextId = useRef(0);
  const dismiss = useCallback((id: number) => setToasts(items => items.filter(item => item.id !== id)), []);
  const notify = useCallback((title: string, description?: string, variant: ToastMessage['variant'] = 'success') => { setToasts(items => [...items, { id: ++nextId.current, title, description, variant }]); }, []);
  return { toasts, notify, dismiss };
}
function ToastItem({ toast, dismiss }: { toast: ToastMessage; dismiss: (id: number) => void }) {
  const [paused, setPaused] = useState(false);
  useEffect(() => { if (paused) return; const timer = window.setTimeout(() => dismiss(toast.id), 5000); return () => clearTimeout(timer); }, [toast.id, dismiss, paused]);
  return <div className="toast" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}>{toast.variant === 'success' ? <CheckCircle2 className="success" size={20}/> : <Info size={20}/>}<div><strong>{toast.title}</strong>{toast.description && <p>{toast.description}</p>}</div><button className="icon-button" aria-label={`Dismiss ${toast.title}`} onClick={() => dismiss(toast.id)}><X size={16}/></button></div>;
}
export function ToastViewport({ toasts, dismiss }: { toasts: ToastMessage[]; dismiss: (id: number) => void }) {
  return <><div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{toasts.at(-1)?.title} {toasts.at(-1)?.description}</div><section className="toast-viewport" aria-label="Notifications">{toasts.slice(0, 3).map(toast => <ToastItem key={toast.id} toast={toast} dismiss={dismiss}/>)}</section></>;
}
