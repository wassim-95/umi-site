import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="bg-white border border-gray-200 transition transform
             hover:shadow-lg hover:shadow-umiRed/10 h-full"
      [ngClass]="{
        'rounded-2xl p-4 space-y-2': variant === 'default',
        'rounded-3xl p-6 space-y-3': variant === 'large',
        'hover:-translate-y-1': hover,
        'text-center': centered
      }"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class CardComponent {
  @Input() variant: 'default' | 'large' = 'default';
  @Input() hover = true;
  @Input() centered = false;
}
