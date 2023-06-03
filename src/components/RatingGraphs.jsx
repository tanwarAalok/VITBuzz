import { BarColorWidth } from '@/utils/helper/Computations';
import React, { Fragment } from 'react'


const RatingGraphs = ({ styles, data }) => {

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