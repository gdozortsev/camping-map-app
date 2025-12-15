import React from "react";

export default function NavBar({ currentPath = "/" }) {
  const navStyle = {
    backgroundColor: "#fbf9f9",
    padding: "1rem 2rem",
    boxShadow: "0 2px 4px rgba(144, 14, 14, 0.1)"
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  };

  const linkGroupStyle = {
    display: "flex",
    gap: "2rem"
  };

  const linkStyle = {
    color: "#182c3cff",
    textDecoration: "none",
    fontSize: "1.25rem"
  };

  const signInStyle = {
    color: currentPath === "/" ? "#3498db" : "white",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: currentPath === "/" ? "600" : "400",
    transition: "color 0.3s"
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <div style={linkGroupStyle}>
          <a href="/" style={linkStyle}>
            Home
          </a>
          <a href="/add" style={linkStyle}>
            Add Campsite
          </a>
        </div>

        <div style={linkGroupStyle}>
          <a href="/signin" style={signInStyle}>
            Sign in
          </a>
        </div>
      </div>
    </nav>
  );
}