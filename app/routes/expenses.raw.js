// /expenses/raw

import { requireUserSession } from "~/data/auth.server";
import { getExpense } from "~/data/expenses.server";

export async function loader({ request }) {
  await requireUserSession(request);
  return getExpense();
}
