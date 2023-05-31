import React from "react";
import { Carousel } from "react-bootstrap";
import { useState } from "react";

const PaperCarousel = ({ styles, apiData }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      autoPlay={false}
      variant="dark"
      className={styles.result}
      activeIndex={index}
      onSelect={handleSelect}
    >
      {apiData?.map((paper) => (
        <Carousel.Item key={paper._id} className={styles.carouselItem}>
          <object
            className="d-block w-100"
            type="application/pdf"
            data={paper.link}
            width="300"
            height="550"
          ></object>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default PaperCarousel;
