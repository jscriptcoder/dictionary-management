
import 'rxjs/add/operator/let';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Dictionary } from '../../models/dictionary';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'list-dictionaries',
  templateUrl: './list-dictionaries.html',
  styleUrls: ['./list-dictionaries.scss'],
})
export class ListDictionariesComponent {
  public dictionaries$: Observable<Dictionary[]>;

  constructor(store: Store<fromRoot.State>) {
    this.dictionaries$ = store.select(fromRoot.getDictionaries);
  }
}