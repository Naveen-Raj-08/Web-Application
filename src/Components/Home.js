import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Home = () => {
  const [ComicData, setComicData] = useState(null);
  const [DataLimit, setDataLimit] = useState(30);
  var API_KEY = "77b9184fd1aaa75683eefec4dce8ef77";
  var MD5_HASH = "27ebb21b1d67a27a2e623115cef766b9";
  var TS = "thecomics";

  useEffect(() => {
    // let API_KEY = "77b9184fd1aaa75683eefec4dce8ef77";
    // let MD5_HASH = "27ebb21b1d67a27a2e623115cef766b9";
    // let TS = "thecomics";
    const getData = async () => {
      await axios
        .get(
          `https://gateway.marvel.com/v1/public/comics?ts=${TS}&apikey=${API_KEY}&hash=${MD5_HASH}&limit=${DataLimit}`
        )
        .then((res) => {
          let comicData = res.data;
          // console.log(comicData.data);
          // setComicData(result);
          const { results, limit } = comicData.data;
          console.log(comicData.data);
          setDataLimit(limit);
          setComicData(results);
        })
        .catch((err) => console.log(err));
    };

    //gateway.marvel.com/v1/public/comics?

    https: getData();
  }, [DataLimit]);

  // href={`${list.resourceURI}?ts=${TS}&apikey=${API_KEY}&hash=${MD5_HASH}`} { URI: list.resourceURI.toString() }

  const comicResult =
    ComicData &&
    ComicData.map((list, index) => (
      <div className="col-md-4 mb-4 " key={index}>
        {
          <Link
            to={{ pathname: "/stories", search: list.resourceURI }}
            className="link"
          >
            <img
              width="100%"
              src={`${list.thumbnail.path}/portrait_uncanny.${list.thumbnail.extension}`}
            />
            <h3 className="text-break">{list.title}</h3>
            <span>{list.resourceURI}</span>
          </Link>
        }
      </div>
    ));

  const handleLoadMore = () => {
    let newLimit = DataLimit + 10;
    setDataLimit(newLimit);

    console.log(newLimit);
  };

  return (
    <div className="container">
      Welcome to the Web application{" "}
      <div className="row">
        {!ComicData ? <span className="spinner-border"></span> : comicResult}

        <button
          className="btn btn-primary load-more mb-5"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      </div>
    </div>
  );
};
