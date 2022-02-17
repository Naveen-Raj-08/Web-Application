import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

export const Stories = (props) => {
  const location = useLocation();

  if (location.search.charAt(0) === "?") {
    console.log("Removed");
  } else {
    console.log("Home page");
  }

  //   var API_KEY = "77b9184fd1aaa75683eefec4dce8ef77";
  //   var MD5_HASH = "27ebb21b1d67a27a2e623115cef766b9";
  //   var TS = "thecomics";
  //   useEffect(() => {
  //     const getStories = async () => {
  //       axios
  //         .get(
  //           `https://gateway.marvel.com/v1/public/comics?ts=${TS}&apikey=${API_KEY}&hash=${MD5_HASH}}`
  //         )
  //         .then((res) => console.log(res.data))
  //         .catch((err) => console.log(err));
  //     };

  //     getStories();
  //   }, []);

  console.log(location);

  console.log("Props");
  console.log(props);
  return <div>hello</div>;
};
