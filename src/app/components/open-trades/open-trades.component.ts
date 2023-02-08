import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SellEnum } from '../../enums/sell.enum';
import { BackgroundEnum } from '../../enums/background.enum';
import { Subject, takeUntil } from 'rxjs';
import { CanvasService } from '../../services/canvas.service';
import { Card4KeyEnum } from '../../enums/card4-key.enum';
import { TradeType } from '../../enums/trade-type.enum';
import { CARD4_CONFIG } from '../../constants/card4.config';
import { CARD4_CONFIG_BLACK } from '../../constants/card4black.config';

@Component({
  selector: 'app-open-trades',
  templateUrl: './open-trades.component.html',
  styleUrls: ['./open-trades.component.scss']
})
export class OpenTradesComponent implements OnInit, AfterViewInit {
  @ViewChild('mirror') imgRef: ElementRef;
  canvas: HTMLCanvasElement;
  form = new FormGroup({
    [Card4KeyEnum.Sell]: new FormControl(SellEnum.Short),
    [Card4KeyEnum.Coin]: new FormControl(''),
    [Card4KeyEnum.Type]: new FormControl(''),
    [Card4KeyEnum.Factor]: new FormControl(''),
    [Card4KeyEnum.RiskBox]: new FormControl(0),
    [Card4KeyEnum.Pnl]: new FormControl(''),
    [Card4KeyEnum.Roe]: new FormControl(''),
    [Card4KeyEnum.Size]: new FormControl(''),
    [Card4KeyEnum.Margin]: new FormControl(''),
    [Card4KeyEnum.Risk]: new FormControl(''),
    [Card4KeyEnum.EntryPrice]: new FormControl(''),
    [Card4KeyEnum.LastPrice]: new FormControl(''),
    [Card4KeyEnum.LiquidPrice]: new FormControl(''),
    [Card4KeyEnum.Background]: new FormControl(BackgroundEnum.Card4Background1),
  })

  config = CARD4_CONFIG;

  imgSrc: any = BackgroundEnum.Card4Background1;
  keys = Card4KeyEnum;
  sell = SellEnum;
  tradeType = TradeType;
  backgrounds = [
    {
      label: 'Background 1',
      value: BackgroundEnum.Card4Background1,
    },
    {
      label: 'Background 2',
      value: BackgroundEnum.Card4Background2,
    }
  ]

  private canvasBackgroundImg = new Image();
  private shareIcon = new Image();
  private destroy$ = new Subject<void>()

  constructor(
    private canvasService: CanvasService
  ) {}

  ngOnInit(): void {
    this.shareIcon.src = 'assets/icons/shareIcon.png';
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
      )
      .subscribe(form => {
        if (form[Card4KeyEnum.Background] === this.canvasBackgroundImg.src) {
          this.resetBackground();
          this.drawForm();
          this.setImg();
        } else {
          this.config = form[Card4KeyEnum.Background] === BackgroundEnum.Card4Background1 ? CARD4_CONFIG : CARD4_CONFIG_BLACK;
          this.canvasBackgroundImg.src = form[Card4KeyEnum.Background];
        }
      });
  }

  ngAfterViewInit(): void {
    this.canvas = document.createElement('canvas');
    this.canvasService.initContext(this.canvas);
    this.canvasBackgroundImg.src = BackgroundEnum.Card4Background1;
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
    this.canvasService.drawOpenTradesLine(
      form[Card4KeyEnum.Sell],
      `${form[Card4KeyEnum.Coin].toUpperCase()} Бессрочный`,
      form[Card4KeyEnum.Type] === TradeType.Cross ? 'Кросс' : 'Изолированый',
      `${form[Card4KeyEnum.Factor]}X`,
      form[Card4KeyEnum.RiskBox],
      this.config === CARD4_CONFIG,
    );
    this.canvasService.drawImage(this.shareIcon, 904, 22);
    this.canvasService.drawNumber(form[Card4KeyEnum.Pnl], this.config[Card4KeyEnum.Pnl]);
    this.canvasService.drawNumber(`${form[Card4KeyEnum.Roe]} %`, this.config[Card4KeyEnum.Roe]);
    this.canvasService.drawText(form[Card4KeyEnum.Size], this.config[Card4KeyEnum.Size]);
    this.canvasService.drawText(form[Card4KeyEnum.Margin], this.config[Card4KeyEnum.Margin]);
    this.canvasService.drawNumber(`${form[Card4KeyEnum.Risk]} %`, this.config[Card4KeyEnum.Risk]);
    this.canvasService.drawText(form[Card4KeyEnum.EntryPrice], this.config[Card4KeyEnum.EntryPrice]);
    this.canvasService.drawText(form[Card4KeyEnum.LastPrice], this.config[Card4KeyEnum.LastPrice]);
    this.canvasService.drawText(form[Card4KeyEnum.LiquidPrice], this.config[Card4KeyEnum.LiquidPrice]);
  }
}
