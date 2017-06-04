import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import { UpdateDictionaryAction } from '../../actions/list-dictionaries';

import { Dictionary } from '../../models/dictionary';
import { FormDictionaryComponent } from '../../components/form-dictionary/form-dictionary';


@Component({
  selector: 'edit-dictionary',
  templateUrl: './edit-dictionary.html',
  styleUrls: ['./edit-dictionary.scss']
})
export class EditDictionaryComponent implements OnInit {

  @ViewChild(FormDictionaryComponent)
  private formDictionary: FormDictionaryComponent;
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

  public getDictionary(): Dictionary {
    return this.dictionary;
  }

  public isDictionaryValid(): boolean {
    return this.formDictionary.isDictionaryValid();
  }

  public saveDictionary(): void {
    this.store.dispatch(
      new UpdateDictionaryAction(this.formDictionary.getSanitizedDictionary())
    );
  }
  
}