import React, { useState, useRef, useEffect } from "react";

export default function ProfileDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <style>{`
        .profile-dropdown {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .profile-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          cursor: pointer;
          color: #ffffff;
          font-weight: 600;
          outline: none;
        }

        .profile-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #d1d1d1;
        }

        .arrow {
          font-size: 10px;
          transition: transform 0.2s;
        }

        .arrow.open {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          right: 0;
          top: 45px;
          width: 180px;
          background: white;
          border-radius: 6px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 20;
          padding: 6px 0;
        }

        .dropdown-item {
          width: 100%;
          padding: 10px 14px;
          text-align: left;
          background: none;
          border: none;
          font-size: 14px;
          cursor: pointer;
          color: #444;
          outline: none;
        }

        .dropdown-item:hover {
          background: #f5f5f5;
        }

        .logout {
          color: #d33;
        }
      `}</style>

      <div className="profile-dropdown" ref={dropdownRef}>
        <button className="profile-btn" onClick={() => setOpen(!open)}>
          <img
            src={user?.avatar || ""}
            className="profile-avatar"
          />
          <span>{user?.name || "User Name"}</span>
          <span className={`arrow ${open ? "open" : ""}`}>▼</span>
        </button>

        {open && (
          <div className="dropdown-menu">
            <button className="dropdown-item logout" onClick={onLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
