import { Map } from 'immutable';

/* Types: */

export type Domain = string;
export type Range = string;

export interface DomainRange {
  domain: Domain;
  range: Range;
  id: number;
}

export interface Dictionary {
  id: number;
  name: string;
  list: DomainRange[];
}

type Chain = [DomainRange, DomainRange];
type Cycle = Chain;
type MaybeChain = Chain | undefined;
type MaybeCyle = Cycle | undefined;

/* Public API: */

export function create(name: string, list: DomainRange[] = []): Dictionary {
  return {
    id: uuid(),
    name,
    list: [...list]
  };
}

// Will add provided the domain doesn't already exist
export function add(domain: Domain, range: Range, dictionary: Dictionary): Dictionary {
  // return !hasDomain(domain, dictionary) ? addEntry(domain, range, dictionary) : dictionary;

  // We'll allow to enter a duplicated domain, since the validation will
  // happen somewhere else
  return addEntry(domain, range, dictionary);
}

// Will update provided the domain already exists
export function update(domain: Domain, range: Range, dictionary: Dictionary): Dictionary {
return hasDomain(domain, dictionary) ? updateEntry(domain, range, dictionary) : dictionary;
}

export function remove(domain: Domain, dictionary: Dictionary): Dictionary {
  return hasDomain(domain, dictionary) ? deleteEntry(domain, dictionary) : dictionary;
}

export function size(dictiomary: Dictionary): number {
  return dictiomary.list.length;
}

export function findFromDomain(domain: Domain, dictionary: Dictionary): [DomainRange, number] {
  const domainRangeIdx = dictionary.list.findIndex(entry => entry.domain === domain);
  return [dictionary.list[domainRangeIdx], domainRangeIdx];
}

export function findFromRange(range: Range, dictionary: Dictionary): [DomainRange, number] {
  const domainRangeIdx = dictionary.list.findIndex(entry => entry.range === range);
  return [dictionary.list[domainRangeIdx], domainRangeIdx];
}

export function getRange(domain: Domain, dictionary: Dictionary): Range {
  const [domainRange, idx] = findFromDomain(domain, dictionary);
  return domainRange ? domainRange.range : void 0;
}

/**
 * Duplicate Domains/Ranges: 
 * 
 * Two rows in the dictionary map to the same value, simply 
 * resulting in duplicate content.
 *
 * Example:
 *   domain1 -> range1
 *   domain1 -> range1
 */
export function hasDuplicateDomainRange(dictionary: Dictionary): boolean {
  return !!dictionary.list.find((entry, idx) => {
    return isEntryDuplicateDomainRange(entry, idx, dictionary);
  });
}

export function isEntryDuplicateDomainRange(entry: DomainRange, idx: number, dictionary: Dictionary): boolean {
  return !!dictionary.list.find((entry2, idx2) => {
    return idx2 !== idx && 
      entry2.domain === entry.domain && 
      entry2.range === entry.range;
  });
}

/**
 * Duplicate Domains with different Ranges: 
 * 
 * Two rows in the dictionary map to different values, resulting 
 * in an ambiguous transformation.
 *
 * Example:
 *   domain1 -> range1
 *   domain1 -> range2
 */
export function hasDuplicateDomain(dictionary: Dictionary): boolean {
  return !!dictionary.list.find((entry, idx) => {
    return isEntryDuplicateDomain(entry, idx, dictionary);
  });
}

export function isEntryDuplicateDomain(entry: DomainRange, idx: number, dictionary: Dictionary): boolean {
  return !!dictionary.list.find((entry2, idx2) => {
    return idx2 !== idx && entry2.domain === entry.domain;
  });
}

/**
 * Chains
 *
 * A chain structure in the dictionary (a value in Range column 
 * also appears in Domain column of another entry), resulting in 
 * inconsistent transformation.
 *
 * Example:
 *   domain1 -> range1
 *   range1 -> range2
 */
export function hasChains(dictionary: Dictionary): boolean {
  return !!dictionary.list.find((entry, idx) => {
    return isEntryPartOfChain(entry, idx, dictionary);
  });
}

export function isEntryPartOfChain(entry: DomainRange, idx: number, dictionary: Dictionary): boolean {
  let [chainEnd, idx2] = findFromDomain(<Domain>entry.range, dictionary);
  let [chainStart, idx3] = findFromRange(<Range>entry.domain, dictionary);

  return (!!chainEnd && idx2 !== idx) || 
    (!!chainStart && idx3 !== idx);
}

/**
 * Cycles: 
 *
 * Two or more rows in a dictionary result in cycles, resulting 
 * in a never-ending transformation.
 *
 * Example:
 *   domain1 -> range1
 *   range1 -> domain1
 *
 * It doesn't check long cycles (TODO):
 *   domain1 -> range1
 *   range1 -> domain2
 *   domain2 -> range2
 *   range2 -> domain1
 */
export function hasCycles(dictionary: Dictionary): boolean {
  return !!dictionary.list.find((entry, idx) => {
    return isEntryPartOfCycle(entry, idx, dictionary);
  });
}

export function isEntryPartOfCycle(entry: DomainRange, idx: number, dictionary: Dictionary): boolean {
  let [chainEnd, idx2] = findFromDomain(<Domain>entry.range, dictionary);

  return !!chainEnd && idx2 !== idx && entry.domain === chainEnd.range && entry.range === chainEnd.domain;
}

/* Private functions: */

const uuid = () => new Date().getTime();

function addEntry(domain: Domain, range: Range, dictionary: Dictionary): Dictionary {
  const list = [...dictionary.list];

  list.push({ domain, range, id: uuid() });

  return Object.assign({}, dictionary, { list });
}

function updateEntry(domain: Domain, range: Range, dictionary: Dictionary): Dictionary {
  const list = [...dictionary.list];
  const [domainRange, idx] = findFromDomain(domain, dictionary);

  list[idx].range = range;

  return Object.assign({}, dictionary, { list });
}

function deleteEntry(domain: Domain, dictionary: Dictionary): Dictionary {
  const list = [...dictionary.list];
  const [domainRange, idx] = findFromDomain(domain, dictionary);

  list.splice(idx, 1);

  return Object.assign({}, dictionary, { list });
}

function hasDomain(domain: Domain, dictionary: Dictionary): boolean {
  const [domainRange, ] = findFromDomain(domain, dictionary);
  return !!domainRange;
}