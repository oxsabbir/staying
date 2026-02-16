'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { FiMapPin } from 'react-icons/fi';

const GEOAPIFY_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_KEY;

function useDebouncedValue(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default function AutocompleteInput({
  placeholder,
  wrapperClassName = '',
  inputClassName = '',
  onSelect,
  value: controlledValue,
  onChange,
  filterCountryCode = 'sa',
  emptyText,
}) {
  const [internalValue, setInternalValue] = useState('');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [highlighted, setHighlighted] = useState(-1);
  const [loading, setLoading] = useState(false);
  const isControlled = typeof controlledValue === 'string';
  const value = isControlled ? controlledValue : internalValue;
  const debounced = useDebouncedValue(value, 250);
  const wrapperRef = useRef(null);
  const listId = useId();

  function setValue(nextValue) {
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
  }

  useEffect(() => {
    if (!debounced || debounced.trim().length < 3) {
      setItems([]);
      setOpen(false);
      setHighlighted(-1);
      return;
    }

    if (!GEOAPIFY_KEY) {
      setItems([]);
      setOpen(false);
      return;
    }

    let active = true;
    setLoading(true);

    const url = new URL('https://api.geoapify.com/v1/geocode/autocomplete');
    url.searchParams.set('text', debounced);
    if (filterCountryCode) {
      url.searchParams.set('filter', `countrycode:${filterCountryCode}`);
    }
    url.searchParams.set('limit', '6');
    url.searchParams.set('format', 'json');
    url.searchParams.set('apiKey', GEOAPIFY_KEY);

    fetch(url.toString())
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        const results = Array.isArray(data.results) ? data.results : [];
        const suggestions = results.map((result) => ({
          id: result.place_id,
          label: result.formatted,
          category: result.category
        }));
        setItems(suggestions);
        setOpen(true);
        setHighlighted(-1);
      })
      .catch(() => {
        if (!active) return;
        setItems([]);
        setOpen(false);
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [debounced]);

  useEffect(() => {
    function onClickOutside(event) {
      if (!wrapperRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function handleKeyDown(event) {
    if (!open || items.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlighted((prev) => (prev + 1) % items.length);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlighted((prev) => (prev - 1 + items.length) % items.length);
    }

    if (event.key === 'Enter') {
      if (highlighted >= 0) {
        event.preventDefault();
        const selected = items[highlighted];
        setValue(selected.label);
        onSelect?.(selected.label);
        setOpen(false);
      }
    }

    if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div ref={wrapperRef} className={`relative w-full ${wrapperClassName}`}>
      <div className="flex items-center gap-2">
        <FiMapPin className="text-primary" />
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onFocus={() => value.trim().length >= 3 && items.length > 0 && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full text-base outline-none ${inputClassName}`}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
        />
      </div>

      {open ? (
        <div
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-60 overflow-auto rounded-md border border-border bg-white shadow-lg"
        >
          {loading ? (
            <div className="px-3 py-2 text-sm text-muted">Searching…</div>
          ) : null}
          {!loading && items.length === 0 ? (
            <div className="px-3 py-2 text-sm text-muted">
              {emptyText || 'No results found.'}
            </div>
          ) : null}
          {items.map((item, index) => (
            <button
              key={item.id}
              role="option"
              aria-selected={highlighted === index}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                setValue(item.label);
                onSelect?.(item.label);
                setOpen(false);
              }}
              className={`flex w-full flex-col gap-1 px-3 py-2 text-left text-sm transition ${
                highlighted === index ? 'bg-primary/10' : 'hover:bg-primary/5'
              }`}
              type="button"
            >
              <span className="font-medium text-text">{item.label}</span>
              {item.category ? (
                <span className="text-xs text-muted">{item.category}</span>
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
