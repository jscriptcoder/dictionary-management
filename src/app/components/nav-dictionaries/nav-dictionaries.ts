import { Component, Input } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import { 
    RemoveDictionaryAction, 
    RemoveDictionarySuccessAction, 
    RemoveDictionaryFailAction } from '../../actions/list-dictionaries';
import { DictionariesEffects } from '../../effects/list-dictionaries';
import { ConfirmDeleteDictionaryComponent } from './confirm-delete-dictionary';
import { Dictionary } from '../../models/dictionary';
import {
  DictionaryMessageService, 
  DictionaryActionMessage, 
  DictionaryAction} from '../../services/dictionary-message';


@Component({
  selector: 'nav-dictionaries',
  templateUrl: './nav-dictionaries.html',
  styleUrls: ['./nav-dictionaries.scss']
})
export class NavDictionariesComponent {

  @Input() 
  public dictionaries: Dictionary[] = [];

  private store: Store<fromRoot.State>;
  private dialog: MdDialog;
  private dicMessageService: DictionaryMessageService;

  constructor(
    store: Store<fromRoot.State>,
    dialog: MdDialog,
    dicMessageService: DictionaryMessageService,
    dictsEffects: DictionariesEffects
   ) {
    this.store = store;
    this.dialog = dialog;
    this.dicMessageService = dicMessageService;

    this.addSubscriptions(dictsEffects);
  }

  public dialogConfirm(dictionary: Dictionary): void {
    let dialogRef = this.dialog.open(ConfirmDeleteDictionaryComponent, {
      hasBackdrop: true,
      data: { dictionary }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.dispatch(
          new RemoveDictionaryAction(dictionary)
        );
      }
    });
  }

  private addSubscriptions(dictsEffects: DictionariesEffects): void {
    dictsEffects.removeDictionary$.subscribe(action => {
      if (action instanceof RemoveDictionarySuccessAction) {
        this.dicMessageService.next({
          action: DictionaryAction.DELETE,
          dictionary: action.payload
        });
      } else if (action instanceof RemoveDictionaryFailAction) {
        // TODO
      }
    });
  }
}