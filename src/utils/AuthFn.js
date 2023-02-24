import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { signInWithGoogle } from "../firebase";

const auth = getAuth();
const baseUrl = process.env.REACT_APP_BASE_URL;

export const signup = async (
  firstName,
  lastName,
  email,
  phoneNumber,
  password
) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${baseUrl}/auth/register`,
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      },
    });
    return data;
  } catch (error) {
    console.error(error.response.data);
    throw Error(error.response.data.message);
  }
};

export const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res?.user;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};

export const googleLogin = () => {
  signInWithGoogle();
};

export const signout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const resetPassword = async (email, user) => {
  try {
    await axios({
      method: "post",
      url: `${baseUrl}/auth/send-password-reset-email`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
      data: {
        email,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

export const forgotPassword = async (email) => {
  try {
    await axios({
      method: "post",
      url: `${baseUrl}/auth/send-forgot-password-email`,
      data: {
        email,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
