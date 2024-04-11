import { Injectable } from '@angular/core';
import { CanvasService } from './canvas.service';
import { TextInterface } from '../interfaces/text.interface';
import { ColorEnum } from '../enums/color.enum';
import { SellEnum } from '../enums/sell.enum';
import { Card9KeyEnum } from '../enums/card9-key.enum';

const sellConfig = {
  [SellEnum.Short]: ColorEnum.Red,
  [SellEnum.Long]: ColorEnum.Green,
  [SellEnum.ShortEn]: ColorEnum.Red,
  [SellEnum.LongEn]: ColorEnum.Green,
}

@Injectable({
  providedIn: 'root'
})
export class MexcReferralCanvasService extends CanvasService {
  drawSellLine(sell: SellEnum, factor: string, config: Record<string, TextInterface>) {
    this.drawText(sell, {...config[Card9KeyEnum.Sell], color: sellConfig[sell]});
    let caret = {
      x: config[Card9KeyEnum.Sell].x,
      y: config[Card9KeyEnum.Sell].y
    };
    caret.x += this.measureText(sell);
    this.drawText(`/${factor}X`, {...config[Card9KeyEnum.Factor], x: caret.x});
  }
}
