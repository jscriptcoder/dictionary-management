import { Component } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import {
  DictionaryMessageService, 
  DictionaryActionMessage, 
  DictionaryAction } from './services/dictionary-message';

const SnackBarMessages = {
  [DictionaryAction.ADD]: 'Dictionary added',
  [DictionaryAction.UPDATE]: 'Dictionary updated',
  [DictionaryAction.DELETE]: 'Dictionary deleted',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  providers: [ DictionaryMessageService ]
})
export class AppComponent {
  constructor(
    snackBar: MdSnackBar,
    dictMessageService: DictionaryMessageService
  ) {

    // We want to show a snackbar with every action at the
    // level of the root component (because of the routing). 
    // We use this service (Subject object) to notify the 
    // parent component when an action against a dictionary 
    // happend
    dictMessageService.subscribe(dictAction => {
      snackBar.open(SnackBarMessages[dictAction.action], 'Ok', {
        duration: 2000,
      });
    });
  }
}
