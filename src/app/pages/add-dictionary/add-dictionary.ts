import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import { AddDictionaryAction } from '../../actions/list-dictionaries';
import { DictionaryService } from '../../services/dictionary';

import { Dictionary } from '../../models/dictionary';
import { FormDictionaryComponent } from '../../components/form-dictionary/form-dictionary';


@Component({
  selector: 'add-dictionary',
  templateUrl: './add-dictionary.html',
  styleUrls: ['./add-dictionary.scss'],
  providers: [ DictionaryService ]
})
export class AddDictionaryComponent {

  @ViewChild(FormDictionaryComponent)
  private formDictionary: FormDictionaryComponent;
  private store: Store<fromRoot.State>
  private dictService: DictionaryService;

  constructor(store: Store<fromRoot.State>, dictService: DictionaryService) {
    this.store = store;
    this.dictService = dictService;
  }

  public createEmptyDictionary(): Dictionary {
    return this.dictService.create('', [{domain: '', range: ''}]);
  }

  public isDictionaryValid(): boolean {
    return this.formDictionary.isDictionaryValid();
  }

  public saveDictionary(): void {
    this.store.dispatch(
      new AddDictionaryAction(this.formDictionary.getSanitizedDictionary())
    );
  }
  
}