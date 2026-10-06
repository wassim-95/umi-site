import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTilt]',
})
export class TiltDirective {
  @Input() maxTilt = 8; // en degrés

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.15s ease-out');
    this.renderer.setStyle(this.el.nativeElement, 'transformStyle', 'preserve-3d');
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const card = this.el.nativeElement;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left; // position souris dans la card
    const y = event.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateY = ((x - midX) / midX) * this.maxTilt;
    const rotateX = ((midY - y) / midY) * this.maxTilt;

    const transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    this.renderer.setStyle(card, 'transform', transform);
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  resetTilt() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'rotateX(0deg) rotateY(0deg)');
  }
}
