import { TextInterface } from '../interfaces/text.interface';
import { FontEnum } from '../enums/font.enum';
import { ColorEnum } from '../enums/color.enum';
import { Card8KeyEnum } from '../enums/card8-key.enum';

export const CARD8_CONFIG_BLACK: Record<string, TextInterface> = {
  [Card8KeyEnum.SellBox]: {
    x: 46,
    y: 54,
  },
  [Card8KeyEnum.Sell]: {
    x: 60,
    y: 90,
    font: FontEnum.Plex,
    color: ColorEnum.White,
    size: '30px',
    weight: 400
  },
  [Card8KeyEnum.Coin]: {
    x: 105,
    y: 96,
    font: FontEnum.PlexCondensed,
    size: '45px',
    color: ColorEnum.White,
    weight: 500
  },
  [Card8KeyEnum.Type]: {
    x: 430,
    y: 96,
    font: FontEnum.Plex,
    size: '30px',
    color: ColorEnum.LightGreyOpenTrades,
    weight: 400
  },
  [Card8KeyEnum.Factor]: {
    x: 115,
    y: 96,
    font: FontEnum.Plex,
    size: '30px',
    color: ColorEnum.LightGreyOpenTrades,
    weight: 400
  },
  [Card8KeyEnum.Pnl]: {
    x: -42,
    y: 196,
    font: FontEnum.Plex,
    size: '50px',
    color: ColorEnum.Green,
    weight: 100
  },
  [Card8KeyEnum.Size]: {
    x: 44,
    y: 340,
    font: FontEnum.Plex,
    size: '40px',
    color: ColorEnum.White,
    weight: 200
  },
  [Card8KeyEnum.SizeTitle]: {
    x: 44,
    y: 278,
    font: FontEnum.Plex,
    size: '35px',
    color: '#6f7581',
    weight: 200
  },
  [Card8KeyEnum.Margin]: {
    x: 472,
    y: 340,
    font: FontEnum.Plex,
    size: '40px',
    color: ColorEnum.White,
    weight: 200,
  },
  [Card8KeyEnum.MarginRatio]: {
    x: -42,
    y: 340,
    font: FontEnum.Plex,
    size: '40px',
    weight: 200,
    color: ColorEnum.White,
  },
  [Card8KeyEnum.AvgPrice]: {
    x: 44,
    y: 487,
    font: FontEnum.Plex,
    size: '40px',
    color: ColorEnum.White,
    weight: 200
  },
  [Card8KeyEnum.FairPrice]: {
    x: 472,
    y: 487,
    font: FontEnum.Plex,
    size: '40px',
    color: ColorEnum.White,
    weight: 200
  },
  [Card8KeyEnum.LiquidPrice]: {
    x: -42,
    y: 487,
    font: FontEnum.Plex,
    color: ColorEnum.White,
    size: '40px',
    weight: 200
  },
}
