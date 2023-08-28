import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    topFaculty: [],
    allFaculty: [],
    loading: false,
    error: null,
    gender: "",
    sortType: ""
}

export const facultySlice = createSlice({
    name: 'faculty',
    initialState,
    reducers: {
        setLoading(state, value){
            state.loading = value.payload;
        },
        setError(state, value){
            state.error = value.payload;
            state.loading = false;
        },
        setTopFaculty(state, value){
            state.topFaculty = value.payload;
            state.loading = false;
        },
        setAllFaculty(state, value){
            state.allFaculty = value.payload;
            state.loading = false;
        },
        setGender(state, value){
            state.gender = value.payload;
        },
        setSortType(state, value){
            state.sortType = value.payload;
        }
    }
});

export const {
    setGender,
    setSortType,
    setAllFaculty,
    setTopFaculty,
    setLoading,
    setError} = facultySlice.actions;
export default facultySlice.reducer;



