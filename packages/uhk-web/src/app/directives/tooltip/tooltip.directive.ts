import { AfterContentInit, Directive, ElementRef, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
    selector: '[data-toggle="tooltip"]'
})
export class TooltipDirective implements AfterContentInit, OnChanges {

    @HostBinding('attr.data-placement') placement: string;
    @Input('title') title: string;
    @Input('html') html: boolean;
    @Input() maxWidth: number;

    constructor(private elementRef: ElementRef, private sanitizer: DomSanitizer) {
    }

    ngAfterContentInit() {
        this.init();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['title']) {
            this.fixTitle();
        }
    }

    private init() {
        (<any>jQuery(this.elementRef.nativeElement)).tooltip({
            placement: this.placement,
            html: this.html,
            template: this.getCustomTemplate(),
            title: this.title
        });
    }

    private fixTitle() {
        (<any>jQuery(this.elementRef.nativeElement)).tooltip({
            placement: this.placement,
            html: this.html,
            template: this.getCustomTemplate(),
            title: this.title
        });

        (<any>jQuery(this.elementRef.nativeElement)
            .attr('title', this.title))
            .tooltip('fixTitle');
    }

    private getCustomTemplate(): string {
        let style = '';

        if (this.maxWidth) {
            style = `style="max-width: ${this.maxWidth}px;"`;
        }

        return `<div class="tooltip">
            <div class="tooltip-arrow"></div>
            <div class="tooltip-inner" ${style}></div>
        </div>`;
    }
}
