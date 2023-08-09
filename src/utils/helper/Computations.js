const setLikeStatus = (setLiked, user, reviewId) => {
  user.likedReview.length > 0 &&
    user.likedReview.map((r) => {
      if (r.review.valueOf() === reviewId) {
        setLiked(r.liked);
      }
    });
};

const formattedName = (nameString) => {
  let name = nameString.slice(0, -11).toLowerCase();
  return name.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
};

const BarColorWidth = (value) => {
  const percentageValue = value * 20;

  if (percentageValue >= 80) {
    return { backgroundColor: "info", width: percentageValue };
  } else if (percentageValue >= 50) {
    return { backgroundColor: "warning", width: percentageValue };
  } else return { backgroundColor: "danger", width: percentageValue };
};

const isAdmin = (status, email) => {
  return status === "authenticated" && email === process.env.NEXT_PUBLIC_ADMIN
}

module.exports = {
  setLikeStatus,
  formattedName,
  BarColorWidth,
  isAdmin
};