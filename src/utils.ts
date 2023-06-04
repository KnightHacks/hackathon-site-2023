import { decodeJwt } from "jose";

export const scrollToElementById = (id: string) => {
  if (typeof window === "undefined") return;

  const element = document.getElementById(id);

  if (!element) return;

  window.scrollTo({ behavior: "smooth", top: element.offsetTop - 90 });
};

/* 
  OAuth: User is authenticated with OAuth
  Guest: User is not logged in
  User: User is logged in with their KnightHacks account
*/
export type UserState = "OAuth" | "Guest" | "User";

export const parseToken = (token: string) => {
  console.log("Token: ", token);
  if (!token) return null;
  return decodeJwt(token);
};

export const isTokenExpired = (token?: string) => {
  if (!token) return true;

  const parsedToken = parseToken(token);

  if (!parsedToken) return true;

  const now = Date.now() / 1000;

  if (!parsedToken.exp) return true;

  return parsedToken.exp < now;
};

export const getRefreshToken = async (refreshToken: string) => {
  const res = await fetch("http://localhost:3000/api/refresh_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken,
    }),
    credentials: "include",
  });

  return res.json();
};
