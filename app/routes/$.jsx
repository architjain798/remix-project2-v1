import { redirect } from "@remix-run/node";

export function loader({ params }) {
  if (params["*"] === "exp") {
    return redirect("/expenses");
  }
  throw new Response("Not Found", {
    status: 404,
    statusText: "Not Found",
  });
}
