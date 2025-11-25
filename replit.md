# Villas Doña Olga Real Estate Website

## Overview

This is a promotional website for Villas Doña Olga, a real estate development offering residential lots for sale in a countryside setting. The application provides information about available lots, financing options, and includes a contact form for prospective buyers to inquire about properties.

The site is built as a full-stack web application with a React frontend and Express backend, featuring a clean, modern design inspired by contemporary real estate platforms with an emphasis on natural landscapes and tranquility.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast Hot Module Replacement (HMR)
- Wouter for lightweight client-side routing (alternative to React Router)

**UI Component System**
- shadcn/ui component library based on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Component style: "new-york" variant with CSS variables for theming
- Custom color palette featuring earth tones (greens, browns, creams) aligned with the brand identity

**State Management**
- TanStack Query (React Query) for server state management and data fetching
- Local React state for UI interactions
- Custom theme provider for light/dark mode toggling

**Design Philosophy**
- Mobile-first responsive design
- Generous whitespace to convey luxury and space
- Accessibility-focused with ARIA attributes and keyboard navigation support
- Two primary pages: Home (hero section, benefits, call-to-action) and Lots (detailed pricing, contact form)

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- Dual-mode setup: development server with Vite middleware, production with static file serving
- TypeScript throughout for type consistency across the stack

**API Structure**
- RESTful API endpoints under `/api` prefix
- POST `/api/contact` - Submit contact form inquiries
- GET `/api/contact-submissions` - Retrieve all contact submissions (admin functionality)
- JSON request/response format with validation

**Error Handling & Logging**
- Custom logging middleware tracking request duration and path
- Structured error responses with success/failure status
- Request body buffering for potential webhook/payment integrations

### Data Storage

**Database**
- PostgreSQL via Neon serverless platform
- Drizzle ORM for type-safe database queries and migrations
- WebSocket connection for serverless PostgreSQL (using `ws` library)

**Schema Design**
- `users` table: Basic user authentication structure (id, username, password)
- `contact_submissions` table: Stores inquiries from the contact form (id, name, email, phone, message, createdAt)
- UUID primary keys using PostgreSQL's `gen_random_uuid()`
- Timestamps with automatic `defaultNow()` for audit trails

**Data Access Layer**
- Storage interface pattern (`IStorage`) for potential future database swapping
- `DatabaseStorage` class implementing all database operations
- Centralized database connection pooling

### External Dependencies

**Database Services**
- Neon serverless PostgreSQL - cloud-hosted PostgreSQL database
- Connection via `@neondatabase/serverless` package with WebSocket support

**UI Component Libraries**
- Radix UI - Unstyled, accessible component primitives (dialogs, dropdowns, navigation, etc.)
- Tailwind CSS - Utility-first CSS framework
- shadcn/ui - Pre-built component system built on Radix UI

**Development Tools**
- Replit-specific plugins for development environment:
  - Runtime error modal overlay
  - Cartographer for visual component mapping
  - Dev banner for development indicators

**Validation & Type Safety**
- Zod for runtime schema validation
- drizzle-zod for bridging Drizzle schemas with Zod validation
- TypeScript for compile-time type checking

**Form Management**
- React Hook Form with Hookform Resolvers for form state and validation
- Integration with Zod schemas for validated inputs

**Asset Management**
- Static assets stored in `attached_assets` directory
- Generated images for hero sections and backgrounds
- Logo image: `Venta de lotes_1764035428857.png`

**Fonts**
- Google Fonts integration with multiple font families (Architects Daughter, DM Sans, Fira Code, Geist Mono)
- Preconnect optimization for faster font loading

**Build & Deployment**
- esbuild for server-side code bundling in production
- Vite for client-side code bundling with tree-shaking and code splitting
- Environment-specific configurations for development vs production modes