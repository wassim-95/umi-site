import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';

@Directive({
  selector: '[appCountUp]',
})
export class CountUpDirective implements AfterViewInit, OnDestroy {
  @Input('appCountUp') target = 0; // valeur finale
  @Input() duration = 1500;       // durée en ms

  private observer?: IntersectionObserver;
  private hasAnimated = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.startAnimation();
            this.hasAnimated = true;
            this.observer?.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    this.observer.observe(this.el.nativeElement);
  }

  private startAnimation() {
    const startTime = performance.now();
    const startValue = 0;
    const endValue = this.target;
    const duration = this.duration;
    const element = this.el.nativeElement;

    const step = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = this.easeOutCubic(progress);
      const current = Math.floor(startValue + (endValue - startValue) * eased);
      element.textContent = current.toString();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = endValue.toString();
      }
    };

    requestAnimationFrame(step);
  }

  private easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
