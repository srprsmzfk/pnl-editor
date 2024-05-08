import { TextInterface } from '../interfaces/text.interface';
import { FontEnum } from '../enums/font.enum';
import { ColorEnum } from '../enums/color.enum';
import { Card7KeyEnum } from '../enums/card7-key.enum';

export const CARD7_CONFIG_BLACK: Record<string, TextInterface> = {
  [Card7KeyEnum.SellBox]: {
    x: 44,
    y: 58,
  },
  [Card7KeyEnum.Sell]: {
    x: 58,
    y: 95,
    font: FontEnum.Plex,
    color: ColorEnum.White,
    size: '32px',
    weight: 400
  },
  [Card7KeyEnum.Coin]: {
    x: 112,
    y: 101,
    font: FontEnum.PlexCondensed,
    size: '50px',
    color: ColorEnum.White,
    weight: 500
  },
  [Card7KeyEnum.Type]: {
    x: 430,
    y: 90,
    font: FontEnum.Plex,
    size: '26px',
    color: ColorEnum.White,
    weight: 400
  },
  [Card7KeyEnum.Factor]: {
    x: 115,
    y: 90,
    font: FontEnum.Plex,
    size: '26px',
    color: ColorEnum.White,
    weight: 400
  },
  [Card7KeyEnum.RiskBox]: {
    x: 795,
    y: 63,
  },
  [Card7KeyEnum.Pnl]: {
    x: 42,
    y: 259,
    font: FontEnum.PlexCondensed,
    size: '55px',
    color: ColorEnum.Green,
    weight: 400
  },
  [Card7KeyEnum.Roe]: {
    x: -42,
    y: 259,
    font: FontEnum.PlexCondensed,
    size: '55px',
    color: ColorEnum.Green,
    weight: 400
  },
  [Card7KeyEnum.Size]: {
    x: 42,
    y: 385,
    font: FontEnum.Plex,
    size: '37px',
    color: ColorEnum.White,
    weight: 400
  },
  [Card7KeyEnum.Margin]: {
    x: 451,
    y: 385,
    font: FontEnum.Plex,
    size: '37px',
    color: ColorEnum.White,
    weight: 400
  },
  [Card7KeyEnum.Risk]: {
    x: -42,
    y: 385,
    font: FontEnum.Plex,
    size: '37px',
    weight: 400
  },
  [Card7KeyEnum.EntryPrice]: {
    x: 42,
    y: 519,
    font: FontEnum.Plex,
    size: '37px',
    color: ColorEnum.White,
    weight: 400
  },
  [Card7KeyEnum.LastPrice]: {
    x: 451,
    y: 519,
    font: FontEnum.Plex,
    size: '37px',
    color: ColorEnum.White,
    weight: 400
  },
  [Card7KeyEnum.LiquidPrice]: {
    x: -42,
    y: 519,
    font: FontEnum.Plex,
    color: ColorEnum.White,
    size: '37px',
    weight: 400
  },
  [Card7KeyEnum.TpSl]: {
    x: 170,
    y: 597,
    font: FontEnum.Plex,
    size: '37px',
    color: ColorEnum.White,
    weight: 400
  },
}
