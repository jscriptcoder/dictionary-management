import { Component, Input } from '@angular/core';
import { Dictionary } from '../../models/dictionary';


@Component({
  selector: 'nav-dictionaries',
  templateUrl: './nav-dictionaries.html',
  styleUrls: ['./nav-dictionaries.scss']
})
export class NavDictionariesComponent {
  @Input() dictionaries: Dictionary[];
}