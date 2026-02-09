"use client";
import { useState } from "react";
import { FiHeart } from "react-icons/fi";

export default function Wishlist() {
  const [isFilled, setIsFilled] = useState(false);
  return (
    <div>
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted"
        onClick={() => setIsFilled(!isFilled)}
      >
        <FiHeart className={isFilled ? "fill-red-500 text-red-500" : ""} />
      </button>
    </div>
  );
}
