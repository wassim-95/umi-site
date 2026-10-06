import { ElementRef } from '@angular/core';
import { RevealOnScrollDirective } from './reveal-on-scroll.directive';

describe('RevealOnScrollDirective', () => {
  it('should create an instance', () => {
    const element = new ElementRef(document.createElement('div'));
    const directive = new RevealOnScrollDirective(element);
    expect(directive).toBeTruthy();
  });
});
