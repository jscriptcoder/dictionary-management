import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as actions from '../../actions/list-dictionaries';
import * as fromRoot from '../../reducers';

import { 
    AddDictionaryAction, 
    AddDictionarySuccessAction, 
    AddDictionaryFailAction } from '../../actions/list-dictionaries';
import { DictionaryService } from '../../services/dictionary';
import { DictionariesEffects } from '../../effects/list-dictionaries';

import { Dictionary } from '../../models/dictionary';
import { FormDictionaryComponent } from '../../components/form-dictionary/form-dictionary';
import {
  DictionaryMessageService, 
  DictionaryActionMessage, 
  DictionaryAction } from '../../services/dictionary-message';


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
  private router: Router;
  private dictService: DictionaryService;
  private dicMessageService: DictionaryMessageService;

  constructor(
    store: Store<fromRoot.State>, 
    router: Router,
    dictService: DictionaryService,
    dicMessageService: DictionaryMessageService,
    dictsEffects: DictionariesEffects
  ) {
    this.store = store;
    this.router = router;
    this.dictService = dictService;
    this.dicMessageService = dicMessageService;

    this.addSubscriptions(dictsEffects);
  }

  public createEmptyDictionary(): Dictionary {
    return this.dictService.create('');
  }

  public isDictionaryValid(): boolean {
    return this.formDictionary.isDictionaryValid();
  }

  public saveDictionary(): void {
    this.store.dispatch(
      new AddDictionaryAction(this.formDictionary.sanitizeDictionary())
    );
  }

  private addSubscriptions(dictsEffects: DictionariesEffects): void {
    // Not ideal to subscribe to an effect. Instead subscribe
    // to the store and checks what's changed. But this is easier.
    dictsEffects.addDictionary$.subscribe(action => {
      if (action instanceof AddDictionarySuccessAction) {

        this.dicMessageService.next({
          action: DictionaryAction.ADD,
          dictionary: action.payload
        });

        this.router.navigate(['/dictionaries']);

      } else if (action instanceof AddDictionarySuccessAction) {
        // TODO
      }
    });
  }
  
}