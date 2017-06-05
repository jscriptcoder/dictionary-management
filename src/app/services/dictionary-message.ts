import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Dictionary } from '../models/dictionary';

export enum DictionaryAction {
  ADD,
  UPDATE,
  DELETE
}

export interface DictionaryActionMessage {
  action: DictionaryAction;
  dictionary: Dictionary;
}

/**
 * Simple Pub/Sub service for communication across components
 */

@Injectable()
export class DictionaryMessageService extends Subject<DictionaryActionMessage> {}