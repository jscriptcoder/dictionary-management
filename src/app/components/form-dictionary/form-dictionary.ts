import { Component, Input, OnInit ,ViewChild, ElementRef } from '@angular/core';
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
  selector: 'form-dictionary',
  templateUrl: './form-dictionary.html',
  styleUrls: ['./form-dictionary.scss'],
})
export class FormDictionaryComponent implements OnInit {

  @Input('dictionary')
  public dictionaryInput: Dictionary;
  public dictionary: Dictionary;

  @ViewChild('newEntryDomainInput')
  public newEntryDomainInput: ElementRef;

  public ngOnInit(): void {
    // This is necessary since the input is readonly
    this.dictionary = this.dictionaryInput;
    this.addEmptyEntry();
  }

  public get enteredEntries(): DomainRange[] {
    return this.dictionary.list.length < 2 ? [] : this.dictionary.list.slice(0, this.dictionary.list.length - 1);
  }

  public get lastEntry(): DomainRange {
    return this.dictionary.list.length === 0 ? <DomainRange>{} : this.dictionary.list[this.dictionary.list.length - 1];
  }

  public onKeydown($event: KeyboardEvent): void {
    if ([KEY_CODES.tab, KEY_CODES.enter].includes($event.keyCode)) {
      $event.preventDefault();

      if (this.isLastEntryValid()) {
        this.addEmptyEntry();
        this.newEntryDomainInput.nativeElement.focus();
      }

    }
  }

  public deleteEntry(idx: number): void {
    if (idx => 0) {
      // I know!!, I'm mutating again. Shame on me
      this.dictionary.list.splice(idx, 1);
    }
  }

  public emptyLastEntry(): void {
    this.lastEntry.domain = '';
    this.lastEntry.range = '';
  }

  public isDictionaryValid(): boolean {
    const len = this.dictionary.list.length;

    if (len > 0) {
      const lastEntry = this.lastEntry;

      // This validation only checks whether the dictionary
      // has a title, it's not empty, and all its entries are 
      // populated, except the case the last one, newEmptyEntry, 
      // is completely empty, in which case it's still valid.
      return this.dictionary.name !== '' &&
        !this.enteredEntries.find((entry, idx) => !this.isEntryValid(idx)) &&
        (
          // Either the both values are populated
          (lastEntry.domain !== '' && lastEntry.range !== '') ||
          // or both values are empty
          (lastEntry.domain === '' && lastEntry.range === '')
        );

    } else {
      return false;
    }
  }

  public sanitizeDictionary(): Dictionary {
    this.dictionary.list = this.dictionary.list.filter(entry => {
      return entry.domain !== '' && entry.range !== ''
    });

    return this.dictionary;
  }

  private isLastEntryValid(): boolean {
    return this.lastEntry.domain !== '' && this.lastEntry.range !== '';
  }

  private isEntryValid(idx: number): boolean {
    const entry = this.dictionary.list[idx];
    return entry.domain !== '' && entry.range !== '';
  }

  private addEmptyEntry(): void {
    // I know, I'm mutating
    this.dictionary.list.push({ domain: '', range: '' });
  }
}