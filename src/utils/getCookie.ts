// const getCookie = (name: string): string | undefined => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`)
//   if (parts && parts.length === 2) return parts.pop().split(';').shift();
//   return undefined; // Return null if the cookie is not found
// }

// export { getCookie }

const getCookie = (name: string): string | null => {
  const cookieMatch = document.cookie.match(`(?:^|; )${name}=([^;]*)`);
  return cookieMatch ? decodeURIComponent(cookieMatch[1]) : null;
};

export { getCookie };
