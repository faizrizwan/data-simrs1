import React from "react";
import FormPengambilan from "./FormPengambilan";
import FormPengembalian from "./FormPengembalian";
import OutputPengambilan from "./OutputData";
import Data from "./Data";
import { getAuth, signOut } from "firebase/auth";

const cardStyle = {
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  padding: 24,
  flex: 1,
  minWidth: 320,
};

// Ambil user dari Firebase Auth
const auth = getAuth();
const user = auth.currentUser
  ? { id: auth.currentUser.uid, name: auth.currentUser.displayName || auth.currentUser.email }
  : { id: "-", name: "Guest" };

export default function Dashboard() {
  const handleLogout = () => {
    signOut(auth);
    // Optional: reload or redirect after logout
    window.location.reload();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "Segoe UI, Arial, sans-serif",
        background: "linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <h1 style={{ color: "#2d3748", letterSpacing: 1 }}>
          Dashboard
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ background: "#e0e7ff", borderRadius: 8, padding: "8px 16px", color: "#2d3748", fontWeight: 500 }}>
            ID: {user.id} | {user.name}
          </div>
          {user.id !== "-" && (
            <button
              onClick={handleLogout}
              style={{
                background: "#ef4444",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "8px 16px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 32,
          gap: 24,
        }}
      >
        <div style={cardStyle}>
          <FormPengambilan />
        </div>
        <div style={cardStyle}>
          <FormPengembalian />
        </div>
      </div>
      <div style={{ ...cardStyle, marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, marginBottom: 16, color: "#4a5568" }}>
          Data
        </h2>
        <Data />
      </div>
      <div style={cardStyle}>
        <h2 style={{ fontSize: 18, marginBottom: 16, color: "#4a5568" }}>
          Output Pengambilan
        </h2>
        <OutputPengambilan />
      </div>
    </div>
  );
}