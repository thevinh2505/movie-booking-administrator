import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import adminSlice from "features/admin/utils/AdminSlice";
// import loadingReducer from 'common/utils/LoadingReducer'
const rootReducer = combineReducers({
	admin: adminSlice,
	// loading:loadingReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

export default store;
