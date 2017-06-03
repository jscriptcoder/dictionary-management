import { Map } from 'immutable';

/* Types: */

export type Domain = string;
export type Range = string;

export interface ObjectMap {
  [key: string]: string;
};

export interface Dictionary {
  id: number;
  name: string;
  map: ObjectMap;
}

type Chain = [[Domain, Range], [Domain, Range]];
type Cycle = Chain;
type MaybeChain = Chain | undefined;
type MaybeCyle = Cycle | undefined;

/* Public API: */

export function create(name: string, map: ObjectMap = {}): Dictionary {
  return {
    id: uuid(),
    name,
    map: Object.assign({}, map)
  };
}

// Will add provided the domain doesn't already exist
export function add(domain: Domain, range: Range, dictionary: Dictionary): Dictionary {
  return !hasDomain(domain, dictionary) ? setEntry(domain, range, dictionary) : dictionary;
}

// Will update provided the domain already exists
export function update(domain: Domain, range: Range, dictionary: Dictionary): Dictionary {
return hasDomain(domain, dictionary) ? setEntry(domain, range, dictionary) : dictionary;
}

export function remove(domain: Domain, dictionary: Dictionary): Dictionary {
  return hasDomain(domain, dictionary) ? deleteEntry(domain, dictionary) : dictionary;
}

export function size(dictiomary: Dictionary): number {
  return Object.keys(dictiomary.map).length;
}

export function get(domain: Domain, dictionary: Dictionary): Range {
  return dictionary.map[domain];
}

/**
 * Duplicate Domains/Ranges and Domains with different Ranges 
 * will never happen since the Map collection used for the 
 * implementation does simply not allow it.
 */

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
const cloneObj = (obj: ObjectMap): ObjectMap => Object.assign({}, obj);

function setEntry(domain: Domain, range: Range, dictionary: Dictionary): Dictionary {
  const map = cloneObj(dictionary.map);
  map[domain] = range;
  return Object.assign({}, dictionary, { map });
}

function deleteEntry(domain: Domain, dictionary: Dictionary): Dictionary {
  const map = cloneObj(dictionary.map);
  delete map[domain];
  return Object.assign({}, dictionary, { map });
}

function hasDomain(domain: Domain, dictionary: Dictionary): boolean {
  return Object.keys(dictionary.map).indexOf(domain) >= 0;
}

function findChain(dictionary: Dictionary): MaybeChain {
  const domains = <Domain[]>Object.keys(dictionary.map);

  let chainStart = <[Domain, Range]>[];
  let chainEnd = <[Domain, Range]>[];

  const domainChainStart = domains.find(domain => {
    const range = dictionary.map[domain];
    return range !== domain && domains.indexOf(range) >= 0;
  });

  if (domainChainStart) {
    chainStart = [domainChainStart, dictionary.map[domainChainStart]];
    chainEnd = [chainStart[1], dictionary.map[chainStart[1]]];

    return [chainStart, chainEnd];
  }
}

// Will find short and long cycles
function findCyle(dictionary: Dictionary): MaybeCyle {
  // TODO
  return;
}