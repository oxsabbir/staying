"use client";

import { useMemo, useState } from "react";
import { FiCalendar, FiUsers } from "react-icons/fi";

function buildMonth(year, month) {
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];

  for (let i = 0; i < startWeekday; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);

  return { year, month, cells };
}

function formatShortDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function DateRangeDropdown({
  startDate,
  endDate,
  onChange,
  placeholder = "Departure - Return",
  wrapperClassName = "",
  singleDateMode = false,
}) {
  const [open, setOpen] = useState(false);
  const today = useMemo(() => new Date(), []);
  const calendar = useMemo(() => {
    return buildMonth(today.getFullYear(), today.getMonth());
  }, [today]);

  const monthLabel = new Date(
    calendar.year,
    calendar.month,
    1,
  ).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const toIsoDate = (day) => {
    const month = String(calendar.month + 1).padStart(2, "0");
    const date = String(day).padStart(2, "0");
    return `${calendar.year}-${month}-${date}`;
  };

  const handleDaySelect = (day) => {
    const selected = new Date(calendar.year, calendar.month, day);
    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    if (selected < todayDate) return;

    const iso = toIsoDate(day);

    if (singleDateMode) {
      onChange({ startDate: iso, endDate: "" });
      setOpen(false);
      return;
    }

    if (!startDate || (startDate && endDate)) {
      onChange({ startDate: iso, endDate: "" });
      return;
    }

    if (iso >= startDate) {
      onChange({ startDate, endDate: iso });
    } else {
      onChange({ startDate: iso, endDate: "" });
    }
  };

  const label = singleDateMode
    ? startDate
      ? formatShortDate(startDate)
      : placeholder
    : startDate
      ? `${formatShortDate(startDate)}${endDate ? ` - ${formatShortDate(endDate)}` : " - Select end date"}`
      : placeholder;

  return (
    <div className={`relative ${wrapperClassName}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-2 text-left"
      >
        <span className="flex min-w-0 items-center gap-2">
          <FiCalendar className="shrink-0 text-muted" />
          <span className="truncate text-sm text-text">{label}</span>
        </span>
        <span className="text-xs text-muted">▾</span>
      </button>

      {open ? (
        <div className="absolute left-0 top-[calc(100%+8px)] z-[999] w-[min(320px,calc(100vw-2.5rem))] max-w-[calc(100vw-2.5rem)] rounded-md border border-border bg-white p-3 shadow-lg">
          <div className="text-center text-xs font-semibold uppercase text-link">
            Calendar
          </div>
          <div className="my-2 h-px bg-link/30" />
          <div className="text-center text-sm font-semibold text-text">
            {monthLabel}
          </div>

          <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs text-muted">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-7 gap-1">
            {calendar.cells.map((day, idx) => {
              if (!day) return <span key={`blank-${idx}`} className="h-8" />;

              const selectedDate = new Date(calendar.year, calendar.month, day);
              const todayDate = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate(),
              );
              const isPast = selectedDate < todayDate;

              const iso = toIsoDate(day);
              const isStart = startDate === iso;
              const isEnd = endDate === iso;
              const isInRange =
                !singleDateMode &&
                startDate &&
                endDate &&
                iso > startDate &&
                iso < endDate;

              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => handleDaySelect(day)}
                  disabled={isPast}
                  className={`h-8 rounded-sm text-sm ${
                    isStart || isEnd
                      ? "bg-link text-white"
                      : isInRange
                        ? "bg-link/10 text-link"
                        : "text-text hover:bg-link/10"
                  } ${isPast ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-sm border border-link px-3 py-1.5 text-xs font-semibold text-link"
            >
              Done
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function TravelerCabinDropdown({
  value,
  onChange,
  wrapperClassName = "",
}) {
  const [open, setOpen] = useState(false);

  const updateValue = (field, delta) => {
    const min = field === "adults" ? 1 : 0;
    onChange({ ...value, [field]: Math.max(min, value[field] + delta) });
  };

  const summary = `${value.adults} adult${value.adults > 1 ? "s" : ""}, ${value.children} child${
    value.children > 1 ? "ren" : ""
  }, ${value.cabin}`;

  return (
    <div className={`relative ${wrapperClassName}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-2 text-left"
      >
        <span className="flex min-w-0 items-center gap-2">
          <FiUsers className="shrink-0 text-muted" />
          <span className="truncate text-sm text-text">{summary}</span>
        </span>
        <span className="text-xs text-muted">▾</span>
      </button>

      {open ? (
        <div className="absolute left-0 top-[calc(100%+8px)] z-[999] w-[min(280px,calc(100vw-2.5rem))] max-w-[calc(100vw-2.5rem)] rounded-md border border-border bg-white p-3 text-text shadow-lg sm:left-auto sm:right-0">
          {[
            { key: "adults", label: "Adults" },
            { key: "children", label: "Children" },
          ].map((item) => (
            <div
              key={item.key}
              className="mb-3 flex items-center justify-between text-sm last:mb-2"
            >
              <span className="text-muted">{item.label}</span>
              <div className="flex items-center rounded-sm border border-border">
                <button
                  type="button"
                  onClick={() => updateValue(item.key, -1)}
                  className="h-8 w-8 text-base text-muted"
                >
                  -
                </button>
                <span className="w-8 text-center font-semibold text-text">
                  {value[item.key]}
                </span>
                <button
                  type="button"
                  onClick={() => updateValue(item.key, 1)}
                  className="h-8 w-8 text-base text-link"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <label className="mt-2 block text-xs font-semibold uppercase text-muted">
            Cabin class
          </label>
          <select
            value={value.cabin}
            onChange={(e) => onChange({ ...value, cabin: e.target.value })}
            className="mt-1 w-full rounded-sm border border-border px-2 py-2 text-sm"
          >
            <option>Economy</option>
            <option>Premium Economy</option>
            <option>Business</option>
            <option>First</option>
          </select>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-3 w-full rounded-sm border border-link px-3 py-2 text-sm font-semibold text-link"
          >
            Done
          </button>
        </div>
      ) : null}
    </div>
  );
}
