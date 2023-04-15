import React, { Fragment } from 'react'

const BarColorWidth = (value) => {
    const percentageValue = value * 20;

    if (percentageValue >= 80) {
        return { backgroundColor: "green", width: `${percentageValue}%` };
    } else if (percentageValue >= 50) {
        return { backgroundColor: "yellow", width: `${percentageValue}%` };
    } else return { backgroundColor: "red", width: `${percentageValue}%` };
};

const RatingGraphs = ({ styles, data }) => {
    // let avgRating = 0, paperRating = 0, behaviourRating = 0, teachingRating = 0;

    // const totalReviews = reviews.length;

    // reviews.map((review) => {
    //     avgRating += review.ratings.avgRating;
    //     paperRating += review.ratings.paperRating;
    //     behaviourRating += review.ratings.behaviourRating;
    //     teachingRating += review.ratings.teachingRating;
    // })

    // avgRating = avgRating / totalReviews;
    // paperRating = paperRating / totalReviews;
    // behaviourRating = behaviourRating / totalReviews;
    // teachingRating = teachingRating / totalReviews;

  return (
    <Fragment>
      <div className={styles.ratingDiv}>
        <p>Overall Rating</p>
        <div className={styles.barParent}>
          <div
            style={BarColorWidth(data.overallRating)}
            className={styles.bar}
          ></div>
        </div>
      </div>
      <div className={styles.ratingDiv}>
        <p>Paper Rating</p>
        <div className={styles.barParent}>
          <div
            style={BarColorWidth(data.overallPaperRating)}
            className={styles.bar}
          ></div>
        </div>
      </div>
      <div className={styles.ratingDiv}>
        <p>Teaching Rating</p>
        <div className={styles.barParent}>
          <div
            style={BarColorWidth(data.overallTeachingRating)}
            className={styles.bar}
          ></div>
        </div>
      </div>
      <div className={styles.ratingDiv}>
        <p>Behaviour Rating</p>
        <div className={styles.barParent}>
          <div
            style={BarColorWidth(data.overallBehaviourRating)}
            className={styles.bar}
          ></div>
        </div>
      </div>
    </Fragment>
  );
}

export default RatingGraphs