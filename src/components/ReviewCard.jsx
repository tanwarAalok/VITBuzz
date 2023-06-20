import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { fetchUser } from '../utils/helper/fetchHelper.js';
import { formattedName, setLikeStatus } from "@/utils/helper/Computations.js";
import { voteReviewRequest } from "@/utils/helper/postHelper.js";
import {AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike} from "react-icons/ai";



const ReviewCard = ({ review, styles, trigger, setTrigger }) => {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(null);
  const [user, setUser] = useState(null);


  useEffect(() => {
    if (session) {
      fetchUser(setUser, session.user.email);
    }
  }, [session, trigger]);


  useEffect(() => {
    if (user) {
      setLikeStatus(setLiked, user, review._id);
    }
  }, [user]);

  const likeReview = async (like) => {
    if (liked == like) return;
    if (!user) {
      console.log("User not found");
      signIn();
      return;
    }

    const body = {
      reviewId: review._id,
      userData: user,
      liked: like,
    };
    
    await voteReviewRequest(body, setTrigger, trigger);
  };

  return (
      <div className={styles.reviewCard}>
        <div className={styles.likePart}>
          {
            !liked ? <AiOutlineLike onClick={() => likeReview(true)}/> : <AiFillLike onClick={() => likeReview(true)}/>
          }
          <p>{review.upvotes.length - review.downvotes.length}</p>
          {
            liked == null || liked ? <AiOutlineDislike onClick={() => likeReview(false)}/> : <AiFillDislike onClick={() => likeReview(false)}/>
          }
        </div>
        <div className={styles.reviewPart}>
          <h3>{formattedName(review.user.name)}</h3>
          <p>{review.comment}</p>
        </div>
      </div>
  );
};

export default ReviewCard;
