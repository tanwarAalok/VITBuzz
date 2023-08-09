import React from "react";
import { Carousel } from "react-bootstrap";
import { useState } from "react";
import RightArrow from "../assets/rightArrow.png";
import LeftArrow from "../assets/left-arrow.png"

const ClubActivityCarousel = ({styles}) => {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel
            autoPlay={false}
            variant="dark"
            activeIndex={index}
            onSelect={handleSelect}
            className={styles.carouselParent}
        >
            {/*{apiData?.map((video) => (*/}
                <Carousel.Item className={styles.carouselItem}>
                    <iframe
                        src="https://www.youtube.com/embed/ZzE2ejjyEKM"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </Carousel.Item>
            <Carousel.Item className={styles.carouselItem}>
                    <iframe
                        src="https://www.youtube.com/embed/ZzE2ejjyEKM"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </Carousel.Item>
            {/*))}*/}
        </Carousel>
    );
};

export default ClubActivityCarousel;
