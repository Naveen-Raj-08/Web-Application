import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [ComicData, setComicData] = useState(null);
  const [DataLimit, setDataLimit] = useState(10);
  var API_KEY = "77b9184fd1aaa75683eefec4dce8ef77";
  var MD5_HASH = "27ebb21b1d67a27a2e623115cef766b9";
  var TS = "thecomics";

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(
          `https://gateway.marvel.com/v1/public/comics?ts=${TS}&apikey=${API_KEY}&hash=${MD5_HASH}&limit=${DataLimit}`
        )
        .then((res) => {
          let comicData = res.data;

          const { results, limit } = comicData.data;
          console.log(comicData.data);
          setDataLimit(limit);
          setComicData(results);
        })
        .catch((err) => console.log(err));
    };
    getData();
  }, [DataLimit, API_KEY, MD5_HASH, TS]);

  const comicResult =
    ComicData &&
    ComicData.map((list, index) => (
      <div className="col-md-3 mb-4 " key={index}>
        {
          <a
            href={"/stories"}
            onClick={() => {
              navigate("/stories", {
                state: list.resourceURI,
              });
            }}
            className="link"
          >
            <img
              width="100%"
              src={`${list.thumbnail.path}.${list.thumbnail.extension}`}
              alt="Comic"
            />
            <h3 className="text-break">{list.title}</h3>
            <span className="text-break">{list.resourceURI}</span>
          </a>
        }
      </div>
    ));

  const handleLoadMore = () => {
    let newLimit = DataLimit + 10;
    setDataLimit(newLimit);

    console.log(newLimit);
  };

  return (
    <>
      <title>Homepage</title>

      <div className="container">
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
    </>
  );
};
