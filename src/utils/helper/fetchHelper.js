import axios from "axios";

const fetchUser = async (setUser,email) => {
     return await axios
      .get(`/api/user/${email}`)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
};
  
module.exports = {
    fetchUser
}