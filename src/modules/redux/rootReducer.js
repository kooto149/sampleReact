import { combineReducers } from '@reduxjs/toolkit';
import {
	modalReducer,
} from '@modules/redux';

const rootReducer = combineReducers({
	modal: modalReducer,
});

export default rootReducer;
