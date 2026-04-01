'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../_context/AuthContext';

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    window.location.href = '/';
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: 40,
          height: 40,
          fontSize: 20,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = '#0056b3';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = '#007bff';
        }}
        title={user?.username}
      >
        👤
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 50,
          right: 0,
          background: '#fff',
          border: '1px solid #ccc',
          borderRadius: 8,
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          minWidth: 200,
          zIndex: 1000,
          marginTop: 8,
        }}>
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid #f0f0f0',
            fontWeight: 'bold',
          }}>
            {user?.username}
          </div>

          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            style={{
              display: 'block',
              padding: '12px 16px',
              textDecoration: 'none',
              color: '#333',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            My Profile
          </Link>

          <Link
            href="/orders"
            onClick={() => setIsOpen(false)}
            style={{
              display: 'block',
              padding: '12px 16px',
              textDecoration: 'none',
              color: '#333',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            Orders
          </Link>

          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: 'none',
              background: 'transparent',
              color: '#e63946',
              cursor: 'pointer',
              textAlign: 'left',
              fontWeight: 'bold',
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
