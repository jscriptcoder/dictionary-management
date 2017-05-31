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

  xit('checks whether there are cycles in a dictionary', () => {});

  xit('checks whether there are chains in a dictionary', () => {});

});