import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    itemCatalog: [],
    loadingCatalog: true,
    errorCatalog: null,
    activeCategorie: null,
    itemLength: null,
    search: '',
    item: null,
    id: null,
}

export const catalogListSlice = createSlice({
    name: 'catalogList',
    initialState,
    reducers: {
        catalogListRequest: (state) => {
            state.loadingCatalog = true;
            state.errorCatalog = false;
        },
        catalogListFailure: (state, action) => {
            state.loadingCatalog = false;
            state.errorCatalog = action.payload;
        },
        catalogListSuccess: (state, action) => {
            state.itemCatalog = [...state.itemCatalog.concat(action.payload)];
            state.loadingCatalog = false;
            state.errorCatalog = null;
            state.itemLength = action.payload.length;
        },
        catalogListReset: (state) => {
            state.itemCatalog = [];
            state.loadingCatalog = false;
            state.errorCatalog = null;
        },
        getMore: (state, action) => {
            state.loadingCatalog = true;
            state.activeCategorie = action.payload; 
        },
        searchItemsCatalog: (state, action) => {
            state.itemCatalog = [];
            state.search = action.payload;
        },
        searchItem: (state, action) => {
            state.id = action.payload;
            state.loadingCatalog = true;
            state.errorCatalog = false;
        },
        searchSuccess: (state, action) => {
            state.item = action.payload;
            state.loadingCatalog = false;
            state.errorCatalog = null;
        }
    }
})

export const { catalogListRequest, catalogListFailure, catalogListSuccess, catalogListReset, getMore, searchItemsCatalog, searchItem, searchSuccess } = catalogListSlice.actions;

export default catalogListSlice.reducer;