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
  private dictionary: Dictionary;

  constructor(
    store: Store<fromRoot.State>, 
    router: Router,
    route: ActivatedRoute, 
    dictsEffects: DictionariesEffects
  ) {
    this.store = store;
    this.router = router;
    this.route = route;

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

  public saveDictionary(): void {
    this.store.dispatch(
      new UpdateDictionaryAction(this.formDictionary.getSanitizedDictionary())
    );
  }

  private addSubscriptions(dictsEffects: DictionariesEffects): void {
    dictsEffects.updateDictionary$.subscribe(action => {
      if (action instanceof UpdateDictionarySuccessAction) {
        this.router.navigate(['/dictionaries']);
      } else if (action instanceof UpdateDictionaryFailAction) {
        // TODO
      }
    });
  }
  
}