import { Component, Input } from '@angular/core';
import { Dictionary, Domain, DomainRange } from '../../models/dictionary';

@Component({
  selector: 'detail-dictionary',
  templateUrl: './detail-dictionary.html',
  styleUrls: ['./detail-dictionary.scss'],
})
export class DetailDictionaryComponent {
  @Input()
  public dictionary: Dictionary;
}