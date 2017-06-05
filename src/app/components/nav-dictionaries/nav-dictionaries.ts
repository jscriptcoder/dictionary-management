import { Component, Input } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';

import { DictionariesEffects } from '../../effects/list-dictionaries';
import { ConfirmDeleteDictionaryComponent } from './confirm-delete-dictionary';
import { Dictionary } from '../../models/dictionary';


@Component({
  selector: 'nav-dictionaries',
  templateUrl: './nav-dictionaries.html',
  styleUrls: ['./nav-dictionaries.scss']
})
export class NavDictionariesComponent {
  
  @Input() 
  public dictionaries: Dictionary[] = [];
  public dialog: MdDialog;

  constructor(dialog: MdDialog, dictsEffects: DictionariesEffects) {
    this.dialog = dialog;

    /*
    dictsEffects.updateDictionary$.subscribe(action => {
      if (action instanceof UpdateDictionarySuccessAction) {
        // TODO
      } else if (action instanceof UpdateDictionaryFailAction) {
        // TODO
      }
    });
    */
  }

  public dialogConfirm(dictionary: Dictionary): void {
    let dialogRef = this.dialog.open(ConfirmDeleteDictionaryComponent, {
      hasBackdrop: true,
      data: { dictionary }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}