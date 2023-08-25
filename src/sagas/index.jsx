import { put, spawn, takeEvery, takeLatest } from 'redux-saga/effects';
import { getHitList, getCategoriesList, getCatalogList, getCatalog, getMoreItems, searchItems, getItem, sendOrder } from '../api';
import { 
    hitListRequest,
    hitListFailure,
    hitListSuccess
} from '../redux/slice/hitListSlice';
import {
    categoriesChange,
    categoriesListFailure,
    categoriesListRequest,
    categoriesListSuccess,
    clearCategories
} from '../redux/slice/categoriesSlice'
import {
    catalogListFailure,
    catalogListSuccess,
    catalogListRequest,
    catalogListReset,
    getMore,
    searchItemsCatalog,
    searchSuccess,
    searchItem
} from '../redux/slice/catalogListSlice'
import { orderFailure, orderRequest, orderSuccess } from '../redux/slice/orderSlice';

function* handleHitSaga() {
    try {
        const data = yield getHitList();
        yield put(hitListSuccess(data))
    } catch (e) {
        yield put(hitListFailure(e.message))
    }
}

function* watchHitListSaga() {
    yield takeEvery(hitListRequest, handleHitSaga)
}

function* handleCategoriesSaga() {
    try {
        yield put(clearCategories());
        const data = yield getCategoriesList();
        yield put(categoriesListSuccess(data))
    } catch (e) {
        yield put(categoriesListFailure(e.message))
    }
}

function* watchCategoriesSaga() {
    yield takeLatest(categoriesListRequest, handleCategoriesSaga)
}

function* handleCatalogSaga() {
    try {
        yield put(catalogListReset());
        const data = yield getCatalogList();
        yield put(catalogListSuccess(data));
    } catch (e) {
        yield put(catalogListFailure(e.message));
    }
}

function* watchCatalogSaga() {
    yield takeLatest(catalogListRequest, handleCatalogSaga);
}

function* handleCatalogIdSaga(action) {
    try {
        yield put(catalogListReset());
        const data = yield getCatalog(action.payload);
        yield put(catalogListSuccess(data));
    } catch (e) {
        yield put(catalogListFailure(e.message));
    }
}

function* watchCatalogIdSaga() {
    yield takeLatest(categoriesChange, handleCatalogIdSaga);
}

function* handleGetMoreSaga(action) {
    try {
        const data = yield getMoreItems(action.payload);
        yield put(catalogListSuccess(data));
    } catch (e) {
        yield put(catalogListFailure(e.message));
    }
}

function* watchGetMoreSaga() {
    yield takeLatest(getMore, handleGetMoreSaga);
}

function* handleSearchItemsSaga(action) {
    try {
        const data = yield searchItems(action.payload);
        yield put(catalogListSuccess(data));
    } catch (e) {
        yield put(catalogListFailure(e.message));
    }
}

function* watchSearchItemsSaga() {
    yield takeLatest(searchItemsCatalog, handleSearchItemsSaga);
}

function* handleGetItemSaga(action) {
    try {
        const data = yield getItem(action.payload);
        yield put(searchSuccess(data));
    } catch (e) {
        yield put(catalogListFailure(e.message));a
    }
}

function* watchGetItemSaga() {
    yield takeLatest(searchItem, handleGetItemSaga);
}

function* handleSendOrderSaga (action) {
    try {
        const data = yield sendOrder(action.payload);
        yield put(orderSuccess(data));
    } catch (e) {
        yield put(orderFailure(e.message));
    }
}

function* watchSendOrderSaga() {
    yield takeLatest(orderRequest, handleSendOrderSaga);
}

export default function* saga() {
    yield spawn(watchHitListSaga)
    yield spawn(watchCategoriesSaga)
    yield spawn(watchCatalogSaga)
    yield spawn(watchCatalogIdSaga)
    yield spawn(watchGetMoreSaga)
    yield spawn(watchSearchItemsSaga)
    yield spawn(watchGetItemSaga)
    yield spawn(watchSendOrderSaga)
}