import * as Dictionary from './dictionary';

describe('Dictionary', () => {

  let dictionary: Dictionary.Dictionary;

  beforeEach(() => dictionary = Dictionary.create({
    'Domain 1': 'Range 1',
    'Domain 2': 'Range 2',
    'Domain 3': 'Range 3'
  }));

  it('adds domain/range to the dictionary', () => {
    const dictionary2 = Dictionary.add('Domain 4', 'Range 4', dictionary);
    expect(dictionary2).not.toBe(dictionary);
    expect(dictionary2.size).toBe(4);
    expect(dictionary2.get('Domain 4')).toBe('Range 4');

    // Adding a domain that already exists
    const dictionary3 = Dictionary.add('Domain 3', 'New Range 3', dictionary2);
    expect(dictionary3).toBe(dictionary2);
    expect(dictionary3.size).toBe(4);
  });

  it('updates the range of an existing domain', () => {
    const dictionary2 = Dictionary.update('Domain 2', 'Range 2 Updated', dictionary);
    expect(dictionary2).not.toBe(dictionary);
    expect(dictionary2.size).toBe(3);
    expect(dictionary2.get('Domain 2')).toBe('Range 2 Updated');

    // Updating a domain that doesn't exist
    const dictionary3 = Dictionary.update('Domain 4', 'Range 4', dictionary2);
    expect(dictionary3).toBe(dictionary2);
    expect(dictionary2.size).toBe(3);
  });

  it('removes domain/range from a dictionary', () => {
    const dictionary2 = Dictionary.remove('Domain 3', dictionary);
    expect(dictionary2).not.toBe(dictionary);
    expect(dictionary2.size).toBe(2);
    expect(dictionary2.get('Domain 3')).toBeUndefined();

    // Removing a domain that doesn't exist
    const dictionary3 = Dictionary.remove('Domain 4', dictionary2);
    expect(dictionary3).toBe(dictionary2);
    expect(dictionary3.size).toBe(2);
  });

  it('checks whether there are chains in a dictionary', () => {
    // Let's create a chain (a range appears in domains)
    const dictionary2 = Dictionary.add('Range 2', 'New Range 2', dictionary);
    expect(dictionary2.size).toBe(4);
    expect(Dictionary.hasChains(dictionary2)).toBeTruthy();

    // Let's create a "false" chain (a range appears in domains but it's the same entry)
    const dictionary3 = Dictionary.add('Domain 4', 'Domain 4', dictionary);
    expect(dictionary2.size).toBe(4);
    expect(Dictionary.hasChains(dictionary3)).toBeFalsy();
  });

  it('checks whether there are cycles in a dictionary', () => {
    // Let's create a cycle
    const dictionary2 = Dictionary.add('Range 2', 'Domain 2', dictionary);
    expect(dictionary2.size).toBe(4);
    expect(Dictionary.hasChains(dictionary2)).toBeTruthy();
    expect(Dictionary.hasCycles(dictionary2)).toBeTruthy();
  });

});