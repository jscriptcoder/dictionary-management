import { Component, Input } from '@angular/core';
import { Dictionary, Domain, DomainRange } from '../../models/dictionary';
import { DictionaryService } from '../../services/dictionary';

@Component({
  selector: 'detail-dictionary',
  templateUrl: './detail-dictionary.html',
  styleUrls: ['./detail-dictionary.scss'],
  providers: [ DictionaryService ]
})
export class DetailDictionaryComponent {
  @Input()
  public dictionary: Dictionary;

  constructor(
    private dictService: DictionaryService
  ) {}

  // The next two methods are duplicate. TODO: share them. Inheritance?
  public isDuplicateDomain(entry: DomainRange, idx: number): boolean {
    return this.dictService.isEntryDuplicateDomain(entry, idx, this.dictionary) ||
      this.dictService.isEntryDuplicateDomainRange(entry, idx, this.dictionary);
  }

  public isChainOrCycle(entry: DomainRange, idx: number): boolean {
    return this.dictService.isEntryPartOfChain(entry, idx, this.dictionary) ||
      this.dictService.isEntryPartOfCycle(entry, idx, this.dictionary);
  }
}