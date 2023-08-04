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
      [CardColor.White]: BackgroundEnum.TpslRuWhite,
      [CardColor.Black]: BackgroundEnum.TpslRuBlack,
    },
    [CardLanguage.En]: {
      [CardColor.White]: BackgroundEnum.TpslEnWhite,
      [CardColor.Black]: BackgroundEnum.TpslEnBlack,
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
  imgSrc: any = this.backgrounds[CardLanguage.En][CardColor.White];
  keys = Card7KeyEnum;
  sell = SellEnum;
  tradeType = TradeType;
  CardLanguage = CardLanguage;
  CardColor = CardColor;

  private canvasBackgroundImg = new Image();
  private shareIcon = new Image();
  private noteIcon = new Image();
  private lang = CardLanguage.En;
  private destroy$ = new Subject<void>()

  constructor(
    private canvasService: OpenTradesTplsCanvasService
  ) {}

  ngOnInit(): void {
    this.shareIcon.src = 'assets/icons/shareIcon.png';
    this.noteIcon.src = 'assets/icons/note.png';
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
          this.canvasBackgroundImg.src = this.backgrounds[this.lang][form[Card7KeyEnum.Background]];
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
    this.canvasBackgroundImg.src = this.backgrounds[CardLanguage.En][CardColor.White];
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
      this.canvasService.drawOpenTradesHeader(
        form[Card7KeyEnum.Sell] === SellEnum.Short ? 'S' : 'B',
        form[Card7KeyEnum.Sell] === SellEnum.Short ? ColorEnum.Red : ColorEnum.Green,
        `${form[Card7KeyEnum.Coin].toUpperCase()} Perpetual`,
        form[Card7KeyEnum.Type] === TradeType.Cross ? 'Cross' : 'Isolated',
        `${form[Card7KeyEnum.Factor]}X`,
        form[Card7KeyEnum.RiskBox],
        this.config,
      );
    } else {
      this.canvasService.drawOpenTradesHeader(
        form[Card7KeyEnum.Sell] === SellEnum.Short ? 'К' : 'П',
        form[Card7KeyEnum.Sell] === SellEnum.Short ? ColorEnum.Red : ColorEnum.Green,
        `${form[Card7KeyEnum.Coin].toUpperCase()} Бессрочный`,
        form[Card7KeyEnum.Type] === TradeType.Cross ? 'Кросс' : 'Изолированый',
        `${form[Card7KeyEnum.Factor]}X`,
        form[Card7KeyEnum.RiskBox],
        this.config,
      );
    }
    this.canvasService.drawImage(this.shareIcon, 1183, 64);
    this.canvasService.drawNumber(form[Card7KeyEnum.Pnl], this.config[Card7KeyEnum.Pnl]);
    this.canvasService.drawNumber(`${form[Card7KeyEnum.Roe]} %`, this.config[Card7KeyEnum.Roe]);
    this.canvasService.drawText(form[Card7KeyEnum.Size], this.config[Card7KeyEnum.Size]);
    this.canvasService.drawText(form[Card7KeyEnum.Margin], this.config[Card7KeyEnum.Margin]);
    this.canvasService.drawNumber(`${form[Card7KeyEnum.Risk]} %`, this.config[Card7KeyEnum.Risk]);
    this.canvasService.drawText(form[Card7KeyEnum.EntryPrice], this.config[Card7KeyEnum.EntryPrice]);
    this.canvasService.drawText(form[Card7KeyEnum.LastPrice], this.config[Card7KeyEnum.LastPrice]);
    this.canvasService.drawText(form[Card7KeyEnum.LiquidPrice], this.config[Card7KeyEnum.LiquidPrice]);
    this.canvasService.drawTpSlLine(form[Card7KeyEnum.TpSl], this.config, this.noteIcon);
  }
}
