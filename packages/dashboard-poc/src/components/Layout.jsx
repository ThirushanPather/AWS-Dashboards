import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/background.jpg')" }}>
      <main>{children}</main>
    </div>
  );
}
