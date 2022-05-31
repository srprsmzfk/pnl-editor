import { Injectable } from '@angular/core';
import { TextInterface } from '../interfaces/text.interface';
import { SellEnum } from '../enums/sell.enum';
import { CARD2_CONFIG } from '../constants/card2.config';
import { Card2KeyEnum } from '../enums/card2-key.enum';
import { ColorEnum } from '../enums/color.enum';

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

  drawLine(sell: SellEnum, factor: string, coin: string ): void {
    let caret = {
      x: CARD2_CONFIG[Card2KeyEnum.Sell].x,
      y: CARD2_CONFIG[Card2KeyEnum.Sell].y
    }
    let space = 30;

    this.drawText(sell, {...CARD2_CONFIG[Card2KeyEnum.Sell], color: sell === SellEnum.Short ? ColorEnum.Red : ColorEnum.Green});
    caret.x += this.measureText(sell) + space;
    this.drawRect(caret.x, caret.y - 28, 2, 32, ColorEnum.LightGrey);
    caret.x += space + 2;
    this.drawText(factor, {...CARD2_CONFIG[Card2KeyEnum.Factor], x: caret.x});
    caret.x += this.measureText(factor) + space;
    this.drawRect(caret.x, caret.y - 28, 1, 32, ColorEnum.LightGrey);
    caret.x += space + 1;
    this.drawText(coin, {...CARD2_CONFIG[Card2KeyEnum.Coin], x: caret.x});
  }

  private measureText(text): number {
    return this.context.measureText(text).width;
  }

  private drawRect(x: number, y: number, w: number, h: number, color: ColorEnum): void {
    this.context.fillStyle = color
    this.context.fillRect(x, y, w, h);
  }


}
