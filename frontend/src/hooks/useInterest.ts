import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserInterests } from "../features/interestSlice";
import { useState } from "react";

export function useInterest() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const getAllInterest = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${BACKEND_URL}/intrest/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(setUserInterests(res.data.intrests))
    } catch (error) {
      setError("error fetching interests")
    } finally{
      setLoading(false)
    }
  };

  const postInterest = async (data: Array<{name: string, logo: string}>) => {
    console.log(data)
    try {
      setLoading(true)
      const res = await axios.post(`${BACKEND_URL}/intrest`, {
        intrest: data
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      console.log(res.data)
    } catch (error) {
      setError("error posting interests")
    } finally{
      setLoading(false)
    }
  }

  return {
    getAllInterest,
    postInterest,
    loading,
    error
  }
}
