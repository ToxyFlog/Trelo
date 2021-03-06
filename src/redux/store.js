import {applyMiddleware, compose, createStore} from "redux";
import reducer from "./reducers";
import thunk from "redux-thunk";
import bundle from "../services/api";

const store =
	process.env.NODE_ENV === "production" ?
		createStore(reducer, applyMiddleware(thunk.withExtraArgument(bundle)))
		:
		createStore(reducer, (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(applyMiddleware(thunk.withExtraArgument(bundle))));

export default store;