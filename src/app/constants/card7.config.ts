import { TextInterface } from '../interfaces/text.interface';
import { FontEnum } from '../enums/font.enum';
import { ColorEnum } from '../enums/color.enum';
import { Card7KeyEnum } from '../enums/card7-key.enum';

export const CARD7_CONFIG: Record<string, TextInterface> = {
  [Card7KeyEnum.SellBox]: {
    x: 46,
    y: 54,
  },
  [Card7KeyEnum.Sell]: {
    x: 61,
    y: 90,
    font: FontEnum.Plex,
    color: ColorEnum.White,
    size: '30px',
    weight: 400
  },
  [Card7KeyEnum.Coin]: {
    x: 123,
    y: 96,
    font: FontEnum.PlexCondensed,
    size: '45px',
    color: ColorEnum.Black,
    weight: 500
  },
  [Card7KeyEnum.Type]: {
    x: 430,
    y: 96,
    font: FontEnum.Plex,
    size: '30px',
    color: ColorEnum.LightGreyOpenTrades,
    weight: 400
  },
  [Card7KeyEnum.Factor]: {
    x: 115,
    y: 96,
    font: FontEnum.Plex,
    size: '30px',
    color: ColorEnum.LightGreyOpenTrades,
    weight: 400
  },
  [Card7KeyEnum.RiskBox]: {
    x: 795,
    y: 63,
  },
  [Card7KeyEnum.Pnl]: {
    x: 42,
    y: 261,
    font: FontEnum.PlexCondensed,
    size: '55px',
    color: ColorEnum.Green,
    weight: 400
  },
  [Card7KeyEnum.Roe]: {
    x: -42,
    y: 261,
    font: FontEnum.PlexCondensed,
    size: '55px',
    color: ColorEnum.Green,
    weight: 400
  },
  [Card7KeyEnum.Size]: {
    x: 42,
    y: 400,
    font: FontEnum.Plex,
    size: '35px',
    color: ColorEnum.Black,
    weight: 400
  },
  [Card7KeyEnum.Margin]: {
    x: 445,
    y: 400,
    font: FontEnum.Plex,
    size: '35px',
    color: ColorEnum.Black,
    weight: 400
  },
  [Card7KeyEnum.Risk]: {
    x: -42,
    y: 400,
    font: FontEnum.Plex,
    size: '35px',
    weight: 400
  },
  [Card7KeyEnum.EntryPrice]: {
    x: 42,
    y: 537,
    font: FontEnum.Plex,
    size: '35px',
    color: ColorEnum.Black,
    weight: 400
  },
  [Card7KeyEnum.LastPrice]: {
    x: 444,
    y: 537,
    font: FontEnum.Plex,
    size: '35px',
    color: ColorEnum.Black,
    weight: 400
  },
  [Card7KeyEnum.LiquidPrice]: {
    x: -42,
    y: 537,
    font: FontEnum.Plex,
    color: ColorEnum.Black,
    size: '35px',
    weight: 400
  },
  [Card7KeyEnum.TpSl]: {
    x: 168,
    y: 617,
    font: FontEnum.Plex,
    size: '35px',
    color: ColorEnum.Black,
    weight: 400
  },
}
