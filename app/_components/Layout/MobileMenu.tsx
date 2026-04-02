"use client";

import { useState } from "react";
import Link from "next/link";
import headerLinks from "../../config/header-links.json";
import LogInButton from "../LogInButton";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div style={{ display: "none", position: "relative" }} className="mobile-menu">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        style={{
          background: "none",
          border: "none",
          fontSize: 24,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: 5,
          padding: 8,
        }}
        aria-label="Toggle menu"
      >
        <span style={{ width: 24, height: 2, background: "#333", display: "block" }}></span>
        <span style={{ width: 24, height: 2, background: "#333", display: "block" }}></span>
        <span style={{ width: 24, height: 2, background: "#333", display: "block" }}></span>
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 8,
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            minWidth: 200,
            zIndex: 1000,
            marginTop: 8,
          }}
        >
          {headerLinks.map((link) => (
            <div key={`mobile-${link.path}`} style={{ borderBottom: "1px solid #f0f0f0" }}>
              <Link
                href={link.path}
                onClick={closeMenu}
                style={{
                  display: "block",
                  padding: "12px 16px",
                  textDecoration: "none",
                  color: "#333",
                  fontSize: 14,
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.background = "#f5f5f5";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.background = "transparent";
                }}
              >
                {link.component === "LogInButton" ? <LogInButton /> : link.text}
              </Link>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
