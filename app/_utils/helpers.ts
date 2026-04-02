// Utility functions to test
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= 3;
}

export function calculateDiscount(originalPrice: number, discountPercent: number): number {
  return parseFloat((originalPrice * (1 - discountPercent / 100)).toFixed(2));
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function getBaseUrl(): string {
  if (typeof window !== 'undefined') return '';
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}
