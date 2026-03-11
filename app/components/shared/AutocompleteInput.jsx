"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { FiMapPin, FiNavigation } from "react-icons/fi";
import airports from "../../../data/airports.json";

export default function AutocompleteInput({
  placeholder,
  wrapperClassName = "",
  inputClassName = "",
  onSelect,
  value: controlledValue,
  onChange,
  emptyText,
  required = false,
  excludeId = null,
  isSaudiOnly = false,
}) {
  const [internalValue, setInternalValue] = useState("");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const isControlled = typeof controlledValue === "string";
  const value = isControlled ? controlledValue : internalValue;
  const wrapperRef = useRef(null);
  const listId = useId();

  const items = useMemo(() => {
    if (!value || value.length < 1) return [];
    
    const query = value.toLowerCase();
    return airports
      .filter((airport) => {
        // Exclusion logic: don't show the airport selected in the other field
        if (excludeId && airport.id === excludeId) return false;
        
        // Saudi Only filter
        if (isSaudiOnly && airport.country !== "Saudi Arabia") return false;

        return (
          airport.name.toLowerCase().includes(query) ||
          airport.city.toLowerCase().includes(query) ||
          airport.iata.toLowerCase().includes(query)
        );
      })
      .slice(0, 8);
  }, [value, excludeId, isSaudiOnly]);

  function setValue(nextValue) {
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
  }

  useEffect(() => {
    function onClickOutside(event) {
      if (!wrapperRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleKeyDown(event) {
    if (!open || items.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlighted((prev) => (prev + 1) % items.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlighted((prev) => (prev - 1 + items.length) % items.length);
    }

    if (event.key === "Enter") {
      if (highlighted >= 0) {
        event.preventDefault();
        const selected = items[highlighted];
        handleSelect(selected);
      }
    }

    if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const handleSelect = (airport) => {
    const displayValue = `${airport.city} (${airport.iata})`;
    setValue(displayValue);
    onSelect?.(airport); // Pass the full airport object
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className={`relative w-full ${wrapperClassName}`}>
      <div className="flex items-center gap-2">
        <FiMapPin className="text-muted" size={18} />
        <input
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setOpen(true);
          }}
          onFocus={() => value.trim().length >= 1 && items.length > 0 && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full text-base outline-none ${inputClassName}`}
          required={required}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
        />
      </div>

      {open && items.length > 0 ? (
        <div
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 lg:left-0 lg:right-auto lg:min-w-[340px] top-[calc(100%+8px)] z-50 max-h-[320px] overflow-auto rounded-lg border border-border bg-white shadow-2 animate-in fade-in zoom-in-95 duration-100"
        >
          <div className="p-3 border-b border-subtle bg-subtle/30 text-[10px] font-bold text-muted uppercase tracking-wider">
            Matching Airports
          </div>
          {items.map((item, index) => (
            <button
              key={`${item.id}-${index}`}
              role="option"
              aria-selected={highlighted === index}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => handleSelect(item)}
              className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-all ${
                highlighted === index ? "bg-primary/10 pl-5 border-l-4 border-link" : "hover:bg-subtle/50"
              }`}
              type="button"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className={`p-2 rounded-full transition-colors ${highlighted === index ? "bg-link text-white" : "bg-subtle text-muted"}`}>
                  <FiNavigation className="w-3.5 h-3.5 rotate-45" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="font-bold text-sm text-text truncate">
                    {item.city}, {item.country}
                  </span>
                  <span className="text-[11px] text-muted truncate">
                    {item.name}
                  </span>
                </div>
              </div>
              <span className={`text-xs font-black px-2 py-1 rounded shrink-0 transition-colors ${highlighted === index ? "bg-link text-white" : "bg-link/10 text-link"}`}>
                {item.iata}
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
