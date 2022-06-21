import { TextInterface } from '../interfaces/text.interface';
import { FontEnum } from '../enums/font.enum';
import { ColorEnum } from '../enums/color.enum';
import { Card4KeyEnum } from '../enums/card4-key.enum';

export const CARD4_CONFIG: Record<string, TextInterface> = {
  [Card4KeyEnum.SellBox]: {
    x: 37,
    y: 21,
  },
  [Card4KeyEnum.Sell]: {
    x: 48,
    y: 54,
    font: FontEnum.Plex,
    color: ColorEnum.White,
    size: '30px',
    weight: 400
  },
  [Card4KeyEnum.Coin]: {
    x: 108,
    y: 57,
    font: FontEnum.Plex,
    size: '40px',
    color: ColorEnum.Black,
    weight: 700
  },
  [Card4KeyEnum.Type]: {
    x: 430,
    y: 54,
    font: FontEnum.Plex,
    size: '30px',
    color: ColorEnum.LightGreyOpenTrades,
    weight: 400
  },
  [Card4KeyEnum.Factor]: {
    x: 115,
    y: 54,
    font: FontEnum.Plex,
    size: '30px',
    color: ColorEnum.LightGreyOpenTrades,
    weight: 400
  },
  [Card4KeyEnum.Risk]: {
    x: 795,
    y: 21,
  },
}
