import { Map } from 'immutable';

/* Types: */

export type Domain = string;
export type Range = string;
export interface ObjectMap { [domain: string]: string };
export interface Dictionary extends Map<Domain, Range> {}

type Chain = [[Domain, Range], [Domain, Range]];
type Cycle = Chain;
type MaybeChain = Chain | undefined;
type MaybeCyle = Cycle | undefined;

/* Public API: */

export function create(map?: ObjectMap): Dictionary {
  return Map<string, string>(map);
}

// Will add provided the domain doesn't already exist
export function add(domain: Domain, range: Range, dictionary: Dictionary): Dictionary {
  return !hasDomain(domain, dictionary) ? dictionary.set(domain, range) : dictionary;
}

// Will update provided the domain already exists
export function update(domain: Domain, range: Range, dictionary: Dictionary): Dictionary {
  return hasDomain(domain, dictionary) ? dictionary.set(domain, range) : dictionary;
}

export function remove(domain: Domain, dictionary: Dictionary): Dictionary {
  return dictionary.remove(domain);
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

function hasDomain(domain: Domain, dictionary: Dictionary): boolean {
  return dictionary.has(domain);
}

function hasRange(range: Range, dictionary: Dictionary): boolean {
  return dictionary.contains(range);
}

function findChain(dictionary: Dictionary): MaybeChain {
  const chainStart = <[Domain, Range]>dictionary.findEntry((range: Range, domain: Domain) => {
    return range !== domain && dictionary.has(<Domain>range);
  });

  if (chainStart) {
    const chainEnd = <[Domain, Range]>dictionary.findEntry((range: Range, domain: Domain) => {
      return domain === chainStart[1];
    });

    return [chainStart, chainEnd];
  }
}

// Will find short and long cycles
function findCyle(dictionary: Dictionary): MaybeCyle {
  // TODO
  return;
}