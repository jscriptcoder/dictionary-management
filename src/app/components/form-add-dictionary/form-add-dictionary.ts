import { Component, ViewChild, ElementRef } from '@angular/core';
import { DictionaryService } from '../../services/dictionary';
import { Dictionary, Domain, DomainRange } from '../../models/dictionary';

enum KEY_CODES {
  tab = 9,
  enter = 13
}

/**
 * For simplicity, this component will manage its own state.
 * This means, I'm gonna do horrible mutations.
 */

@Component({
  selector: 'form-add-dictionary',
  templateUrl: './form-add-dictionary.html',
  styleUrls: ['./form-add-dictionary.scss'],
  providers: [ DictionaryService ]
})
export class FormAddDictionaryComponent {
  
  public dictionary: Dictionary;
  public newEntry: DomainRange;

  @ViewChild('newEntryDomainInput') newEntryDomainInput: ElementRef;

  private dictService: DictionaryService;

  constructor(dictService: DictionaryService) {
    this.dictService = dictService;

    this.dictionary = dictService.create(''); // Empty dictionary
    this.newEntry = { domain: '', range: ''}
  }

  public onKeydownEnter($event: KeyboardEvent): void {
      $event.preventDefault();
      this.addEntry();
  }

  public onBlur(): void {
      this.addEntry();
  }

  public deleteEntry(domain: Domain) {
    const [ , idx] = this.dictService.findFromDomain(domain, this.dictionary);
    if (idx => 0) {
      this.dictionary.list.splice(idx, 1); // I know!!, I'm mutating again. Shame on me
    }
  }

  private addEntry(): void {
      if (this.isNewEntryValid()) {

        this.dictionary.list.push(this.newEntry); // I know, I'm mutating
        this.newEntry = { domain: '', range: ''};

        this.newEntryDomainInput.nativeElement.focus();

      }
  }

  private isNewEntryValid(): boolean {
    return this.newEntry.domain !== '' && this.newEntry.range !== '';
  }
}