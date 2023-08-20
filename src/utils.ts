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

const convertStringToArrayBuffer = (str: string) => {
  const textEncoder = new TextEncoder();
  return textEncoder.encode(str).buffer;
};

export function convertFileToArrayBuffer(
  file: File
): Promise<ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    if (!file || !file.name) {
      reject(new Error("Invalid or missing file."));
    }

    const reader = new FileReader();

    reader.onload = () => {
      const arrayBuffer: ArrayBuffer | null | string = reader.result;

      if (arrayBuffer === null) {
        resolve(null);
        return;
      }
      if (typeof arrayBuffer === "string") {
        resolve(convertStringToArrayBuffer(arrayBuffer));
        return;
      }
      if (!arrayBuffer) {
        reject(new Error("Failed to read file into ArrayBuffer."));
        return;
      }

      resolve(arrayBuffer);
    };

    reader.onerror = () => {
      reject(new Error("Error reading file."));
    };

    reader.readAsArrayBuffer(file);
  });
}
