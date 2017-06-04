import * as Dictionary from './dictionary';

describe('Dictionary', () => {

  let dictionary: Dictionary.Dictionary;

  beforeEach(() => dictionary = Dictionary.create('Test Dictionary', [
    { domain: 'Domain 1', range: 'Range 1' },
    { domain: 'Domain 2', range: 'Range 2' },
    { domain: 'Domain 3', range: 'Range 3' }
  ]));

  it('returns the right size', () => {
    expect(Dictionary.size(dictionary)).toBe(3);

  });

  it('adds domain/range to the dictionary', () => {
    const dictionary2 = Dictionary.add('Domain 4', 'Range 4', dictionary);
    expect(dictionary2).not.toBe(dictionary);
    expect(Dictionary.size(dictionary2)).toBe(4);
    expect(Dictionary.getRange('Domain 4', dictionary2)).toBe('Range 4');
  });

  it('updates the range of an existing domain', () => {
    const dictionary2 = Dictionary.update('Domain 2', 'Range 2 Updated', dictionary);
    expect(dictionary2).not.toBe(dictionary);
    expect(Dictionary.size(dictionary2)).toBe(3);
    expect(Dictionary.getRange('Domain 2', dictionary2)).toBe('Range 2 Updated');

    // Updating a domain that doesn't exist
    const dictionary3 = Dictionary.update('Domain 4', 'Range 4', dictionary2);
    expect(dictionary3).toBe(dictionary2);
    expect(Dictionary.size(dictionary3)).toBe(3);
  });

  it('removes domain/range from a dictionary', () => {
    const dictionary2 = Dictionary.remove('Domain 3', dictionary);
    expect(dictionary2).not.toBe(dictionary);
    expect(Dictionary.size(dictionary2)).toBe(2);
    expect(Dictionary.getRange('Domain 3', dictionary2)).toBeUndefined();

    // Removing a domain that doesn't exist
    const dictionary3 = Dictionary.remove('Domain 4', dictionary2);
    expect(dictionary3).toBe(dictionary2);
    expect(Dictionary.size(dictionary3)).toBe(2);
  });

  it('finds an entry passing the domain', () => {
    const [domainRange, idx] = Dictionary.findFromDomain('Domain 2', dictionary);
    expect(idx).toBe(1);
    expect(domainRange.domain).toBe('Domain 2');
    expect(domainRange.range).toBe('Range 2');
  });

  it('checks wether there are duplicate domains', () => {
    expect(Dictionary.hasDuplicateDomain(dictionary)).toBeFalsy();

    const dictionary2 = Dictionary.add('Domain 2', 'Range X', dictionary);
    expect(Dictionary.hasDuplicateDomain(dictionary2)).toBeTruthy();
  });

  it('checks wether there are duplicate domain/range', () => {
    expect(Dictionary.hasDuplicateDomainRange(dictionary)).toBeFalsy();

    const dictionary2 = Dictionary.add('Domain 2', 'Range X', dictionary);
    expect(Dictionary.hasDuplicateDomain(dictionary2)).toBeTruthy();
    expect(Dictionary.hasDuplicateDomainRange(dictionary2)).toBeFalsy();

    const dictionary3 = Dictionary.add('Domain 2', 'Range 2', dictionary);
    expect(Dictionary.hasDuplicateDomainRange(dictionary3)).toBeTruthy();
  });

  it('checks whether there are chains in a dictionary', () => {
    expect(Dictionary.hasChains(dictionary)).toBeFalsy();

    // Let's create a chain (a range appears in domains)
    const dictionary2 = Dictionary.add('Range 2', 'New Range 2', dictionary);
    expect(Dictionary.size(dictionary2)).toBe(4);
    expect(Dictionary.hasChains(dictionary2)).toBeTruthy();

    // Let's create a "false" chain (a range appears in domains but it's the same entry)
    const dictionary3 = Dictionary.add('Domain 4', 'Domain 4', dictionary);
    expect(Dictionary.size(dictionary2)).toBe(4);
    expect(Dictionary.hasChains(dictionary3)).toBeFalsy();
  });

  it('checks whether there are cycles in a dictionary', () => {
    expect(Dictionary.hasCycles(dictionary)).toBeFalsy();
    
    // Let's create a cycle
    const dictionary2 = Dictionary.add('Range 2', 'Domain 2', dictionary);
    expect(Dictionary.size(dictionary2)).toBe(4);
    expect(Dictionary.hasChains(dictionary2)).toBeTruthy();
    expect(Dictionary.hasCycles(dictionary2)).toBeTruthy();
  });

});