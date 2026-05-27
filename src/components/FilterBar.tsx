"use client";

interface FilterBarProps {
  orientation: string;
  setOrientation: (v: string) => void;
  color: string;
  setColor: (v: string) => void;
  orderBy: string;
  setOrderBy: (v: string) => void;
}

export default function FilterBar({
  orientation,
  setOrientation,
  color,
  setColor,
  orderBy,
  setOrderBy,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-black focus:border-black outline-none bg-white text-black"
        value={orientation}
        onChange={(e) => setOrientation(e.target.value)}
      >
        <option value="">Any Orientation</option>
        <option value="landscape">Landscape</option>
        <option value="portrait">Portrait</option>
        <option value="squarish">Square</option>
      </select>

      <select
        className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-black focus:border-black outline-none bg-white text-black"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      >
        <option value="">Any Color</option>
        <option value="black_and_white">B&W</option>
        <option value="black">Black</option>
        <option value="white">White</option>
        <option value="yellow">Yellow</option>
        <option value="orange">Orange</option>
        <option value="red">Red</option>
        <option value="purple">Purple</option>
        <option value="magenta">Magenta</option>
        <option value="green">Green</option>
        <option value="teal">Teal</option>
        <option value="blue">Blue</option>
      </select>

      <select
        className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-black focus:border-black outline-none bg-white text-black"
        value={orderBy}
        onChange={(e) => setOrderBy(e.target.value)}
      >
        <option value="relevant">Relevant</option>
        <option value="latest">Latest</option>
      </select>
    </div>
  );
}