import { Component, Input } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';

import { ConfirmDeleteDictionaryComponent } from './confirm-delete-dictionary';
import { Dictionary } from '../../models/dictionary';


@Component({
  selector: 'nav-dictionaries',
  templateUrl: './nav-dictionaries.html',
  styleUrls: ['./nav-dictionaries.scss'],
})
export class NavDictionariesComponent {
  @Input() public dictionaries: Dictionary[] = [];

  public dialog: MdDialog;

  constructor(dialog: MdDialog) {
    this.dialog = dialog;
  }

  public dialogConfirm(dictionary: Dictionary): void {
    let dialogRef = this.dialog.open(ConfirmDeleteDictionaryComponent, {
      hasBackdrop: true,
      data: { dictionaryName: dictionary.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}