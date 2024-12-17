import cookies from 'js-cookie';

// import Cookies from 'js-cookie';
// import jwt from 'jsonwebtoken';
import { USER_DATA } from './cookies.d';

export const setUserCookies = (data: any) => {
  cookies.set(USER_DATA, JSON.stringify(data));
};

export const setLanguageCookies = (data: any, data2: any) => {
  console.log(data, "inside cookie files")
  cookies.set("currentLang", JSON.stringify(data) as string); 
  cookies.set("currentPage", data2 as string);
};

export const getUserCookies = () => {
  try {
    const data = cookies.get(USER_DATA);
    return data ? JSON.parse(data) : undefined;
  } catch (error) {
    return {};
  }
};

export const removeUserCookies = () => {
  cookies.remove(USER_DATA);
};