import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { GeneralService } from 'src/app/services/general.service';
import { loadPosts, loadPostsSuccess } from '../../actions/general/general.actions';


@Injectable()
export class GeneralEffects {

  constructor(
    private actions$: Actions,
    private generalService: GeneralService
  ) { }
  
  // ...
  // LOAD ORDERS
  // ...
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      mergeMap((payload) => {
        return this.generalService.loadPosts().pipe(
          map((response) => {
            return loadPostsSuccess({
              data: response,
            });
          })
        );
      })
    )
  );

  loadPostsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPostsSuccess),
      map((payload) => {
        // pass
      })
    ), {dispatch: false}
  );

}
