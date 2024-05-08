import { Injectable } from '@angular/core';
import { CanvasService } from './canvas.service';
import { TextInterface } from '../interfaces/text.interface';
import { Card7KeyEnum } from '../enums/card7-key.enum';
import { ColorEnum } from '../enums/color.enum';
import { CardLanguage } from '../enums/card-language.enum';
import { TradeType } from '../enums/trade-type.enum';
import { CardColor } from '../enums/card-color.enum';
import { SellEnum } from '../enums/sell.enum';

const dict = {
  [CardLanguage.Ru]: {
    [TradeType.Cross]: 'Кросс',
    [TradeType.Isolated]: 'Изолированная',
    [SellEnum.Short]: 'П',
    [SellEnum.Long]: 'К',
    perp: 'Бессрочный'
  },
  [CardLanguage.En]: {
    [TradeType.Cross]: 'Cross',
    [TradeType.Isolated]: 'Isolated',
    [SellEnum.Short]: 'S',
    [SellEnum.Long]: 'B',
    perp: 'Perp',
  }
}

@Injectable({
  providedIn: 'root'
})
export class OpenTradesTplsCanvasService extends CanvasService {
  drawTpSlLine(value: string, config: Record<string, TextInterface>, img: CanvasImageSource) {
    this.drawText(value, config[Card7KeyEnum.TpSl]);
    let x = config[Card7KeyEnum.TpSl].x + this.measureText(value);
    this.drawImage(img, x + 15, config[Card7KeyEnum.TpSl].y - 31, 35, 35);
  }

  drawBoxedText(text: any, config: TextInterface, color: any, x: number, y: number): number {
    let boxColor = color === CardColor.White ? '#f5f5f5' : '#29303d';
    if (config.font) {
      this.context.font = `${config.weight} ${config.size} ${config.font}`;
    }
    const boxWidth = this.measureText(text) + 30;
    this.drawRoundedRect(this.context, x, 60, boxWidth, 40, 5, boxColor);
    this.drawText(text, {...config, x: x + 15})
    return boxWidth;
  }

  drawRoundedRect(ctx, x, y, width, height, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    ctx.fill();
  }

  drawOpenTradesHeader(
    sell: string,
    sellBoxColor: ColorEnum,
    coin: string,
    type: string,
    factor: string,
    risk: number,
    cardColor: CardColor,
    lang: CardLanguage,
    config: Record<string, TextInterface>,
  ) {
    this.drawRoundedRect(
      this.context,
      config[Card7KeyEnum.SellBox].x,
      config[Card7KeyEnum.SellBox].y,
      50,
      50,
      5,
      sellBoxColor);
    this.drawText(dict[lang][sell], config[Card7KeyEnum.Sell]);
    let caret = {
      x: config[Card7KeyEnum.Coin].x,
      y: config[Card7KeyEnum.Coin].y
    }
    let space = 6;

    this.drawText(coin, config[Card7KeyEnum.Coin]);
    caret.x += this.measureText(coin) + space;
    caret.x += 5 + this.drawBoxedText(dict[lang].perp, {...config[Card7KeyEnum.Type], x: caret.x}, cardColor, caret.x, caret.y)
    caret.x += 5 + this.drawBoxedText(`${dict[lang][type]} ${factor}`, {...config[Card7KeyEnum.Type], x: caret.x}, cardColor, caret.x, caret.y)
    this.drawRisk(caret.x, config[Card7KeyEnum.RiskBox].y, risk);
  }
}
