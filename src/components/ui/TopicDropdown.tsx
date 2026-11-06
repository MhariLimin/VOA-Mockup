import { useEffect, useRef, useState } from 'react';

interface TopicGroup {
  label: string;
  topics: readonly string[];
}

/* The article topic filter, laid out like the columns of the header's Services menu (.nav-mega). It
   opens on click or Enter; Escape or a click outside closes it, as in the header. */
export function TopicDropdown({ label, value, groups, counts, onChange }: {
  label: string;
  value: string;
  groups: readonly TopicGroup[];
  counts: Readonly<Record<string, number>>;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  const choose = (next: string) => {
    onChange(next);
    setOpen(false);
    trigger.current?.focus();
  };

  return <div className="topic-dropdown" ref={root}>
    <button className="topic-trigger" type="button" ref={trigger} aria-expanded={open} aria-controls="topic-options" onClick={() => setOpen((current) => !current)}>
      <span><small>{label}</small>{value}</span>
      <svg className="nav-chevron" viewBox="0 0 12 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m1 1 5 5 5-5" /></svg>
    </button>
    <div className="nav-popover nav-mega" id="topic-options" data-open={open}>
      {groups.map((group) => (
        <div className="nav-mega-column" key={group.label}>
          <span className="nav-mega-label">{group.label}</span>
          {group.topics.map((topic) => (
            <button className="topic-option" type="button" key={topic} aria-current={topic === value} onClick={() => choose(topic)}>
              <span>{topic}</span><small>{counts[topic] ?? 0}</small>
            </button>
          ))}
        </div>
      ))}
    </div>
  </div>;
}
