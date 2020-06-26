import { createReducer, on } from '@ngrx/store';
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