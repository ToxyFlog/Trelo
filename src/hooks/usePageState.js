import React, {useEffect, useState} from "react";
import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";
import config from "../config";

let timeout = null;
const usePageState = (initState, onLoad, isError, errorMsg, isLoading, deps, debounce) => {
	const [state, setState] = useState(initState());
	const [isSaved, setSaved] = useState(true);
	const [loading, setLoading] = useState(!state || isError());

	// Init & on change through reducer
	useEffect(() => {
		if (!loading) onLoad();
		setTimeout(() => setLoading(false), config.FORCE_LOADING_MS);
	}, []);

	useEffect(() => {
		setState(deps);
	}, !deps ? [{}] : deps[Symbol.iterator] ? deps : [deps]);


	// Debounce
	const startTimer = state => {
		if (timeout !== null) clearTimeout(timeout);

		timeout = setTimeout(() => {
			debounce(state);
			setSaved(true);
		}, config.DEBOUNCE_SAVE_MS);
	};

	const clearTimer = () => clearTimeout(timeout);

	const changeState = (changes, timer = true) => {
		const newState = {...state, ...changes};

		if (timer) startTimer(newState);

		setState(newState);
		setSaved(false);
	};


	// Page state
	let pageState = null;
	if (loading) pageState = <PageLoading/>;
	else if (isError()) pageState = <PageError>{errorMsg}</PageError>;
	else if (isLoading(state)) pageState = <PageLoading/>;

	return [pageState, state, changeState, isSaved, clearTimer];
};

export default usePageState;