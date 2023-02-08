import { Injectable } from '@angular/core';
import { TextInterface } from '../interfaces/text.interface';
import { SellEnum } from '../enums/sell.enum';
import { CARD2_CONFIG } from '../constants/card2.config';
import { Card2KeyEnum } from '../enums/card2-key.enum';
import { ColorEnum } from '../enums/color.enum';
import { CARD3_CONFIG } from '../constants/card3.config';
import { Card3KeyEnum } from '../enums/card3-key.enum';
import { Card4KeyEnum } from '../enums/card4-key.enum';
import { CARD4_CONFIG } from '../constants/card4.config';
import { CARD4_CONFIG_BLACK } from '../constants/card4black.config';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  context: CanvasRenderingContext2D;

  private canvas: HTMLCanvasElement

  constructor() { }

  initContext(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
  }

  drawText(text: string, config: TextInterface): void {
    config = {...config};
    if (config.font) {
      this.context.font = `${config.weight} ${config.size} ${config.font}`;
    }
    if (config.color) {
      this.context.fillStyle = config.color;
    }
    if (config.x < 0) {
      config.x = this.canvas.width + config.x - this.measureText(text);
    }
    if (config.y < 0) {
      config.y = this.canvas.height + config.y - this.measureText(text);
    }
    this.context.fillText(text, config.x, config.y);
  }

  drawNumber(number: string, config: TextInterface): void {
    config = {...config};
    config.color = +(number
      .replace(',', '.')
      .replace('%', '')
      // .replace('+', '')
      .trim()) >= 0 ?
      ColorEnum.Green : ColorEnum.Red
    this.drawText(number, config);
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

  drawLineEn(sell: SellEnum, factor: string, coin: string ): void {
    let caret = {
      x: CARD3_CONFIG[Card3KeyEnum.Sell].x,
      y: CARD3_CONFIG[Card3KeyEnum.Sell].y
    }
    let space = 30;

    this.drawText(sell, {...CARD3_CONFIG[Card3KeyEnum.Sell], color: sell === SellEnum.ShortEn ? ColorEnum.Red : ColorEnum.Green});
    caret.x += this.measureText(sell) + space;
    this.drawRect(caret.x, caret.y - 28, 2, 32, ColorEnum.LightGrey);
    caret.x += space + 2;
    this.drawText(factor, {...CARD3_CONFIG[Card3KeyEnum.Factor], x: caret.x});
    caret.x += this.measureText(factor) + space;
    this.drawRect(caret.x, caret.y - 28, 1, 32, ColorEnum.LightGrey);
    caret.x += space + 1;
    this.drawText(coin, {...CARD3_CONFIG[Card3KeyEnum.Coin], x: caret.x});
  }

  drawOpenTradesLine(sell: SellEnum, coin: string, type: string, factor: string, risk: number, isDefaultColor: boolean = true) {
    let config = isDefaultColor ? CARD4_CONFIG : CARD4_CONFIG_BLACK;

    this.drawRect(
      config[Card4KeyEnum.SellBox].x,
      config[Card4KeyEnum.SellBox].y,
      42,
      42,
      sell === SellEnum.Short ? ColorEnum.Red : ColorEnum.Green);
    this.drawText(sell === SellEnum.Short ? 'П' : 'K', config[Card4KeyEnum.Sell]);
    let caret = {
      x: config[Card4KeyEnum.Coin].x,
      y: config[Card3KeyEnum.Coin].y
    }
    let space = 30;

    this.drawText(coin, config[Card4KeyEnum.Coin]);
    caret.x += this.measureText(coin) + space;
    this.drawText(type, {...config[Card4KeyEnum.Type], x: caret.x});
    caret.x += this.measureText(type) + 10;
    this.drawText(factor, {...config[Card4KeyEnum.Factor], x: caret.x});
    caret.x += this.measureText(factor) + space;
    this.drawRisk(caret.x, config[Card4KeyEnum.RiskBox].y, risk);
  }

  private measureText(text): number {
    return this.context.measureText(text).width;
  }

  private drawRect(x: number, y: number, w: number, h: number, color: ColorEnum | string): void {
    console.log(x, y);
    this.context.fillStyle = color
    this.context.fillRect(x, y, w, h);
  }

  private drawRisk(x: number, y: number, risk: number) {
    const color = risk < 0 ? ColorEnum.Red : ColorEnum.Green;
    risk = Math.abs(risk);
    for (let i = 1; i < 5; i++) {
      let fillColor = i <= risk ? color : ColorEnum.LightGreyOpenTrades;
      this.drawRect(x, y, 5, 28, fillColor);
      this.drawRect(x, y + 36, 5, 3, fillColor);
      x += 10;
    }
  }
}
