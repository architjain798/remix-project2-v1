// /expenses/raw

import { getExpense } from "~/data/expenses.server";

export async function loader() {
  return getExpense();
}
