import React, { useEffect, useState } from "react";
import api from "../../services/api";

// import { Container } from './styles';

export function Main() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const response = await api.get(`/alesp`);
      setLoading(false);
      console.log("aaa", response);
      setData(response.data);
    }

    getData();
  }, []);

  console.log("aaa", data);

  return <p>hello m0na</p>;
}
