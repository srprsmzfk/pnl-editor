import { TextInterface } from '../interfaces/text.interface';
import { FontEnum } from '../enums/font.enum';
import { ColorEnum } from '../enums/color.enum';
import { Card9KeyEnum } from '../enums/card9-key.enum';

export const CARD9_CONFIG_EN: Record<string, TextInterface> = {
  [Card9KeyEnum.Sell]: {
    x: 70,
    y: 446,
    font: FontEnum.Plex,
    color: ColorEnum.White,
    size: '45px',
    weight: 400
  },
  [Card9KeyEnum.Coin]: {
    x: 70,
    y: 366,
    font: FontEnum.PlexCondensed,
    size: '45px',
    color: ColorEnum.White,
    weight: 500
  },
  [Card9KeyEnum.Factor]: {
    x: 70,
    y: 446,
    font: FontEnum.Plex,
    size: '45px',
    color: ColorEnum.White,
    weight: 400
  },
  [Card9KeyEnum.Pnl]: {
    x: 70,
    y: 600,
    font: FontEnum.PlexCondensed,
    size: '95px',
    color: ColorEnum.Green,
    weight: 500
  },
  [Card9KeyEnum.Pnl2]: {
    x: 70,
    y: 707,
    font: FontEnum.PlexCondensed,
    size: '45px',
    color: ColorEnum.Green,
    weight: 500,
  },
  [Card9KeyEnum.FairPrice]: {
    x: 320,
    y: 880,
    font: FontEnum.PlexCondensed,
    size: '40px',
    color: ColorEnum.White,
    weight: 500
  },
  [Card9KeyEnum.EntryPrice]: {
    x: 320,
    y: 942,
    font: FontEnum.PlexCondensed,
    color: ColorEnum.White,
    size: '40px',
    weight: 500
  },
  [Card9KeyEnum.Time]: {
    x: 320,
    y: 1006,
    font: FontEnum.Plex,
    color: ColorEnum.White,
    size: '40px',
    weight: 100
  },
  [Card9KeyEnum.Referral]: {
    x: 554,
    y: 1165,
    font: FontEnum.Plex,
    size: '45px',
    color: ColorEnum.White,
    weight: 500
  },
  [Card9KeyEnum.Qr]: {
    x: 45,
    y: 1101,
  }
}
