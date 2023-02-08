import { TextInterface } from '../interfaces/text.interface';
import { FontEnum } from '../enums/font.enum';
import { ColorEnum } from '../enums/color.enum';
import { Card4KeyEnum } from '../enums/card4-key.enum';

export const CARD4_CONFIG_BLACK: Record<string, TextInterface> = {
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
    font: FontEnum.PlexCondensed,
    size: '40px',
    color: ColorEnum.White,
    weight: 500
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
  [Card4KeyEnum.RiskBox]: {
    x: 795,
    y: 21,
  },
  [Card4KeyEnum.Pnl]: {
    x: 37,
    y: 203,
    font: FontEnum.PlexCondensed,
    size: '55px',
    color: ColorEnum.Green,
    weight: 400
  },
  [Card4KeyEnum.Roe]: {
    x: -40,
    y: 203,
    font: FontEnum.PlexCondensed,
    size: '55px',
    color: ColorEnum.Green,
    weight: 400
  },
  [Card4KeyEnum.Size]: {
    x: 37,
    y: 329,
    font: FontEnum.Plex,
    size: '35px',
    color: ColorEnum.White,
    weight: 400
  },
  [Card4KeyEnum.Margin]: {
    x: 342,
    y: 329,
    font: FontEnum.Plex,
    size: '35px',
    color: ColorEnum.White,
    weight: 400
  },
  [Card4KeyEnum.Risk]: {
    x: -40,
    y: 329,
    font: FontEnum.Plex,
    size: '35px',
    weight: 400
  },
  [Card4KeyEnum.EntryPrice]: {
    x: 37,
    y: 504,
    font: FontEnum.Plex,
    size: '35px',
    color: ColorEnum.White,
    weight: 400
  },
  [Card4KeyEnum.LastPrice]: {
    x: 342,
    y: 504,
    font: FontEnum.Plex,
    size: '35px',
    color: ColorEnum.White,
    weight: 400
  },
  [Card4KeyEnum.LiquidPrice]: {
    x: -40,
    y: 504,
    font: FontEnum.Plex,
    color: ColorEnum.White,
    size: '35px',
    weight: 400
  },
}
