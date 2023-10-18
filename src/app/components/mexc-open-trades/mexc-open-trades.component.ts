import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SellEnum } from '../../enums/sell.enum';
import { BackgroundEnum } from '../../enums/background.enum';
import { Subject, takeUntil, tap } from 'rxjs';
import { Card8KeyEnum } from '../../enums/card8-key.enum';
import { TradeType } from '../../enums/trade-type.enum';
import { CARD8_CONFIG_BLACK } from '../../constants/card8black.config';
import { CardLanguage } from '../../enums/card-language.enum';
import { ColorEnum } from '../../enums/color.enum';
import { MexcOpenTradesCanvasService } from '../../services/mexc-open-trades.canvas.service';

@Component({
  selector: 'app-mexc-open-trades',
  templateUrl: './mexc-open-trades.component.html',
  styleUrls: ['./mexc-open-trades.component.scss']
})
export class MexcOpenTradesComponent implements OnInit, AfterViewInit {
  @ViewChild('mirror') imgRef: ElementRef;

  canvas: HTMLCanvasElement;
  backgrounds = {
    [CardLanguage.Ru]: BackgroundEnum.MexcCard1RuBlack,
    [CardLanguage.En]: BackgroundEnum.MexcCard1EnBlack
  }
  form = new FormGroup({
    [Card8KeyEnum.Sell]: new FormControl(SellEnum.Short),
    [Card8KeyEnum.Coin]: new FormControl(''),
    [Card8KeyEnum.Type]: new FormControl(TradeType.Cross),
    [Card8KeyEnum.Factor]: new FormControl(''),
    [Card8KeyEnum.Pnl]: new FormControl(''),
    [Card8KeyEnum.Size]: new FormControl(''),
    [Card8KeyEnum.Margin]: new FormControl(''),
    [Card8KeyEnum.MarginRatio]: new FormControl(''),
    [Card8KeyEnum.AvgPrice]: new FormControl(''),
    [Card8KeyEnum.FairPrice]: new FormControl(''),
    [Card8KeyEnum.LiquidPrice]: new FormControl(''),
    [Card8KeyEnum.Lang]: new FormControl(CardLanguage.En),
  })
  config= CARD8_CONFIG_BLACK;
  imgSrc: any = this.backgrounds[CardLanguage.En];
  keys = Card8KeyEnum;
  sell = SellEnum;
  tradeType = TradeType;
  CardLanguage = CardLanguage;

  private canvasBackgroundImg = new Image();
  private lang = CardLanguage.En;
  private destroy$ = new Subject<void>()

  constructor(
    private canvasService: MexcOpenTradesCanvasService
  ) {}

  ngOnInit(): void {
    this.canvasBackgroundImg.onload = () => {
      this.canvas.width = this.canvasBackgroundImg.width;
      this.canvas.height = this.canvasBackgroundImg.height;
      this.resetBackground();
      this.drawForm();
      this.setImg();
    }
    this.form.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap(form => {
          this.config = CARD8_CONFIG_BLACK;
          this.lang = form[Card8KeyEnum.Lang];
          this.canvasBackgroundImg.src = this.backgrounds[this.lang];
        })
      )
      .subscribe(() => {
        this.resetBackground();
        this.drawForm();
        this.setImg();
      });
  }

  ngAfterViewInit(): void {
    this.canvas = document.createElement('canvas');
    this.canvasService.initContext(this.canvas);
    this.canvasBackgroundImg.src = this.backgrounds[CardLanguage.En];
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  private resetBackground(): void {
    this.canvasService.drawImage(this.canvasBackgroundImg, 0, 0);
  }

  private setImg(): void {
    this.imgSrc = this.canvas.toDataURL('image/png');
  }

  private drawForm(): void {
    let form = this.form.value;
    if (this.lang === CardLanguage.En) {
      this.canvasService.drawMexcOpenTradesLine(
        form[Card8KeyEnum.Sell] === SellEnum.Short ? 'S' : 'B',
        form[Card8KeyEnum.Sell] === SellEnum.Short ? ColorEnum.Red : ColorEnum.Green,
        `${form[Card8KeyEnum.Coin].toUpperCase()} `,
        'Perpetual',
        form[Card8KeyEnum.Type] === TradeType.Cross ? 'Cross' : 'Isolated',
        `${form[Card8KeyEnum.Factor]}X`,
        this.config,
      );
    } else {
      this.canvasService.drawMexcOpenTradesLine(
        form[Card8KeyEnum.Sell] === SellEnum.Short ? 'S' : 'B',
        form[Card8KeyEnum.Sell] === SellEnum.Short ? ColorEnum.Red : ColorEnum.Green,
        `${form[Card8KeyEnum.Coin].toUpperCase()} `,
        'Бессрочный',
        form[Card8KeyEnum.Type] === TradeType.Cross ? 'Кросс' : 'Изолированый',
        `${form[Card8KeyEnum.Factor]}X`,
        this.config,
      );
    }
    this.canvasService.drawNumber(form[Card8KeyEnum.Pnl], this.config[Card8KeyEnum.Pnl]);
    this.canvasService.drawText(`${form[Card8KeyEnum.Lang] === CardLanguage.En ? 'Size' : 'Позиция'}(${form[Card8KeyEnum.Coin].toUpperCase().split(' ')[0]})`, this.config[Card8KeyEnum.SizeTitle]);
    this.canvasService.drawText(form[Card8KeyEnum.Size], this.config[Card8KeyEnum.Size]);
    this.canvasService.drawText(form[Card8KeyEnum.Margin], this.config[Card8KeyEnum.Margin]);
    this.canvasService.drawText(`${form[Card8KeyEnum.MarginRatio]}%`, this.config[Card8KeyEnum.MarginRatio]);
    this.canvasService.drawText(form[Card8KeyEnum.AvgPrice], this.config[Card8KeyEnum.AvgPrice]);
    this.canvasService.drawText(form[Card8KeyEnum.FairPrice], this.config[Card8KeyEnum.FairPrice]);
    this.canvasService.drawText(form[Card8KeyEnum.LiquidPrice], this.config[Card8KeyEnum.LiquidPrice]);
  }
}
