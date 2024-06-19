import React, { useEffect, useRef, useState } from "react";
import "./Slider.css"; // Ensure to create a separate CSS file with the provided styles

const Slider = () => {
  const sliderRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const timeTrans = 4000;

  const images = [
    {
      url: "https://images.unsplash.com/photo-1421809313281-48f03fa45e9f?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1000",
      title: "Jackets Collection 2017",
    },
    {
      url: "https://images.unsplash.com/uploads/1411724908903377d4696/2e9b0cb2?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1000",
      title: "Accessories",
    },
    {
      url: "https://images.unsplash.com/photo-1416838375725-e834a83f62b7?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1000",
      title: "Winter Shoes",
    },
    {
      url: "https://images.unsplash.com/35/JOd4DPGLThifgf38Lpgj_IMG.jpg?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1000",
      title: "Winter Collection 2017",
    },
    {
      url: "https://images.unsplash.com/photo-1453974336165-b5c58464f1ed?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1000",
      title: "Summer Collection",
    },
  ];

  const navigate = (dir) => {
    let nextIndex;
    if (dir === "right") {
      nextIndex = current < images.length - 1 ? current + 1 : 0;
    } else {
      nextIndex = current > 0 ? current - 1 : images.length - 1;
    }
    setCurrent(nextIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoUpdate) navigate("right");
    }, timeTrans);
    return () => clearInterval(interval);
  }, [autoUpdate, current]);

  const handleMouseEnter = () => setAutoUpdate(false);
  const handleMouseLeave = () => setAutoUpdate(true);

  const handleTouchStart = (e) => {
    sliderRef.current.xDown = e.touches[0].clientX;
    sliderRef.current.yDown = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (!sliderRef.current.xDown || !sliderRef.current.yDown) {
      return;
    }
    const xUp = e.touches[0].clientX;
    const yUp = e.touches[0].clientY;
    const xDiff = sliderRef.current.xDown - xUp;
    const yDiff = sliderRef.current.yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        navigate("right");
      } else {
        navigate("left");
      }
    }
    sliderRef.current.xDown = null;
    sliderRef.current.yDown = null;
  };

  return (
    <div className="main">
      <div
        className="cd-slider"
        ref={sliderRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <ul>
          {images.map((image, index) => (
            <li
              key={index}
              className={
                current === index
                  ? "current"
                  : index === (current === 0 ? images.length - 1 : current - 1)
                  ? "prev_slide"
                  : ""
              }
            >
              <div
                className="image"
                style={{ backgroundImage: `url(${image.url})` }}
              ></div>
              <div className="content">
                <h2>{image.title}</h2>
                <a href="#">View Gallery</a>
              </div>
            </li>
          ))}
        </ul>
        {images.length > 1 && (
          <nav>
            <button
              className="prev"
              aria-label="Prev"
              onClick={() => navigate("left")}
            ></button>
            <div className="counter">
              <span>{current + 1}</span>
              <span>{images.length}</span>
            </div>
            <button
              className="next"
              aria-label="Next"
              onClick={() => navigate("right")}
            ></button>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Slider;
