import * as Dictionary from './dictionary';

describe('Dictionary', () => {

  let dictionary: Dictionary.Dictionary;

  beforeEach(() => dictionary = Dictionary.create({
    'Domain 1': 'Range 1',
    'Domain 2': 'Range 2',
    'Domain 3': 'Range 3'
  }));

  it('adds domain/range to the dictionary', () => {
    const dictionary2 = Dictionary.add('Stonegrey', 'Dark Grey', dictionary);
    expect(dictionary2).not.toBe(dictionary);
    expect(dictionary2.size).toBe(4);
    expect(dictionary2.get('Stonegrey')).toBe('Dark Grey');


    const dictionary3 = Dictionary.add('Midnight Black', 'Black', dictionary2);
    expect(dictionary3).not.toBe(dictionary2);
    expect(dictionary3.size).toBe(5);
    expect(dictionary3.get('Stonegrey')).toBe('Dark Grey');
    expect(dictionary3.get('Midnight Black')).toBe('Black');

    const dictionary4 = Dictionary.add('Mystic Silver', 'Silver', dictionary3);
    expect(dictionary4).not.toBe(dictionary3);
    expect(dictionary4.size).toBe(6);
    expect(dictionary4.get('Stonegrey')).toBe('Dark Grey');
    expect(dictionary4.get('Midnight Black')).toBe('Black');
    expect(dictionary4.get('Mystic Silver')).toBe('Silver');

    // Adding a domain that already exists
    const dictionary5 = Dictionary.add('Mystic Silver', 'Silver', dictionary4);
    expect(dictionary5).toBe(dictionary4);
    expect(dictionary4.size).toBe(6);
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
  });

  xit('checks whether there are cycles in a dictionary', () => {});

  xit('checks whether there are chains in a dictionary', () => {});

});