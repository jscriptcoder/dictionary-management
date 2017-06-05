import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import { 
    UpdateDictionaryAction, 
    UpdateDictionarySuccessAction, 
    UpdateDictionaryFailAction } from '../../actions/list-dictionaries';
import { DictionaryService } from '../../services/dictionary';
import { DictionariesEffects } from '../../effects/list-dictionaries';

import { Dictionary } from '../../models/dictionary';
import { FormDictionaryComponent } from '../../components/form-dictionary/form-dictionary';
import {
  DictionaryMessageService, 
  DictionaryActionMessage, 
  DictionaryAction } from '../../services/dictionary-message';

@Component({
  selector: 'edit-dictionary',
  templateUrl: './edit-dictionary.html',
  styleUrls: ['./edit-dictionary.scss']
})
export class EditDictionaryComponent implements OnInit {

  @ViewChild(FormDictionaryComponent)
  private formDictionary: FormDictionaryComponent;
  private store: Store<fromRoot.State>
  private router: Router;
  private route: ActivatedRoute;
  private dicMessageService: DictionaryMessageService;
  private dictionary: Dictionary;

  constructor(
    store: Store<fromRoot.State>, 
    router: Router,
    route: ActivatedRoute,
    dicMessageService: DictionaryMessageService,
    dictsEffects: DictionariesEffects
  ) {
    this.store = store;
    this.router = router;
    this.route = route;
    this.dicMessageService = dicMessageService;

    this.addSubscriptions(dictsEffects);
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

  public cancelEdit(): void {
    this.formDictionary.sanitizeDictionary();
    this.router.navigate(['/dictionaries']);
  }

  public saveDictionary(): void {
    this.store.dispatch(
      new UpdateDictionaryAction(this.formDictionary.sanitizeDictionary())
    );
  }

  private addSubscriptions(dictsEffects: DictionariesEffects): void {
    dictsEffects.updateDictionary$.subscribe(action => {
      if (action instanceof UpdateDictionarySuccessAction) {

        this.dicMessageService.next({
          action: DictionaryAction.UPDATE,
          dictionary: action.payload
        });

        this.router.navigate(['/dictionaries']);

      } else if (action instanceof UpdateDictionaryFailAction) {
        // TODO
      }
    });
  }
  
}