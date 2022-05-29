import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-referral-card',
  templateUrl: './referral-card.component.html',
  styleUrls: ['./referral-card.component.scss']
})
export class ReferralCardComponent implements OnInit {
  @ViewChild('card') card: HTMLDivElement;
  @ViewChild('canvas') canvasRef: ElementRef;

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;

  constructor() { }

  ngOnInit(): void {
    // this.canvas = document.createElement('canvas');

  }

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas.getContext('2d');
    this.setImg();
  }

  initCanvas() {

  }
  private setImg(): void {
    let img = new Image();
    img.src = `assets/img/card2Background1.png`;
    img.onload = () => {
      this.canvas.width = img.width;
      this.canvas.height = img.height;
      this.context.drawImage(img, 0, 0);
    }

  }
}
