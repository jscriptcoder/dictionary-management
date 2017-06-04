import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import { AddDictionaryAction } from '../../actions/list-dictionaries';
import { FormAddDictionaryComponent } from '../../components/form-add-dictionary/form-add-dictionary';


@Component({
  selector: 'add-dictionary',
  templateUrl: './add-dictionary.html',
  styleUrls: ['./add-dictionary.scss']
})
export class AddDictionaryComponent {

  @ViewChild(FormAddDictionaryComponent) formAddDictionary: FormAddDictionaryComponent;

  private store: Store<fromRoot.State>

  constructor(store: Store<fromRoot.State>) {
    this.store = store;
  }

  public isDictionaryValid(): boolean {
    return this.formAddDictionary.isDictionaryValid();
  }

  public saveDictionary(): void {
    this.store.dispatch(
      new AddDictionaryAction(this.formAddDictionary.getSanitizedDictionary())
    );
  }
  
}