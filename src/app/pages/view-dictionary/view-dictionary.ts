import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import { Dictionary } from '../../models/dictionary';

@Component({
  selector: 'view-dictionary',
  templateUrl: './view-dictionary.html',
  styleUrls: ['./view-dictionary.scss']
})
export class ViewDictionaryComponent implements OnInit {
  private store: Store<fromRoot.State>
  private route: ActivatedRoute;
  private dictionary: Dictionary;

  constructor(store: Store<fromRoot.State>, route: ActivatedRoute) {
    this.store = store;
    this.route = route;
  }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.store.select(fromRoot.getDictionaries).subscribe(dictionaries => {
        this.dictionary = dictionaries.find(dictionary => dictionary.id == params['id']);
      });
    });
  }
}