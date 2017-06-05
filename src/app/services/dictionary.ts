import { Injectable } from '@angular/core';
import {
  Dictionary, DomainRange,
  Domain, Range, 
  create, add, remove, update, findFromDomain,
  isEntryDuplicateDomainRange,
  isEntryDuplicateDomain,
  isEntryPartOfChain,
  isEntryPartOfCycle
} from '../models/dictionary';

/**
 * Simple ng2 wrapper for Dictionary model
 */

@Injectable()
export class DictionaryService {
  public create(name: string, list?: DomainRange[]): Dictionary {
    return create(name, list);
  }

  public add(domain: Domain, range: Range, dictionary: Dictionary): Dictionary {
    return add(domain, range, dictionary);
  }

  public update(domain: Domain, range: Range, dictionary: Dictionary): Dictionary {
    return update(domain, range, dictionary);
  }

  public remove(domain: Domain, dictionary: Dictionary): Dictionary {
    return remove(domain, dictionary);
  }

  public findFromDomain(domain: Domain, dictionary: Dictionary): [DomainRange, number] {
    return findFromDomain(domain, dictionary);
  }

  public findFromRange(range: Range, dictionary: Dictionary): [DomainRange, number] {
    return findFromDomain(range, dictionary);
  }

  public isEntryDuplicateDomainRange(entry: DomainRange, idx: number, dictionary: Dictionary): boolean {
    return isEntryDuplicateDomainRange(entry, idx, dictionary);
  }

  public isEntryDuplicateDomain(entry: DomainRange, idx: number, dictionary: Dictionary): boolean {
    return isEntryDuplicateDomain(entry, idx, dictionary);
  }

  public isEntryPartOfChain(entry: DomainRange, idx: number, dictionary: Dictionary): boolean {
    return isEntryPartOfChain(entry, idx, dictionary);
  }
  
  public isEntryPartOfCycle(entry: DomainRange, idx: number, dictionary: Dictionary): boolean {
    return isEntryPartOfCycle(entry, idx, dictionary);
  }
}