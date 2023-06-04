import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getUser = async (accessToken: string) => {
  const query = `
query Query {
  me {
    applications {
      status
      id
    }
    firstName
    lastName
  }
}
  `;

  const res = await fetch("http://localhost:4000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query,
    }),
    credentials: "include",
  });

  return res.json();
};



export default async function Dashboard() {
  const accessToken = cookies().get("accessToken")?.value;

  // const { data } = await getUser(accessToken);

  return <div>Dashboard</div>;
}
