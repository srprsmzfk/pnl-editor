import { Injectable } from '@angular/core';
import { CanvasService } from './canvas.service';
import { TextInterface } from '../interfaces/text.interface';
import { Card7KeyEnum } from '../enums/card7-key.enum';
import { ColorEnum } from '../enums/color.enum';

@Injectable({
  providedIn: 'root'
})
export class OpenTradesTplsCanvasService extends CanvasService {
  drawTpSlLine(value: string, config: Record<string, TextInterface>, img: CanvasImageSource) {
    this.drawText(value, config[Card7KeyEnum.TpSl]);
    let x = config[Card7KeyEnum.TpSl].x + this.measureText(value);
    this.drawImage(img, x + 26, config[Card7KeyEnum.TpSl].y - 35, 40, 40);
  }

  drawOpenTradesHeader(
    sell: string,
    sellBoxColor: ColorEnum,
    coin: string,
    type: string,
    factor: string,
    risk: number,
    config: Record<string, TextInterface>,
  ) {
    this.drawRect(
      config[Card7KeyEnum.SellBox].x,
      config[Card7KeyEnum.SellBox].y,
      48,
      48,
      sellBoxColor);
    this.drawText(sell, config[Card7KeyEnum.Sell]);
    let caret = {
      x: config[Card7KeyEnum.Coin].x,
      y: config[Card7KeyEnum.Coin].y
    }
    let space = 30;

    this.drawText(coin, config[Card7KeyEnum.Coin]);
    caret.x += this.measureText(coin) + space;
    this.drawText(type, {...config[Card7KeyEnum.Type], x: caret.x});
    caret.x += this.measureText(type) + 10;
    this.drawText(factor, {...config[Card7KeyEnum.Factor], x: caret.x});
    caret.x += this.measureText(factor) + space;
    this.drawRisk(caret.x, config[Card7KeyEnum.RiskBox].y, risk);
  }
}
