import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'confirm-delete-dictionary',
  template: `
    <h3 md-dialog-title>
      <span>Confirm delete</span>
      <md-icon color="warn">warning</md-icon>
    </h3>
    <p md-dialog-content>Do you really want to delete {{data.dictionary.name}}?</p>
    <div md-dialog-actions>
      <button md-dialog-close="no" class="cancel-delete" md-raised-button>
        <md-icon>clear</md-icon>
        <span>No</span>
      </button>
      <button md-dialog-close="yes" class="yes-delete" md-raised-button color="primary">
        <md-icon>done</md-icon>
        <span>Yes</span>
      </button>
    </div>
  `,
  styles: [`
    :host { font-family: Roboto,"Helvetica Neue",sans-serif; }
    [md-dialog-title] {
      display: flex;
      justify-content: space-between;
    }
    [md-dialog-actions] {
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class ConfirmDeleteDictionaryComponent {

  constructor(
    private dialogRef: MdDialogRef<ConfirmDeleteDictionaryComponent>, 
    @Inject(MD_DIALOG_DATA) public data: any) {}
}