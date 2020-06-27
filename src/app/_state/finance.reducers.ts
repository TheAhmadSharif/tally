import { createReducer, on, StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';

import { 
	initiateDeposits, 
	getDeposits,
	initiateExpenses,
	getExpenses
} from './finance.actions';

export const initialState = {};

export const DepsoitReducer = createReducer(initialState, on(getDeposits, (state, payload) => {
	return payload.deposits;
}));

export const ExpenseReducer = createReducer(initialState, on(getExpenses, (state, payload) => {
	return payload.expenses;
}));

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
  	console.group(action.type);
    console.log(`%c prev state`, `color: #9E9E9E; font-weight: bold`, state);
    console.log(`%c action`, `color: #03A9F4; font-weight: bold`, action);
    console.log(`%c next state`, `color: #4CAF50; font-weight: bold`, state);
    console.groupEnd();
 
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<any>[] = [debug];
