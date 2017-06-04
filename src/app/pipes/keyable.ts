import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transform a string into a key
 * Example:
 *   This is an example => this_is_an_example
 */

@Pipe({name: 'keyable'})
export class KeyablePipe implements PipeTransform {
  transform(value: string = ''): string {
    return value
      .toLowerCase()
      .replace(/\s/g, '_');
      // TODO: add more if needed
  }
}