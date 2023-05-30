import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const parseToken = (token: string) => {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

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

const getRefreshToken = async (refreshToken: string) => {
  await fetch("/api/refresh_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken,
    }),
    credentials: "include",
  });
};

export default async function Dashboard() {
  const accessToken = cookies().get("accessToken")?.value;
  const refreshToken = cookies().get("refreshToken")?.value;

  if (!accessToken) redirect("/login");

  const { exp } = parseToken(accessToken);

  if (Date.now() >= exp * 1000 && refreshToken) {
    await getRefreshToken(refreshToken);
    redirect("/dashboard");
  }

  const { data } = await getUser(accessToken);
  console.log(data);

  return <div>Dashboard</div>;
}
