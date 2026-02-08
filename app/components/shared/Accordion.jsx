'use client';

import { useId, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export default function Accordion({ items, defaultOpen = null }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(defaultOpen);

  return (
    <div className="grid gap-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-btn-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.title} className="rounded-md border border-border bg-white">
            <button
              id={buttonId}
              aria-controls={panelId}
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-base"
              type="button"
            >
              <span className="font-semibold">{item.title}</span>
              <span
                className={`transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-primary' : 'text-muted'
                }`}
              >
                <FiChevronDown />
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`${
                isOpen ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden px-4 text-sm text-muted transition-all duration-200`}
            >
              <p>{item.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
