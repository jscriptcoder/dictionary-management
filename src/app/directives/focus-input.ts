import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({ selector: '[focus-input]' })
export class FocusInput implements AfterViewInit {
    private firstTime: boolean = true;
    public input: ElementRef;

    constructor(input: ElementRef) {
        this.input = input;
    }

    ngAfterViewInit() {
        if (this.firstTime) {
            this.input.nativeElement.focus();
            this.firstTime = false;
        }
    }
}