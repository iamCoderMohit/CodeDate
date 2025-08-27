import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/authSlice";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function useInfo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState<{username: string, name: string, bio: string, interests: any[]}>({
    username: '',
    name: '',
    bio: '',
    interests: []
  })
  const dispatch = useDispatch()

  const getAll = async () => {
    try {
        setLoading(true)
      const res = await axios.get(`${BACKEND_URL}/user/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUsers(res.data.users);
    } catch (error) {
        setError("error fetching users")
    } finally{
        setLoading(false)
    }
  };

  const editUser = async (name: string, bio: string) => {
    try {
      setLoading(true)
      const res = await axios.put(`${BACKEND_URL}/user/edit`, {
        name, bio
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(setUser(res.data.user))
    } catch (error) {
      setError("error editing user")
    } finally{
      setLoading(false)
    }
  }

  const getUser = async (username: string) => {
    try {
      setLoading(true)
      const res = await axios.get(`${BACKEND_URL}/user/info`, {
        params: {
          username
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      setUserInfo(res.data.user)
    } catch (error) {
      setError("error fetching user")
    } finally{
      setLoading(false)
    }
  }

  return {
    getAll,
    editUser,
    getUser,
    userInfo,
    users,
    loading,
    error
  }
}
