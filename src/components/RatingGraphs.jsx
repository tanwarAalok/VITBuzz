import { BarColorWidth } from '@/utils/helper/Computations';
import React, { Fragment } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';


const RatingGraphs = ({ styles, data }) => {
  return (
    <Fragment>
      <div className={styles.ratingDiv}>
        <p>Overall Rating</p>
        <div className={styles.barParent}>
            <ProgressBar variant={BarColorWidth(data.overallRating).backgroundColor} now={BarColorWidth(data.overallRating).width} />
        </div>
      </div>
      <div className={styles.ratingDiv}>
        <p>Paper Rating</p>
        <div className={styles.barParent}>
            <ProgressBar variant={BarColorWidth(data.overallPaperRating).backgroundColor} now={BarColorWidth(data.overallPaperRating).width} />
        </div>
      </div>
      <div className={styles.ratingDiv}>
        <p>Teaching Rating</p>
        <div className={styles.barParent}>
            <ProgressBar variant={BarColorWidth(data.overallTeachingRating).backgroundColor} now={BarColorWidth(data.overallTeachingRating).width} />
        </div>
      </div>
      <div className={styles.ratingDiv}>
        <p>Behaviour Rating</p>
        <div className={styles.barParent}>
            <ProgressBar variant={BarColorWidth(data.overallBehaviourRating).backgroundColor} now={BarColorWidth(data.overallBehaviourRating).width} />
        </div>
      </div>
    </Fragment>
  );
}

export default RatingGraphs