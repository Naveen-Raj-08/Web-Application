import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Stories = (props) => {
  const [Comic, setComic] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.state);
  var API_KEY = "77b9184fd1aaa75683eefec4dce8ef77";
  var MD5_HASH = "27ebb21b1d67a27a2e623115cef766b9";
  var TS = "thecomics";
  useEffect(() => {
    const getStories = async () => {
      axios
        .get(`${location.state}?ts=${TS}&apikey=${API_KEY}&hash=${MD5_HASH}`)
        .then((res) => {
          let story = res.data;
          const { results } = story.data;
          setComic(results);
        })
        .catch((err) => console.log(err));
    };

    getStories();
  }, []);

  console.log(Comic);

  const comicStory =
    Comic &&
    Comic.map((list, index) => (
      <div className="row" key={index}>
        <div className="col-md-4">
          {
            <img
              width="100%"
              src={`${list.thumbnail.path}.${list.thumbnail.extension}`}
              alt="Image"
            />
          }
        </div>
        <div className="col-md-8">
          {<h5 className="text-break">{list.title}</h5>}
          {
            <p className="text-break">
              {!list.description ? (
                <span>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </span>
              ) : (
                list.description
              )}
            </p>
          }

          <div className="row comic-series">
            <div className="col-sm-4">
              <a
                className="text-secondary text-decoration-none"
                href="/series"
                onClick={() =>
                  navigate("/series", { state: list.series.resourceURI })
                }
              >
                <h4 className="series-title ">{list.series.name}</h4>
              </a>
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="container stories-wrapper">
      <div className="row">
        {!Comic ? <span className="spinner-border"></span> : comicStory}
      </div>
    </div>
  );
};
