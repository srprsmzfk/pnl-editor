import { TextInterface } from '../interfaces/text.interface';
import { FontEnum } from '../enums/font.enum';
import { ColorEnum } from '../enums/color.enum';
import { Card5KeyEnum } from '../enums/card5-key.enum';

export const CARD5_CONFIG_BLACK: Record<string, TextInterface> = {
  [Card5KeyEnum.SellBox]: {
    x: 37,
    y: 21,
  },
  [Card5KeyEnum.Sell]: {
    x: 48,
    y: 54,
    font: FontEnum.Plex,
    color: ColorEnum.White,
    size: '30px',
    weight: 400
  },
  [Card5KeyEnum.Coin]: {
    x: 108,
    y: 57,
    font: FontEnum.PlexCondensed,
    size: '40px',
    color: ColorEnum.White,
    weight: 500
  },
  [Card5KeyEnum.Type]: {
    x: 430,
    y: 54,
    font: FontEnum.Plex,
    size: '30px',
    color: ColorEnum.LightGreyOpenTrades,
    weight: 400
  },
  [Card5KeyEnum.Factor]: {
    x: 115,
    y: 54,
    font: FontEnum.Plex,
    size: '30px',
    color: ColorEnum.LightGreyOpenTrades,
    weight: 400
  },
  [Card5KeyEnum.RiskBox]: {
    x: 795,
    y: 21,
  },
  [Card5KeyEnum.Pnl]: {
    x: 35,
    y: 200,
    font: FontEnum.PlexCondensed,
    size: '55px',
    color: ColorEnum.Green,
    weight: 400
  },
  [Card5KeyEnum.Roe]: {
    x: -40,
    y: 200,
    font: FontEnum.PlexCondensed,
    size: '55px',
    color: ColorEnum.Green,
    weight: 400
  },
  [Card5KeyEnum.Size]: {
    x: 37,
    y: 305,
    font: FontEnum.Plex,
    size: '35px',
    color: ColorEnum.White,
    weight: 400
  },
  [Card5KeyEnum.Margin]: {
    x: 342,
    y: 305,
    font: FontEnum.Plex,
    size: '35px',
    color: ColorEnum.White,
    weight: 400
  },
  [Card5KeyEnum.Risk]: {
    x: -40,
    y: 305,
    font: FontEnum.Plex,
    size: '35px',
    weight: 400
  },
  [Card5KeyEnum.EntryPrice]: {
    x: 37,
    y: 410,
    font: FontEnum.Plex,
    size: '35px',
    color: ColorEnum.White,
    weight: 400
  },
  [Card5KeyEnum.LastPrice]: {
    x: 342,
    y: 410,
    font: FontEnum.Plex,
    size: '35px',
    color: ColorEnum.White,
    weight: 400
  },
  [Card5KeyEnum.LiquidPrice]: {
    x: -40,
    y: 410,
    font: FontEnum.Plex,
    color: ColorEnum.White,
    size: '35px',
    weight: 400
  },
}
