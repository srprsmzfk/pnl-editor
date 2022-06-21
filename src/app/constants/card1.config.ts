import { Card1KeyEnum } from '../enums/card1-key.enum';
import { FontEnum } from '../enums/font.enum';
import { ColorEnum } from '../enums/color.enum';

export const CARD1_CONFIG = {
  [Card1KeyEnum.Value]: {
    x: 62,
    y: 625,
    font: FontEnum.PlexCondensed,
    color: ColorEnum.Green,
    size: '95px',
    weight: 400
  },
  [Card1KeyEnum.StartDate]: {
    x: 206,
    y: 377,
    font: FontEnum.Plex,
    size: '35px',
    color: ColorEnum.Grey,
    weight: 400
  },
  [Card1KeyEnum.EndDate]: {
    x: 3,
    y: 337,
    font: FontEnum.Plex,
    size: '26px',
    color: ColorEnum.Grey,
    weight: 400
  },
  [Card1KeyEnum.Referral]: {
    x: 260,
    y: 915,
    font: FontEnum.Plex,
    size: '70px',
    color: ColorEnum.White,
    weight: 400
  },
  [Card1KeyEnum.Qr]: {
    x: 66,
    y: 781,
  }
}
