import { combineReducers } from 'redux';

import auth from '~/modules/auth/auth.reducer';

const rootReducer = combineReducers({
	auth,
});

export default rootReducer;
