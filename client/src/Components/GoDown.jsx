import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./GoDown.module.css"; // Import CSS module for scoped styling

const GoDown = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // GSAP animation setup
    const textElements = gsap.utils.toArray(`.${styles.text}`);

    textElements.forEach((text) => {
      gsap.to(text, {
        backgroundSize: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: text,
          start: "center 80%",
          end: "center 20%",
          scrub: true,
        },
      });
    });
  }, []); // Run once on component mount

  return (
    <div className={styles.GoDowncontainer}>
      <h1 className={styles.text}>EXPERIENCE</h1>
      <h1 className={styles.text}>
        MAGICSPRINGS
        <span className={styles.effect2}>MEET LUXURY</span>
      </h1>
      <h1 className={styles.text}>
        DESIGN THAT INSPIRE
        <span className={styles.effect1}>FITTING THAT ENDURE</span>
      </h1>
      <h1 className={styles.text}>
        PREMIUM BATHWARE
        <span className={styles.effect2}>
          <a rel="noopener noreferrer">VIEW PRODUCTS</a>
        </span>
      </h1>
      <h1 className={styles.text}>
        CATALOGUE
        <span className={styles.effect1}>
          <a rel="noopener noreferrer">DOWNLOAD HERE</a>
        </span>
      </h1>
    </div>
  );
};

export default GoDown;
