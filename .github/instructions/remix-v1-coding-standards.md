---
description: "Specific coding standards and naming conventions for Remix v1 project"
applyTo:
  - "**/*.jsx"
  - "**/*.server.js"
  - "**/*.css"
---

# GitHub Copilot Instructions for Remix v1 Project Coding Standards & Naming Conventions

## Project Context

This project is built with Remix v1, React, and Prisma. It manages expenses, authentication, analytics, and marketing pages.

## General Coding Standards

- **JavaScript & JSX**

  - Use modern JavaScript (ES6+) syntax.
  - Prefer functional components and hooks over class-based components.
  - Always destructure props and state clearly.
  - Avoid inline styles; use scoped CSS files located in `app/styles/`.

- **Remix v1 Specific**

  - Use Remix loaders and actions for server-side data fetching and mutations.
  - Prefer Remix-specific hooks (`useLoaderData`, `useActionData`, `useNavigate`, `useParams`, `useMatches`) over generic React hooks when applicable.
  - Always handle errors gracefully using Remix's built-in `CatchBoundary` and `ErrorBoundary`.
  - Prefer Remix's `<Form>` component for handling form submissions.
  - Use Remix's `<Link>` and `<NavLink>` components for internal navigation.

- **Prisma**
  - Database interactions must use Prisma client methods defined in `app/data/*.server.js`.
  - Always handle Prisma errors explicitly and provide meaningful error messages.

## Naming Conventions

- **Files & Folders**

  - Use kebab-case for filenames and folders (e.g., `expense-form.jsx`, `auth.server.js`).
  - Components: PascalCase (e.g., `ExpenseForm.jsx`, `MainHeader.jsx`).
  - Server-side logic: kebab-case with `.server.js` suffix (e.g., `expenses.server.js`).

- **React Components**

  - Component names: PascalCase (e.g., `ExpenseListItem`, `ExpenseStatistics`).
  - Props: camelCase (e.g., `expenseData`, `onClose`).
  - Event handlers: camelCase with "Handler" suffix (e.g., `submitHandler`, `closeHandler`).

- **CSS**

  - Use kebab-case for class names (e.g., `.expense-item`, `.form-actions`).
  - Avoid ID selectors unless necessary for unique elements.

- **Variables & Functions**

  - camelCase for variables and functions (e.g., `validateExpenseInput`, `getExpenses`).
  - Boolean variables should start with `is`, `has`, or `should` (e.g., `isSubmitting`, `hasExpenses`).

- **Constants**
  - UPPER_SNAKE_CASE for constants (e.g., `SESSION_SECRET`, `PRICING_PLANS`).

## Testing Guidelines

- Write tests using Jest and React Testing Library.
- Test Remix loaders and actions separately from UI components.

## Accessibility

- Ensure components are accessible and follow ARIA best practices.
- Use semantic HTML elements whenever possible.

## Folder Structure (Remix v1)

```
app/
├── components/
│   ├── auth/
│   ├── expenses/
│   ├── marketing/
│   ├── navigation/
│   └── util/
├── data/
│   ├── auth.server.js
│   ├── database.server.js
│   ├── expenses.server.js
│   └── validation.server.js
├── routes/
│   ├── __app/
│   └── __marketing/
└── styles/
    ├── shared.css
    ├── marketing.css
    └── expenses.css
```

## Code Generation Instructions for GitHub Copilot

- Always follow the above coding standards and naming conventions.
- Generate Remix v1 compatible code, using Remix-specific APIs and patterns.
- Suggest code consistent with existing patterns and conventions in the workspace.
- When generating database interactions, use Prisma client methods defined in `app/data/*.server.js`.
- Ensure error handling is consistent with Remix's built-in boundaries (`CatchBoundary`, `ErrorBoundary`).

## Usage in VS Code

- Store this file in `.github/instructions/remix-v1-coding-standards.md`.
- Use glob patterns in VS Code settings to automatically include these instructions for relevant files:
  ```json
  "github.copilot.advanced": {
    "instructionFiles": {
      "**/*.jsx": ".github/instructions/remix-v1-coding-standards.md",
      "**/*.server.js": ".github/instructions/remix-v1-coding-standards.md",
      "**/*.css": ".github/instructions/remix-v1-coding-standards.md"
    }
  }
  ```
