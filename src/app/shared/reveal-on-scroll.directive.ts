import { Directive, ElementRef, HostBinding, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appRevealOnScroll]'
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  @HostBinding('class.opacity-0') opacity0 = true;
  @HostBinding('class.translate-y-4') translateY = true;
  @HostBinding('class.transition') transition = true;
  @HostBinding('class.duration-700') duration = true;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.opacity0 = false;
          this.translateY = false;
          this.observer?.unobserve(this.el.nativeElement);
        }
      });
    }, {
      threshold: 0.2
    });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
