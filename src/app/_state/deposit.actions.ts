import { createAction, props } from '@ngrx/store';

export const initiateDeposits = createAction('initiateDeposits');
export const getDeposits = createAction('getDeposits', props<{deposits: any}>());