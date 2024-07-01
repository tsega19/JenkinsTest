export const AUTH_KEY_USER_DATA = "user.data";
export const AUTH_KEY_USERNAME = "user.username";
export const AUTH_KEY_TOKEN = "user.token";

type userType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};
let sessionTimeout: NodeJS.Timeout;

function useAuth() {
  const loginAuth = (userData: userType, token: string) => {
    sessionStorage.setItem(AUTH_KEY_USER_DATA, JSON.stringify(userData));
    sessionStorage.setItem(AUTH_KEY_TOKEN, token);

    clearTimeout(sessionTimeout);

    sessionTimeout = setTimeout(() => {
      sessionStorage.clear();
      window.location.reload();
    }, 3000000);
  };

  const logoutAuth = () => {
    sessionStorage.clear();
  };

  const isLoggedIn = () => sessionStorage.getItem(AUTH_KEY_TOKEN);

  const getUserData = () => {
    const userData = sessionStorage.getItem(AUTH_KEY_USER_DATA);
    return userData ? JSON.parse(userData) : null;
  };

  const getToken = () => sessionStorage.getItem(AUTH_KEY_TOKEN);

  return { isLoggedIn, getUserData, loginAuth, logoutAuth, getToken };
}

export default useAuth;
