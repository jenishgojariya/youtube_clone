import React from "react";
import {
  Home,
  PlaySquare,
  Radio,
  Clapperboard,
  Music2,
  Dumbbell,
  Gamepad2,
  Film,
  Clock,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  return (
    <div className={`w-50 h-screen bg-white shadow-lg p-4 ${className}`}>
      {/* Main Menu */}
      <ul className="space-y-2 w-full">
        <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          <Home className="w-5 h-5" />
          <span>Home</span>
        </li>
        <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          <PlaySquare className="w-5 h-5" />
          <span>Shorts</span>
        </li>
        <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          <Clapperboard className="w-5 h-5" />
          <span>Videos</span>
        </li>
        <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          <Radio className="w-5 h-5" />
          <span>Live</span>
        </li>
      </ul>

      {/* Divider */}
      <hr className="my-4 border-gray-300" />

      {/* Subscriptions */}
      <h1 className="text-sm font-semibold text-gray-700 mb-2 w-full">
        Subscriptions
      </h1>
      <ul className="space-y-2 w-full">
        <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          <Music2 className="w-5 h-5" />
          <span>Music</span>
        </li>
        <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          <Dumbbell className="w-5 h-5" />
          <span>Sports</span>
        </li>
        <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          <Gamepad2 className="w-5 h-5" />
          <span>Gaming</span>
        </li>
        <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          <Film className="w-5 h-5" />
          <span>Movies</span>
        </li>
      </ul>

      {/* Divider */}
      <hr className="my-4 border-gray-300" />

      {/* Watch Later */}
      <h1 className="text-sm font-semibold text-gray-700 mb-2">Watch Later</h1>
      <ul className="space-y-2 w-full">
        <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          <Clock className="w-5 h-5" />
          <span>Watch Later</span>
        </li>
      </ul>
    </div>
  );
}
