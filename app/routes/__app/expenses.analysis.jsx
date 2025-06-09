// /expenses/analysis

import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";

export const DUMMY_EXPENSES = [
  { id: "e1", title: "Car Insurance", amount: 294.67, date: "2023-01-01" },
  { id: "e2", title: "Groceries", amount: 94.12, date: "2023-02-15" },
  { id: "e3", title: "Electricity Bill", amount: 120.5, date: "2023-03-10" },
  { id: "e4", title: "Internet Bill", amount: 60.0, date: "2023-04-05" },
  { id: "e5", title: "Gym Membership", amount: 45.0, date: "2023-05-20" },
];

export default function ExpensesAnalysisPage() {
  return (
    <main>
      <Chart expenses={DUMMY_EXPENSES} />
      <ExpenseStatistics expenses={DUMMY_EXPENSES} />
    </main>
  );
}
