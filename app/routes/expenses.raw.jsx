// /expenses/raw

export function loader() {
  return new Response(
    JSON.stringify([
      {
        id: "e1",
        title: "Car Insurance",
        amount: 294.67,
        date: "2023-01-01",
      },
      {
        id: "e2",
        title: "New TV",
        amount: 799.49,
        date: "2023-01-05",
      },
      {
        id: "e3",
        title: "Groceries",
        amount: 94.12,
        date: "2023-01-10",
      },
    ])
  );
}
