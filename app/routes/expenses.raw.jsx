// /expenses/raw

import { getExpense } from "~/data/expenses.server";

export async function loader() {
  const expenses = await getExpense();

  return new Response(JSON.stringify([expenses]));
}
