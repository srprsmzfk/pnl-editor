import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SellEnum } from '../../enums/sell.enum';
import { BackgroundEnum } from '../../enums/background.enum';
import { Subject, takeUntil, tap } from 'rxjs';
import { Card7KeyEnum } from '../../enums/card7-key.enum';
import { TradeType } from '../../enums/trade-type.enum';
import { CARD7_CONFIG } from '../../constants/card7.config';
import { CARD7_CONFIG_BLACK } from '../../constants/card7black.config';
import { OpenTradesTplsCanvasService } from '../../services/open-trades-tpls.canvas.service';
import { CardLanguage } from '../../enums/card-language.enum';
import { CardColor } from '../../enums/card-color.enum';
import { ColorEnum } from '../../enums/color.enum';

@Component({
  selector: 'app-open-trades-tpsl',
  templateUrl: './open-trades-tpsl.component.html',
  styleUrls: ['./open-trades-tpsl.component.scss']
})
export class OpenTradesTpslComponent implements OnInit, AfterViewInit {
  @ViewChild('mirror') imgRef: ElementRef;

  canvas: HTMLCanvasElement;
  backgrounds = {
    [CardLanguage.Ru]: {
      [CardColor.White]: {
        [0]: BackgroundEnum.TradeRuWhite,
        [1]: BackgroundEnum.TradeRuWhiteTpsl,
      },
      [CardColor.Black]: {
        [0]: BackgroundEnum.TradeRuBlack,
        [1]: BackgroundEnum.TradeRuBlackTpsl,
      },
    },
    [CardLanguage.En]: {
      [CardColor.White]: {
        [0]: BackgroundEnum.TradeEnWhite,
        [1]: BackgroundEnum.TradeEnWhiteTpsl,
      },
      [CardColor.Black]: {
        [0]: BackgroundEnum.TradeEnBlack,
        [1]: BackgroundEnum.TradeEnBlackTpsl,
      },
    }
  }
  form = new FormGroup({
    [Card7KeyEnum.Sell]: new FormControl(SellEnum.Short),
    [Card7KeyEnum.Coin]: new FormControl(''),
    [Card7KeyEnum.Type]: new FormControl(TradeType.Cross),
    [Card7KeyEnum.Factor]: new FormControl(''),
    [Card7KeyEnum.RiskBox]: new FormControl(0),
    [Card7KeyEnum.Pnl]: new FormControl(''),
    [Card7KeyEnum.Roe]: new FormControl(''),
    [Card7KeyEnum.Size]: new FormControl(''),
    [Card7KeyEnum.Margin]: new FormControl(''),
    [Card7KeyEnum.Risk]: new FormControl(''),
    [Card7KeyEnum.EntryPrice]: new FormControl(''),
    [Card7KeyEnum.LastPrice]: new FormControl(''),
    [Card7KeyEnum.LiquidPrice]: new FormControl(''),
    [Card7KeyEnum.Lang]: new FormControl(CardLanguage.En),
    [Card7KeyEnum.Background]: new FormControl(CardColor.White),
    [Card7KeyEnum.TpSl]: new FormControl(''),
  })
  config= CARD7_CONFIG;
  imgSrc: any = this.backgrounds[CardLanguage.En][CardColor.White][0];
  keys = Card7KeyEnum;
  sell = SellEnum;
  tradeType = TradeType;
  CardLanguage = CardLanguage;
  CardColor = CardColor;

  private canvasBackgroundImg = new Image();
  private noteIcon = new Image();
  private lang = CardLanguage.En;
  private destroy$ = new Subject<void>()

  constructor(
    private canvasService: OpenTradesTplsCanvasService
  ) {}

  ngOnInit(): void {
    this.noteIcon.src = 'assets/icons/note_white.svg';
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
          this.config = form[Card7KeyEnum.Background] === CardColor.White ? CARD7_CONFIG : CARD7_CONFIG_BLACK;
          this.lang = form[Card7KeyEnum.Lang];
          this.canvasBackgroundImg.src = this.backgrounds[this.lang][form[Card7KeyEnum.Background]][+(form[Card7KeyEnum.TpSl].length > 0)];
          this.noteIcon.src = `assets/icons/note_${form[Card7KeyEnum.Background]}.svg`;
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
    this.canvasBackgroundImg.src = this.backgrounds[CardLanguage.En][CardColor.White][0];
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
    this.canvasService.drawOpenTradesHeader(
      form[Card7KeyEnum.Sell],
      form[Card7KeyEnum.Sell] === SellEnum.Short ? ColorEnum.Red : ColorEnum.Green,
      `${form[Card7KeyEnum.Coin].toUpperCase()}`,
      form[Card7KeyEnum.Type],
      `${form[Card7KeyEnum.Factor]}X`,
      form[Card7KeyEnum.RiskBox],
      form[Card7KeyEnum.Background],
      form[Card7KeyEnum.Lang],
      this.config,
    );
    this.canvasService.drawNumber(form[Card7KeyEnum.Pnl], this.config[Card7KeyEnum.Pnl]);
    this.canvasService.drawNumber(`${form[Card7KeyEnum.Roe]} %`, this.config[Card7KeyEnum.Roe]);
    this.canvasService.drawText(form[Card7KeyEnum.Size], this.config[Card7KeyEnum.Size]);
    this.canvasService.drawText(form[Card7KeyEnum.Margin], this.config[Card7KeyEnum.Margin]);
    this.canvasService.drawNumber(`${form[Card7KeyEnum.Risk]} %`, this.config[Card7KeyEnum.Risk]);
    this.canvasService.drawText(form[Card7KeyEnum.EntryPrice], this.config[Card7KeyEnum.EntryPrice]);
    this.canvasService.drawText(form[Card7KeyEnum.LastPrice], this.config[Card7KeyEnum.LastPrice]);
    this.canvasService.drawText(form[Card7KeyEnum.LiquidPrice], this.config[Card7KeyEnum.LiquidPrice]);
    if (form[Card7KeyEnum.TpSl]) {
      this.canvasService.drawTpSlLine(form[Card7KeyEnum.TpSl], this.config, this.noteIcon);
    }
  }
}
