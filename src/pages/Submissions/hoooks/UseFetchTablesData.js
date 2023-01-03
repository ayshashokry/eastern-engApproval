import axios from "axios";
import React, { useEffect,useState } from "react";

export default function UseTablesData(endPoint) {
  const userToken = localStorage.getItem("token");
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get(`${window.ApiUrl}/EngineeringCompany/${endPoint}?pageSize=12`, {
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${userToken}`,
      },
    }).then(res=>setData(res.data)).catch(error=>console.log(error));
  }, [endPoint]);
  return data;
}
