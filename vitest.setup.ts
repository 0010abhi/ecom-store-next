import { vi } from 'vitest'
import '@testing-library/jest-dom'

// Mock environment variables for tests
process.env.DB_HOST = 'localhost'
process.env.DB_USER = 'root'
process.env.DB_PASSWORD = 'test'
process.env.DB_NAME = 'fakestore_test'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  usePathname: () => '',
}))

// Mock next/image
// vi.mock('next/image', () => ({
//   default: (props: any) => {
//     // eslint-disable-next-line jsx-a11y/alt-text
//     return <img {...props} />
//   },
// }))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
