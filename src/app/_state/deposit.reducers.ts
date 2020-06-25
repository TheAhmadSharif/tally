import { createReducer, on } from '@ngrx/store';
import { initiateDeposits, getDeposits } from './deposit.actions';

export const initialState = {};

export const DepsoitReducer = createReducer(initialState, on(getDeposits, (state, payload) => {
	return payload.deposits;
}));