import {setTopFaculty, setError, setLoading, setAllFaculty} from "@/redux/slices/facultySlice";
import axios from "axios";

export const fetchTopFaculty = async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get("/api/faculty/top");
        const data = await response.data;
        dispatch(setTopFaculty(data.data));
    } catch (error) {
        dispatch(setError(error.message));
    }
};
export const fetchAllFaculty = async (dispatch, gender, sortType) => {

    try {
        dispatch(setLoading(true));
        const response = await axios.get(`/api/faculty?gender=${gender}&sortType=${sortType}`);
        const data = await response.data;
        dispatch(setAllFaculty(data.data));
    } catch (error) {
        dispatch(setError(error.message));
    }
};


