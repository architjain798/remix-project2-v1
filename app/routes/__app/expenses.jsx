// /expenses => shared layout

import { Link, Links, Outlet, useLoaderData } from "@remix-run/react";
import ExpensesList from "~/components/expenses/ExpensesList";
import expensesStyles from "~/styles/expenses.css";
import { FaDownload, FaPlus } from "react-icons/fa";
import { getExpenses } from "~/data/expenses.server";
import { json } from "@remix-run/node";
import { requireUserSession } from "~/data/auth.server";

export default function ExpensesLayout() {
  const expenses = useLoaderData();

  const hasExpenses = expenses && expenses.length > 0;

  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add New Expense</span>
          </Link>

          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        {hasExpenses && <ExpensesList expenses={expenses} />}
        {!hasExpenses && (
          <section id="no-expenses">
            <h1>No expenses found</h1>
            <p>
              Start <Link to="add">adding some</Link> today.
            </p>
          </section>
        )}
      </main>
    </>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);
  return json(expenses, {
    "Cache-Control": "max-age=3",
  });
}

export function CatchBoundary() {
  return <p>Error</p>;
}

export function headers({ actionHeaders, loaderHeaders, parentHeaders }) {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control"), // 60 minutes
  };
}
