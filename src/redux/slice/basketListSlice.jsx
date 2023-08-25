import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    products: [],

}


export const basketListSlice = createSlice({
    name: 'basketList',
    initialState,
    reducers: {
        basketProducts: (state, action) => {
            state.products = action.payload;
        }
    }
})

export const { basketProducts } = basketListSlice.actions;

export default basketListSlice.reducer;