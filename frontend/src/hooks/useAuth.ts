import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/authSlice";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async (email: string, username: string, password: string) => {
    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_URL}/user/signup`, {
        username,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      const user = await axios.get(`${BACKEND_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(setUser(user.data.user));
      navigate("/feed");
    } catch (error) {
      setError("some error occured");
    } finally {
      setLoading(false);
    }
  };

  const signin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_URL}/user/signin`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      const user = await axios.get(`${BACKEND_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(setUser(user.data.user));
      
      navigate("/feed");
    } catch (error) {
      setError("error while signing in");
    } finally {
      setLoading(false);
    }
  };

  return {
    signup,
    signin,
    loading,
    error,
  };
}
