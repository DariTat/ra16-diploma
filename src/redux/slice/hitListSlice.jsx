import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    loading: false,
    error: null
}

export const hitListSlice = createSlice({
    name: 'hitList',
    initialState,
    reducers: {
        hitListRequest: (state) => {
            state.loading = true;
            state.error = false;
        },
        hitListFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        hitListSuccess: (state, action) => {
            state.items = action.payload;
            state.loading = false;
            state.error = null;
        }
    }
})

export const { hitListRequest, hitListFailure, hitListSuccess } = hitListSlice.actions;

export default hitListSlice.reducer;