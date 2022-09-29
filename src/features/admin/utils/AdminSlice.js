import produce from "immer";
import { SET_ARRAY_FILM, SET_MOVIE_DETAIL } from "./action";

const initialState = {
	arrFilm: [],
	user: {},
	movieDetail:{},
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ARRAY_FILM:
			return produce(state, (draft) => {
				draft.arrFilm = action.payload;
			});
			case SET_MOVIE_DETAIL:
				return produce(state, (draft) => {
					draft.movieDetail = action.payload;
				});
		default:
			return { ...state };
	}
};
export default reducer;
