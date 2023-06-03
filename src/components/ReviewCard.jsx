import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import { useEffect } from "react";

function AiOutlineArrowUp(props) {
  return (
    <svg
      stroke="currentColor"
      fill={props.color}
      strokeWidth={0}
      viewBox="0 0 1024 1024"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M868 545.5L536.1 163a31.96 31.96 0 0 0-48.3 0L156 545.5a7.97 7.97 0 0 0 6 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z" />
    </svg>
  );
}

function AiOutlineArrowDown(props) {
  return (
    <svg
      stroke="currentColor"
      fill={props.color}
      strokeWidth={0}
      viewBox="0 0 1024 1024"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z" />
    </svg>
  );
}

const formattedName = (nameString) => {
  let name = nameString.slice(0, -11).toLowerCase();
  return name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
};

const ReviewCard = ({ review, styles, trigger, setTrigger }) => {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(null);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
     return await axios
      .get("/api/user", { params: { email: session.user.email } })
      .then((res) => {
        setUser(res.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  useEffect(() => {
    if (session) {
      fetchUser();
    }
  }, [session, trigger]);


  useEffect(() => {
    if (user) {
      user.likedReview.length > 0 &&
        user.likedReview.map((r) => {
          if (r.review.valueOf() === review._id) {
            setLiked(r.liked);
          }
        });
    }
  }, [user]);

  const likeReview = async (like) => {
    if (!user) {
      console.log("User not found");
      signIn();
      return;
    }

    if (liked == like) return;

    const body = {
      reviewId: review._id,
      userData: user,
      liked: like,
    };
    await axios
      .post("/api/review/vote", body)
      .then(function (response) {
        setTrigger(!trigger);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  return (
    <div className={styles.reviewCardParent}>
      <div className={styles.reviewCard}>
        <div className={styles.likePart}>
          <AiOutlineArrowUp
            color={liked === true ? "green" : "white"}
            onClick={() => likeReview(true)}
          />
          <p>{review.upvotes.length - review.downvotes.length}</p>
          <AiOutlineArrowDown
            color={liked === false ? "red" : "white"}
            onClick={() => likeReview(false)}
          />
        </div>
        <div className={styles.reviewPart}>
          <h3>{formattedName(review.user.name)}</h3>
          <p>{review.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
