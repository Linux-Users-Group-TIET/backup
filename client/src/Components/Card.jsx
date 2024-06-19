import React from "react";

const Card = ({ title, content }) => (
  <div style={styles.card}>
    <h1 style={styles.h1}>{title}</h1>
    <hr style={styles.divider} />
    <p style={styles.p}>{content}</p>
  </div>
);

const HorizontalCards = () => {
  return (
    <div style={styles.container}>
      <Card
        title="Quality Craftsmanship"
        content="Experience the pinnacle of quality with our meticulously crafted bathroom fittings, designed to elevate both style and functionality."
      />
      <Card
        title="Innovative Designs"
        content="Discover cutting-edge designs that seamlessly blend modern aesthetics with practicality, transforming your bathroom into a luxurious retreat."
      />
      <Card
        title="Customer-Centric Service"
        content="Enjoy a seamless journey from selection to installation, supported by our knowledgeable team dedicated to your satisfaction."
      />
      <Card
        title="Reliability and Durability"
        content="Trust in products built to last, backed by our commitment to using high-quality materials and offering comprehensive warranties."
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "black",
    padding: "20px",
    flexWrap: "wrap", // Allow cards to wrap on smaller screens
    gap: "20px", // Gap between cards
  },
  card: {
    border: "1px solid white",
    padding: "20px",
    color: "white",
    textAlign: "center",
    minWidth: "300px", // Minimum width of each card
    flex: "1 1 300px", // Flex settings for responsiveness
    maxWidth: "400px", // Maximum width of each card
  },
  h1: {
    margin: "0",
  },
  divider: {
    border: "0",
    borderTop: "1px solid white",
    margin: "10px 0",
  },
  p: {
    margin: "0",
  },
};

export default HorizontalCards;
