import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'confirm-delete-dictionary',
  template: `
    <h3 md-dialog-title>Confirm delete</h3>
    <p md-dialog-content>Do you really want to delete {{data.dictionaryName}}?</p>
    <div md-dialog-actions>
      Actions here
    </div>
  `,
})
export class ConfirmDeleteDictionaryComponent {

  private dialogRef: MdDialogRef<ConfirmDeleteDictionaryComponent>;
  public data: any;

  constructor(
    dialogRef: MdDialogRef<ConfirmDeleteDictionaryComponent>, 
    @Inject(MD_DIALOG_DATA) data: any) {

    this.dialogRef = dialogRef;
    this.data = data;
  }
}