// Button.tsx
import React from "react";

interface ButtonProps {
  name: string;
}

export default function Button({ name }: ButtonProps) {
  return (
    <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-full whitespace-nowrap transition-colors duration-200 border border-gray-200">
      {name}
    </button>
  );
}
