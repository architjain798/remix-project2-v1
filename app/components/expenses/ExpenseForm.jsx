import {
  Form,
  Link,
  useActionData,
  useMatches,
  useNavigation,
  useParams,
} from "@remix-run/react";

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10

  const validationErrors = useActionData();
  const navigation = useNavigation();

  const params = useParams();
  const matches = useMatches();

  console.log("matches", matches);

  const expenses = matches.find(
    (match) => match.id === "routes/__app/expenses"
  );

  console.log(expenses);

  const expenseData = expenses?.data?.find(
    (expense) => expense.id === params.id
  );

  if (params.id && !expenseData) {
    // throw new Response( )
    return <p>Invalid expense id</p>;
  }

  // const expenseData = useLoaderData();

  const defaultValues = expenseData
    ? {
        title: expenseData?.title,
        amount: expenseData?.amount,
        date: expenseData?.date,
      }
    : {
        title: "",
        amount: "",
        date: "",
      };

  const isSubmitting = navigation.state !== "idle";

  // const submit = useSubmit();

  // function submitHandler(event) {
  //   event.preventDefault();
  //   // perform your own validation
  //   // ..
  //   submit(event.target,{
  //     // action: '/expenses/add',
  //     method:'post'
  //   })
  // }

  return (
    <Form
      method={expenseData ? "patch" : "post"}
      className="form"
      id="expense-form"
      // onSubmit={submitHandler}
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defaultValues?.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={defaultValues?.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={
              defaultValues?.date ? defaultValues.date.slice(0, 10) : ""
            }
          />
        </p>
      </div>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Expense"}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
