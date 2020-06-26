import { createAction, props } from '@ngrx/store';

export const initiateDeposits = createAction('initiateDeposits');
export const getDeposits = createAction('getDeposits', props<{deposits: any}>());


export const initiateExpenses = createAction('initiateExpenses');
export const getExpenses = createAction('getExpenses', props<{expenses: any}>());