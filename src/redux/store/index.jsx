import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import saga from '../../sagas';
import hitListReducer from '../slice/hitListSlice';
import categoriesListReducer from '../slice/categoriesSlice';
import catalogListReducer from '../slice/catalogListSlice';
import basketListReducer from '../slice/basketListSlice';
import orderReducer from '../slice/orderSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
      hitList: hitListReducer,
      categoriesList: categoriesListReducer,
      catalogList: catalogListReducer,
      basketList: basketListReducer,
      order: orderReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
})

sagaMiddleware.run(saga);