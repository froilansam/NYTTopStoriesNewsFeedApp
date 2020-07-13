import { combineReducers } from 'redux';

import auth from '~/modules/topstories/topstories.reducer';

const rootReducer = combineReducers({
	auth,
});

export default rootReducer;
