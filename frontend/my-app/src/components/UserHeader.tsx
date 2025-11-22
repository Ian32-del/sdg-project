import { useState, useEffect, useRef } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import LogoutButton from "./LogoutButton";

export default function UserHeader() {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="flex items-center justify-end p-4 bg-white border-b">
      <div className="relative" ref={dropdownRef}>
        {/* User email button */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">
              {user.email}
            </p>
          </div>
          {/* Dropdown arrow */}
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">Signed in as</p>
              <p className="text-sm text-gray-600 truncate">{user.email}</p>
            </div>
            <div className="px-4 py-2">
              <LogoutButton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}