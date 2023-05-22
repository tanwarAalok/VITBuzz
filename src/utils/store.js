import { create } from "zustand";

const useStore = create((set) => ({
    allFaculties: [],
    facultyDetails: {},
}));

export default useStore;
