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

export const isTokenExpired = (token: string) => {
  if (!token) return true;

  const parsedToken = decodeJwt(token);

  const now = Date.now() / 1000;

  if (!parsedToken.exp) return true;

  return parsedToken.exp < now;
};
