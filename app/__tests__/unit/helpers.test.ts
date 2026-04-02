import { describe, it, expect } from 'vitest'
import {
  validateEmail,
  validatePassword,
  calculateDiscount,
  formatPrice,
} from '../../_utils/helpers'

describe('Utility Functions - Unit Tests', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('test.user@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('user@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should validate passwords with 3 or more characters', () => {
      expect(validatePassword('abc')).toBe(true);
      expect(validatePassword('password123')).toBe(true);
    });

    it('should reject passwords with less than 3 characters', () => {
      expect(validatePassword('ab')).toBe(false);
      expect(validatePassword('')).toBe(false);
    });
  });

  describe('calculateDiscount', () => {
    it('should calculate 20% discount correctly', () => {
      expect(calculateDiscount(100, 20)).toBe(80);
      expect(calculateDiscount(50, 20)).toBe(40);
    });

    it('should handle edge cases', () => {
      expect(calculateDiscount(100, 0)).toBe(100);
      expect(calculateDiscount(100, 100)).toBe(0);
      expect(calculateDiscount(33.33, 20)).toBe(26.66);
    });
  });

  describe('formatPrice', () => {
    it('should format prices with dollar sign and two decimals', () => {
      expect(formatPrice(100)).toBe('$100.00');
      expect(formatPrice(50.5)).toBe('$50.50');
      expect(formatPrice(0)).toBe('$0.00');
    });

    it('should format fractional cents correctly', () => {
      expect(formatPrice(99.999)).toBe('$100.00');
      expect(formatPrice(10.1)).toBe('$10.10');
    });
  });
});
