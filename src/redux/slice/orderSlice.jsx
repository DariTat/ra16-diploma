import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    order: '',
    loading: false,
    success: null,
    error: null
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        orderRequest: (state, action) => {
            state.info = action.payload;
            state.loading = true;
        },
        orderSuccess: (state, action) => {
            state.loading = false;
            state.success = action.payload; 
        },
        orderFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const { orderRequest, orderFailure, orderSuccess } = orderSlice.actions;

export default orderSlice.reducer;