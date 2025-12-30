# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## Project Architecture

### Tech Stack
- **Next.js 16.0.6** with App Router (React 19.2.0)
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** for styling
- **MDX** support configured (framework ready but currently unused)
- **Dependencies**: dayjs (dates), sonner (toasts), swiper (carousels)

### Path Aliases
- `@/*` → `./src/*`
- `@/fonts` → `./styles/fonts`

### Server vs Client Components

This project follows Next.js 13+ App Router patterns with clear server/client separation:

**Server Components (default):**
- All pages under `/src/app/` are server components by default
- Used for data fetching, menu displays, service listings
- Directly call data fetching functions from `/src/app/data/`
- Example: `/src/app/menu/[categoryId]/page.tsx` - async server component

**Client Components ('use client' directive):**
- Interactive UI with state/event handlers
- Cart system (`CartProvider`, `CartComponent`)
- Sliders (`SliderClient` - Swiper integration)
- Form controls (`CategoryChanger`, dropdown interactions)

### Data Fetching Layer

Located in `/src/app/data/`, uses a consistent pattern across all modules:

```typescript
// Pattern used in menu.ts, services.ts, gallery.ts
1. Define TypeScript interfaces
2. Module-level cache variables (e.g., let categories: Category[] | null = null)
3. Async fetch functions with error handling
4. Query functions that check cache before fetching
5. Return typed data
```

**API Configuration:**
- Base URL defined in `apiBaseUrl.ts`
- Development: `http://localhost:5001/api/v1/`
- Production: `/api/v1/` (relative path)

**Key Data Modules:**
- `menu.ts` - Food categories & items with nutritional data
- `services.ts` - Heroes, masters, shows, additions (filtered by showType enum)
- `gallery.ts` - Gallery images with environment-based gallery IDs
- `halls.ts` - Static hall data (2 halls: "Давай поиграем" & "Характер")
- `common.ts` - Utilities: `generateString()`, `intoDate()`, `hallTime()` using dayjs

### State Management

**No Redux/Zustand** - uses React Context API:

**CartProvider** (`/src/providers/CartProvider.tsx`):
- Manages global cart state: `food[]`, `halls[]`
- Methods: `chooseHall()`, `addToCart()`, `removeFromCart()`
- **Note**: No localStorage persistence - cart is lost on refresh

**State Types:**
```typescript
interface Food { count, id, imageWebp, minOrder, price, title }
interface Hall { id, name, img, dateTime, duration, price, diff }
```

### Routing Structure

App Router with dynamic routes:

```
/                          - Home page
/menu                      - Menu categories grid
/menu/[categoryId]         - Category items
/menu/[categoryId]/[itemId] - Item details
/cart                      - Multi-step checkout (WIP)
/heroes, /heroes/[id]      - Animators/programs
/masters, /show, /additions - Services with same pattern
/booking                   - Studio reservations
```

**Dynamic Route Pattern:**
- Type params with `PageProps<'/path/[param]'>`
- Extract params: `const { param } = await props.params`
- Use `notFound()` for missing resources

### Component Organization

**Layout Components:**
- `Header` - Fixed nav, cart badge with count, mobile menu
- `Footer` - Contact info, links, social media
- `Navigation` - Responsive (desktop: flex-row, mobile: flex-col)

**Reusable Components:**
- `BreadCrumbs` - Navigation path display
- `ChooseHall` - Studio selection logic
- `GoBackBtn` - Navigation helper
- `ServiceImages` - Reusable image grid
- `SliderClient` - Swiper carousel wrapper
- `CategoryChanger` - Dropdown/tag selector for menu

**Cart Components (Work in Progress):**
- `CartComponent` - Tab-based UI (5 tabs: Hall, Anketa, Show, Food, Order)
- Individual tab components contain mixed JSX/Vue template syntax
- Hardcoded fields and placeholder functionality
- Needs refactoring to complete checkout flow

### Styling Conventions

**Tailwind CSS v4** with custom CSS variables and utility classes.

**Color Scheme** (defined in `globals.css`):
```css
--color-brown: #6d5e3c
--color-lightbrown: #edeae7
--color-lightgreen: #5c704e
--color-green: #000
--color-grey: #dbdbda
--color-darkgrey: #d9d9d9
```

**Custom Fonts** (configured in `styles/fonts/`):
- **Avenir** (local) - Primary body font (regular 400, medium 500)
- **Manege Demo** (local, light 400)
- **Cormorant Infant** (Google Font)
- **Tenor Sans** (Google Font)

**Custom Utility Classes** (in `src/app/globals.css`):
- `.add-to-cart-food-btn` - Primary CTA button
- `.tag` / `.active-tag` - Category/filter tags
- `.category-item-card` - Card with hover shadow
- `.menu-item-title` - Large serif titles
- `.tab-header` / `.active-tab` - Tab UI
- `.custom__btn`, `.btn-prev`, `.btn-next` - Button variations

**Common Patterns:**
- Rounded corners: `.rounded-tr-[50%]`, `.rounded-bl-[50%]`
- Custom radius: `rounded-[40px]`, `rounded-[169px]`
- Responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`

### Image Optimization

**Next.js Image Component:**
- Remote patterns configured for CDN: `https://102922.selcdn.ru/ecomm/harakter/**`
- Images use WebP format when available
- Public directory structure:
  - `/public/img/` - Static images
  - `/public/uploaded/` - Linked to food-delivery uploaded assets

## Known Limitations & WIP Areas

1. **Cart checkout flow** - Tab components incomplete, contain legacy Vue syntax mixed with React
2. **No localStorage** - Cart state not persisted across page refreshes
3. **MDX framework** - Configured but not currently used
4. **Limited error handling** - Data fetching only uses console.error
5. **No form validation** - Checkout forms lack validation
6. **Static hall data** - Halls are hardcoded in `halls.ts`

## TypeScript Configuration

- **Strict mode enabled**
- **Target**: ES2017
- **JSX**: react-jsx (React 19)
- **Module resolution**: bundler
- Use path aliases for cleaner imports

## ESLint Configuration

- Uses Next.js recommended config (`eslint-config-next`)
- Core Web Vitals rules enabled
- TypeScript support included
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

## Testing

No test framework currently configured. Tests should be added for:
- Data fetching layer
- Cart state management
- Component interactions
