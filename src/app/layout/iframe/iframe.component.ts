import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
})
export class IframeComponent implements AfterViewInit {
  safeUrl: SafeResourceUrl = '';
  @Input() set src(url: string) {
    this.safeUrl = this.santi.bypassSecurityTrustResourceUrl(url);
  }

  @ViewChild('frame') frameElement!: ElementRef;
  containerMinWidth: number = 0;
  containerMinHeight: number = 0;
  containerWidth: number = this.containerMinWidth;
  containerHeight: number = this.containerMinHeight;
  constructor(private santi: DomSanitizer) {}

  ngAfterViewInit(): void {
    this.onResize(window.innerWidth, window.innerHeight);
  }

  @HostListener('window:resize', [
    '$event.target.innerWidth',
    '$event.target.innerHeight',
  ])
  onResize(width: number, height: number): void {
    if (this.frameElement == null) return;

    let top = this.frameElement.nativeElement.offsetTop;
    let left = this.frameElement.nativeElement.offsetLeft;
    setTimeout(() => {
      this.containerWidth = Math.max(width - left, this.containerMinWidth);
      this.containerHeight = Math.max(height - top, this.containerMinHeight);
    }, 1);
  }
}
