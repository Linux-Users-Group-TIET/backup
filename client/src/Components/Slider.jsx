import React from "react";
import "./Slider.css";

const Card = () => {
  const cardsData = [
    {
      title: "Showers",
      copy: "Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains",
      button: "View Trips",
      imageId: "1517021897933-0e0319cfbc28",
    },
    {
      title: "Basin",
      copy: "Plan your next beach trip with these fabulous destinations",
      button: "View Trips",
      imageId: "1533903345306-15d1c30952de",
    },
    {
      title: "Sinks",
      copy: "It's the desert you've always dreamed of",
      button: "Book Now",
      imageId: "1545243424-0ce743321e11",
    },
    {
      title: "PVC",
      copy: "Seriously, straight up, just blast off into outer space today",
      button: "Book Now",
      imageId: "1531306728370-e2ebd9d7bb99",
    },
  ];

  return (
    <main className="page-content">
      <div className="card-main">
        <div
          className="card"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-${cardsData[0].imageId}?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ)`,
          }}
        >
          <div className="content">
            <h2 className="title">{cardsData[0].title}</h2>
            <p className="copy">{cardsData[0].copy}</p>
            {/* <button className="btn">{cardsData[0].button}</button> */}
          </div>
        </div>
      </div>

      <div className="card-main">
        <div
          className="card"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-${cardsData[1].imageId}?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ)`,
          }}
        >
          <div className="content">
            <h2 className="title">{cardsData[1].title}</h2>
            <p className="copy">{cardsData[1].copy}</p>
            {/* <button className="btn">{cardsData[1].button}</button> */}
          </div>
        </div>
      </div>

      <div className="card-main">
        <div
          className="card"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-${cardsData[2].imageId}?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ)`,
          }}
        >
          <div className="content">
            <h2 className="title">{cardsData[2].title}</h2>
            <p className="copy">{cardsData[2].copy}</p>
            {/* <button className="btn">{cardsData[2].button}</button> */}
          </div>
        </div>
      </div>

      <div className="card-main">
        <div
          className="card"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-${cardsData[3].imageId}?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ)`,
          }}
        >
          <div className="content">
            <h2 className="title">{cardsData[3].title}</h2>
            <p className="copy">{cardsData[3].copy}</p>
            {/* <button className="btn">{cardsData[3].button}</button> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Card;
