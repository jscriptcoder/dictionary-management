import { Map } from 'immutable';

export type Domain = string;
export type Range = string;
export interface Dictionary extends Map<Domain, Range> {}

export function create(): Dictionary {
  return Map<string, string>();
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

/**
 * Cycles: 
 *
 * Two or more rows in a dictionary result in cycles, resulting 
 * in a never-ending transformation.
 */
export function hasCicles(dictionary: Dictionary): boolean {
  return false;  
}

/**
 * Chains: 
 *
 * A chain structure in the dictionary (a value in Range column 
 * also appears in Domain column of another entry), resulting in 
 * inconsistent transformation.
 */
export function hasChains(dictionary: Dictionary): boolean {
  return false;
}

function hasDomain(domain: Domain, dictionary: Dictionary): boolean {
  return dictionary.has(domain);
}

function hasRange(range: Range, dictionary: Dictionary): boolean {
  return dictionary.contains(range);
}