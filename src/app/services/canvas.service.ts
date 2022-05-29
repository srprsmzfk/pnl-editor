import { Injectable } from '@angular/core';
import { ColorEnum } from '../enums/color.enum';
import { TextInterface } from '../interfaces/text.interface';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  context: CanvasRenderingContext2D;

  constructor() { }

  initContext(ctx: CanvasRenderingContext2D): void {
    this.context = ctx;
  }

  drawText(text: string, config: TextInterface): void {
    if (config.font) {
      this.context.font = `${config.weight} ${config.size} ${config.font}`;
    }
    if (config.color) {
      this.context.fillStyle = config.color;
    }
    this.context.fillText(text, config.x, config.y);
  }

  drawImage(img: CanvasImageSource, x: number, y: number, scaleX?: number, scaleY?: number): void {
    if (scaleX && scaleY) {
      this.context.drawImage(img, x, y, scaleX, scaleY);
    } else {
      this.context.drawImage(img, x, y);
    }
  }
}
