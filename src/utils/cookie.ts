import Cookies from 'universal-cookie';

export const setCookies = (cookiesToSet: { [key: string]: string }) => {
  const cookies = new Cookies();
  Object.keys(cookiesToSet).forEach(function (key) {
    cookies.set(key, cookiesToSet[key], { path: '/', maxAge: 60 * 60 * 24 * 30 });
  });
};

export const getCookie = (key: string) => {
  const cookies = new Cookies();
  return cookies.get(key);
};

export const removeCookie = (key: string) => {
  const cookies = new Cookies();
  return cookies.remove(key);
};

export function isSignedIn() {
  const cookies = new Cookies();
  return cookies.get('token') !== undefined;
}
