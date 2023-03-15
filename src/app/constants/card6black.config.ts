import { TextInterface } from '../interfaces/text.interface';
import { FontEnum } from '../enums/font.enum';
import { ColorEnum } from '../enums/color.enum';
import { Card6KeyEnum } from '../enums/card6-key.enum';

export const CARD6_CONFIG_BLACK: Record<string, TextInterface> = {
  [Card6KeyEnum.Balance]: {
    x: 41,
    y: 288,
    font: FontEnum.PlexCondensed,
    color: ColorEnum.White,
    size: '30px',
    weight: 400
  },
  [Card6KeyEnum.Margin]: {
    x: 41,
    y: 386,
    font: FontEnum.Plex,
    color: ColorEnum.White,
    size: '22px',
    weight: 400
  },
  [Card6KeyEnum.MarginAvg]: {
    x: 41,
    y: 411,
    font: FontEnum.Plex,
    color: ColorEnum.LightGrey,
    size: '18px',
    weight: 400
  },
  [Card6KeyEnum.Wallet]: {
    x: 416,
    y: 386,
    font: FontEnum.Plex,
    color: ColorEnum.White,
    size: '22px',
    weight: 400
  },
  [Card6KeyEnum.WalletAvg]: {
    x: 416,
    y: 411,
    font: FontEnum.Plex,
    color: ColorEnum.LightGrey,
    size: '18px',
    weight: 400
  },
  [Card6KeyEnum.Pnl]: {
    x: 793,
    y: 394,
    font: FontEnum.Plex,
    color: ColorEnum.White,
    size: '22px',
    weight: 400
  },
  [Card6KeyEnum.PnlAvg]: {
    x: 793,
    y: 421,
    font: FontEnum.Plex,
    color: ColorEnum.LightGrey,
    size: '18px',
    weight: 400
  },
}
