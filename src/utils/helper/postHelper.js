const axios = require("axios");

const voteReviewRequest = async (body, setTrigger, trigger) => {
    return await axios
      .post("/api/review/vote", body)
      .then(function (response) {
        setTrigger(!trigger);
      })
      .catch(function (error) {
        console.log(error.message);
      });
}

const postNewRating = async (body, facultyId, setTrigger, trigger, handleClose) => {
  await axios
    .post("/api/review", body, { params: { facultyId: facultyId } })
    .then(function (response) {
      alert(response.data.message);
      setTrigger(!trigger);
      handleClose();
    })
    .catch(function (error) {
      alert(error.message);
      console.log(error);
    });
};

module.exports = {
    voteReviewRequest,
    postNewRating
}