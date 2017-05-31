import { Map } from 'immutable';



type Domain = string;
type Range = string;
export interface Dictionary extends Map<Domain, Range> {}



export function create(): Dictionary {
  return Map<string, string>();
}

export function add(domain: Domain, range: Range, dictionary: Dictionary): Dictionary {
  // TODO: checking consistency
  return dictionary.set(domain, range);
}

export function update(domain: Domain, range: Range, dictionary: Dictionary): Dictionary {
  // TODO: checking consistency
  return dictionary.set(domain, range);
}

export function remove(domain: Domain, dictionary: Dictionary): Dictionary {
  return dictionary.remove(domain);
}