"use client";

import { useEffect } from "react";

export default async function AuthRedirect({
  searchParams,
}: {
  searchParams: { [key: string]: string[] };
}) {
  useEffect(() => {
    fetch("http://localhost:4000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",

      body: JSON.stringify({
        query: `
    query Login($code: String!, $provider: Provider!, $state: String!) {
      login(code: $code, provider: $provider, state: $state) {
        accessToken
        accountExists
        encryptedOAuthAccessToken
        refreshToken
      }
    }
  `,
        variables: {
          code: searchParams.code,
          state: searchParams.state,
          provider: "GITHUB",
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, [searchParams]);

  return <div className="mt-28">{JSON.stringify(searchParams)}</div>;
}
