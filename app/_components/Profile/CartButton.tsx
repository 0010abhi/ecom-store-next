'use client';

import Link from 'next/link';

export default function CartButton() {
  return (
    <Link href="/cart" style={{
      fontSize: 24,
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
    }}>
      🛒
    </Link>
  );
}
