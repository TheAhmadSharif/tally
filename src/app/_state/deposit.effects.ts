import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';


import { Store, Action } from '@ngrx/store';
import { createEffect, Actions, ofType, Effect } from '@ngrx/effects';
import { initiateDeposits, getDeposits } from './deposit.actions';

import { EMPTY, of, Observable,  } from 'rxjs';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class DepositEffects {
	constructor(public angularFirestore: AngularFirestore,
				public actions$: Actions,
		) {}


	getDeposits$ : Observable<any> = createEffect(() => this.actions$.pipe(
			ofType(initiateDeposits),
			mergeMap(() => this.angularFirestore.collection('deposit').valueChanges()
				.pipe(
					map(deposits => {
							return ({type: 'getDeposits', deposits: deposits })
						}),
					catchError(() => EMPTY)
					)

		))
	)
}
