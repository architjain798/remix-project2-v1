# GitHub Copilot Instructions for Remix Expenses Project

## Project Overview

This project is a Remix-based web application for managing and analyzing expenses. It includes authentication, expense management, analytics, and marketing pages.

## Folder Structure

- `app/`: Contains all application logic, components, routes, and styles.

  - `components/`: Reusable React components.
    - `auth/`: Authentication-related components.
    - `expenses/`: Components for expense management.
    - `marketing/`: Marketing page components.
    - `navigation/`: Navigation headers and menus.
    - `util/`: Utility components like modals and logos.
  - `data/`: Server-side logic for database interactions and validation.
  - `routes/`: Remix route definitions.
    - `__app/`: Authenticated application routes for managing expenses.
    - `__marketing/`: Public marketing and pricing pages.
  - `styles/`: CSS files for styling components and pages.

- `prisma/`: Prisma schema and database configuration.
- `public/`: Static assets like images and favicon.
- `build/`: Remix build output (generated).

## Key Dependencies

- Remix (`@remix-run/node`, `@remix-run/react`, `@remix-run/dev`)
- React (`react`, `react-dom`)
- Prisma (`@prisma/client`, `prisma`)
- Authentication (`bcryptjs`)
- Icons (`react-icons`)

## Common Tasks

### Development

Start the development server:

```sh
npm run dev
```

### Build & Deployment

Build the project for production:

```sh
npm run build
```

Run the built app:

```sh
npm start
```

### Prisma Database

Generate Prisma client and push schema changes:

```sh
npx prisma generate
npx prisma db push
```

## Coding Conventions

- Use Remix loaders and actions for server-side data fetching and mutations.
- Validate form data using functions in `app/data/validation.server.js`.
- Database interactions should use Prisma client methods defined in `app/data/*.server.js`.
- Components should be modular and reusable, placed in `app/components/`.
- Styles should be scoped and organized in `app/styles/`.

## Important Components & Routes

- Expense management:

  - Routes: `app/routes/__app/expenses.jsx`, `app/routes/__app/expenses/add.jsx`, `app/routes/__app/expenses/$id.jsx`
  - Components: `ExpenseForm`, `ExpensesList`, `ExpensesHeader`

- Marketing pages:
  - Routes: `app/routes/__marketing/index.jsx`
  - Components: `PricingPlan`, `MainHeader`

## Styling

- Shared styles: `app/styles/shared.css`
- Marketing styles: `app/styles/marketing.css`

## Navigation

- Main navigation: `app/components/navigation/MainHeader.jsx`
- Authenticated navigation: `app/components/navigation/ExpensesHeader.jsx`

## Authentication

- Authentication logic: `app/data/auth.server.js`
- Password hashing: `bcryptjs`

## Error Handling

- Use Remix's built-in `CatchBoundary` and `ErrorBoundary` in `app/root.jsx`.

## Copilot Usage Guidelines

- Suggest code consistent with existing patterns and conventions.
- Prefer Remix-specific APIs (`useLoaderData`, `useNavigate`, `Form`, `Link`, `NavLink`) over generic React patterns.
- Follow existing CSS class naming conventions and variables.
- When suggesting database interactions, use Prisma client methods
