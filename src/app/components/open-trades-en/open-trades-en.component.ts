import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SellEnum } from '../../enums/sell.enum';
import { BackgroundEnum } from '../../enums/background.enum';
import { Subject, takeUntil } from 'rxjs';
import { CanvasService } from '../../services/canvas.service';
import { Card5KeyEnum } from '../../enums/card5-key.enum';
import { TradeType } from '../../enums/trade-type.enum';
import { CARD5_CONFIG } from '../../constants/card5.config';
import { CARD5_CONFIG_BLACK } from '../../constants/card5black.config';

@Component({
  selector: 'app-open-trades-en',
  templateUrl: './open-trades-en.component.html',
  styleUrls: ['./open-trades-en.component.scss']
})
export class OpenTradesEnComponent implements OnInit, AfterViewInit {
  @ViewChild('mirror') imgRef: ElementRef;
  canvas: HTMLCanvasElement;
  form = new FormGroup({
    [Card5KeyEnum.Sell]: new FormControl(SellEnum.Short),
    [Card5KeyEnum.Coin]: new FormControl(''),
    [Card5KeyEnum.Type]: new FormControl(''),
    [Card5KeyEnum.Factor]: new FormControl(''),
    [Card5KeyEnum.RiskBox]: new FormControl(0),
    [Card5KeyEnum.Pnl]: new FormControl(''),
    [Card5KeyEnum.Roe]: new FormControl(''),
    [Card5KeyEnum.Size]: new FormControl(''),
    [Card5KeyEnum.Margin]: new FormControl(''),
    [Card5KeyEnum.Risk]: new FormControl(''),
    [Card5KeyEnum.EntryPrice]: new FormControl(''),
    [Card5KeyEnum.LastPrice]: new FormControl(''),
    [Card5KeyEnum.LiquidPrice]: new FormControl(''),
    [Card5KeyEnum.Background]: new FormControl(BackgroundEnum.Card5Background1),
  })

  config = CARD5_CONFIG;

  imgSrc: any = BackgroundEnum.Card5Background1;
  keys = Card5KeyEnum;
  sell = SellEnum;
  tradeType = TradeType;
  backgrounds = [
    {
      label: 'Background 1',
      value: BackgroundEnum.Card5Background1,
    },
    {
      label: 'Background 2',
      value: BackgroundEnum.Card5Background2,
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
        if (form[Card5KeyEnum.Background] === this.canvasBackgroundImg.src) {
          this.resetBackground();
          this.drawForm();
          this.setImg();
        } else {
          this.config = form[Card5KeyEnum.Background] === BackgroundEnum.Card5Background1 ? CARD5_CONFIG : CARD5_CONFIG_BLACK;
          this.canvasBackgroundImg.src = form[Card5KeyEnum.Background];
        }
      });
  }

  ngAfterViewInit(): void {
    this.canvas = document.createElement('canvas');
    this.canvasService.initContext(this.canvas);
    this.canvasBackgroundImg.src = BackgroundEnum.Card5Background1;
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
    this.canvasService.drawOpenTradesEnLine(
      form[Card5KeyEnum.Sell],
      `${form[Card5KeyEnum.Coin].toUpperCase()} Perpetual`,
      form[Card5KeyEnum.Type] === TradeType.Cross ? 'Cross' : 'Isolated',
      `${form[Card5KeyEnum.Factor]}X`,
      form[Card5KeyEnum.RiskBox],
      this.config === CARD5_CONFIG,
    );
    this.canvasService.drawImage(this.shareIcon, 904, 22);
    this.canvasService.drawNumber(form[Card5KeyEnum.Pnl], this.config[Card5KeyEnum.Pnl]);
    this.canvasService.drawNumber(`${form[Card5KeyEnum.Roe]} %`, this.config[Card5KeyEnum.Roe]);
    this.canvasService.drawText(form[Card5KeyEnum.Size], this.config[Card5KeyEnum.Size]);
    this.canvasService.drawText(form[Card5KeyEnum.Margin], this.config[Card5KeyEnum.Margin]);
    this.canvasService.drawNumber(`${form[Card5KeyEnum.Risk]} %`, this.config[Card5KeyEnum.Risk]);
    this.canvasService.drawText(form[Card5KeyEnum.EntryPrice], this.config[Card5KeyEnum.EntryPrice]);
    this.canvasService.drawText(form[Card5KeyEnum.LastPrice], this.config[Card5KeyEnum.LastPrice]);
    this.canvasService.drawText(form[Card5KeyEnum.LiquidPrice], this.config[Card5KeyEnum.LiquidPrice]);
  }
}
