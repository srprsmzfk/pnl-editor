import { TextInterface } from '../interfaces/text.interface';
import { FontEnum } from '../enums/font.enum';
import { ColorEnum } from '../enums/color.enum';
import { Card3KeyEnum } from '../enums/card3-key.enum';

export const CARD3_CONFIG: Record<string, TextInterface> = {
  [Card3KeyEnum.Sell]: {
    x: 120,
    y: 213,
    font: FontEnum.Plex,
    color: ColorEnum.Green,
    size: '30px',
    weight: 400
  },
  [Card3KeyEnum.Factor]: {
    x: 312,
    y: 213,
    font: FontEnum.Plex,
    size: '35px',
    color: ColorEnum.White,
    weight: 400
  },
  [Card3KeyEnum.Coin]: {
    x: 430,
    y: 213,
    font: FontEnum.Plex,
    size: '35px',
    color: ColorEnum.White,
    weight: 400
  },
  [Card3KeyEnum.Value]: {
    x: 115,
    y: 315,
    font: FontEnum.PlexCondensed,
    size: '95px',
    color: ColorEnum.Green,
    weight: 400
  },
  [Card3KeyEnum.EntryPrice]: {
    x: 390,
    y: 366,
    font: FontEnum.Plex,
    size: '30px',
    color: ColorEnum.Yellow,
    weight: 400
  },
  [Card3KeyEnum.LastPrice]: {
    x: 390,
    y: 400,
    font: FontEnum.Plex,
    size: '30px',
    color: ColorEnum.Yellow,
    weight: 400
  },
  [Card3KeyEnum.Referral]: {
    x: 240,
    y: 522,
    font: FontEnum.Plex,
    size: '40px',
    color: ColorEnum.White,
    weight: 500
  },
  [Card3KeyEnum.Qr]: {
    x: 118,
    y: 459,
  },
}
