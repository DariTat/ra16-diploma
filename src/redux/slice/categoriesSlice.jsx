import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    itemCategories: [{id: 0, title: 'Все'}],
    categorieActive: 0,
    loadingCategories: true,
    errorCategories: null
}

export const categoriesListSlice = createSlice({
    name: 'categoriesList',
    initialState,
    reducers: {
        categoriesListRequest: (state) => {
            state.loadingCategories = true;
            state.errorCategories = false;
            state.categorieActive = 0;
        },
        categoriesListFailure: (state, action) => {
            state.loadingCategories = false;
            state.errorCategories = action.payload;
            state.categorieActive = 0;
        },
        categoriesListSuccess: (state, action) => {
            state.itemCategories = [...state.itemCategories.concat(action.payload)];
            state.loadingCategories = false;
            state.errorCategories = null;
            state.categorieActive = 0;
        },
        categoriesChange: (state, action) => {
            state.categorieActive = action.payload;
        },
        clearCategories: (state) => {
            state.itemCategories = [{id: 0, title: 'Все'}],
            state.loadingCategories = false,
            state.errorCategories = null
        }
    }
})

export const { categoriesListRequest, categoriesListFailure, categoriesListSuccess, categoriesChange, clearCategories } = categoriesListSlice.actions;

export default categoriesListSlice.reducer;