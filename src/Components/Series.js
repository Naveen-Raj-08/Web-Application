import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Series = () => {
  const location = useLocation();

  var API_KEY = "77b9184fd1aaa75683eefec4dce8ef77";
  var MD5_HASH = "27ebb21b1d67a27a2e623115cef766b9";
  var TS = "thecomics";

  useEffect(() => {
    const fetchSeries = async () => {
      await axios
        .get(`${location.state}?ts=${TS}&apikey=${API_KEY}&hash=${MD5_HASH}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    };

    fetchSeries();
  }, []);

  return <div>Marvel series</div>;
};
