import { Injectable } from '@angular/core';
import { CanvasService } from './canvas.service';
import { TextInterface } from '../interfaces/text.interface';
import { Card8KeyEnum } from '../enums/card8-key.enum';
import { ColorEnum } from '../enums/color.enum';

@Injectable({
  providedIn: 'root'
})
export class MexcOpenTradesCanvasService extends CanvasService {
  drawMexcOpenTradesLine(
    sell: string,
    sellBoxColor: ColorEnum,
    coin: string,
    perpetual: string,
    type: string,
    factor: string,
    config: Record<string, TextInterface>,
  ) {
    this.drawRect(
      config[Card8KeyEnum.SellBox].x,
      config[Card8KeyEnum.SellBox].y,
      48,
      48,
      sellBoxColor);
    this.drawText(sell, config[Card8KeyEnum.Sell]);
    let caret = {
      x: config[Card8KeyEnum.Coin].x,
      y: config[Card8KeyEnum.Coin].y
    }
    let space = 30;

    this.drawText(coin, config[Card8KeyEnum.Coin]);
    caret.x += this.measureText(coin);
    this.drawText(perpetual, {...config[Card8KeyEnum.Type], x: caret.x, color: ColorEnum.White});
    caret.x += this.measureText(perpetual) + space;
    this.drawText(`${type}.${factor}`, {...config[Card8KeyEnum.Type], x: caret.x});
  }
}
