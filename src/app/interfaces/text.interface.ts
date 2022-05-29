import { FontEnum } from '../enums/font.enum';
import { ColorEnum } from '../enums/color.enum';

export interface TextInterface {
  x: number,
  y: number,
  font?: FontEnum,
  weight?: number,
  size?: string,
  color?: ColorEnum
}
