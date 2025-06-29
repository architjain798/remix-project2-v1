// /expenses/add

import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { requireUserSession } from "~/data/auth.server";
import { addExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export default function AddExpensesPage() {
  const navigate = useNavigate();
  function closeHandler() {
    // Handle modal close
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

export async function action({ request }) {
  const userId = await requireUserSession(request);

  let formData = await request.formData();
  const expenseData = Object.fromEntries(formData);
  console.log(expenseData);

  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    return error;
  }

  await addExpense(expenseData, userId);

  return redirect("/expenses");
}
