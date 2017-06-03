import { Map } from 'immutable';

/* Types: */

export type Domain = string;
export type Range = string;

export interface DomainRange {
  domain: Domain;
  range: Range;
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

export function getRange(domain: Domain, dictionary: Dictionary): Range {
  const [domainRange, idx] = findFromDomain(domain, dictionary);
  return domainRange ? domainRange.range : void 0;
}

/**
 * Duplicate Domains/Ranges and Domains with different Ranges 
 * 
 * Two rows in the dictionary map to different values, resulting in 
 * an ambiguous transformation.
 *
 * Example:
 *   domain1 -> range1
 *   domain1 -> range1/whatever
 */
export function hasDuplicateDomain(dictionary: Dictionary): boolean {
  return !!dictionary.list.find((entry, idx) => {
    return !!dictionary.list.find((entry2, idx2) => {
      return idx2 !== idx && entry2.domain === entry.domain;
    });
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
  return !!findChain(dictionary);
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
  const chain = findChain(dictionary);
  if (chain) {
    const [chainStart, chainEnd] = chain;
    return chainStart[0] === chainEnd[1] && chainStart[1] === chainEnd[0];
  } else {
    return false;
  }
}

/* Private functions: */

const uuid = () => new Date().getTime();

function addEntry(domain: Domain, range: Range, dictionary: Dictionary): Dictionary {
  const list = [...dictionary.list];

  list.push({ domain, range });

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

function findChain(dictionary: Dictionary): MaybeChain {
  let chainStart: DomainRange;
  let chainEnd: DomainRange;

  chainStart = dictionary.list.find((entry, idx) => {
    return !!dictionary.list.find((entry2, idx2) => {
      return idx2 !== idx && entry2.domain === entry.range;
    });
  });

  if (chainStart) {
    [chainEnd, ] = findFromDomain(<Domain>chainStart.range, dictionary);

    return [chainStart, chainEnd];
  }
}

// Will find short and long cycles
function findCyle(dictionary: Dictionary): MaybeCyle {
  // TODO
  return;
}