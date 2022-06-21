import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SellEnum } from '../../enums/sell.enum';
import { BackgroundEnum } from '../../enums/background.enum';
import { filter, map, Subject, takeUntil, tap } from 'rxjs';
import { CanvasService } from '../../services/canvas.service';
import { Card4KeyEnum } from '../../enums/card4-key.enum';
import { TradeType } from '../../enums/trade-type.enum';
import { CARD4_CONFIG } from '../../constants/card4.config';

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
    [Card4KeyEnum.Risk]: new FormControl(0),
  })

  imgSrc: any = BackgroundEnum.Card4Background1;
  keys = Card4KeyEnum;
  sell = SellEnum;
  tradeType = TradeType;
  // backgrounds = [
  //   {
  //     label: 'Background 1',
  //     value: BackgroundEnum.Card2Background1,
  //   },
  //   {
  //     label: 'Background 2',
  //     value: BackgroundEnum.Card2Background2,
  //   },
  //   {
  //     label: 'Background 3',
  //     value: BackgroundEnum.Card2Background3,
  //   },
  // ]

  private canvasBackgroundImg = new Image();
  private destroy$ = new Subject<void>()

  constructor(
    private canvasService: CanvasService
  ) {}

  ngOnInit(): void {
    this.canvasBackgroundImg.onload = () => {
      this.canvas.width = this.canvasBackgroundImg.width;
      this.canvas.height = this.canvasBackgroundImg.height;
      console.log(this.canvas.width, this.canvas.height);
      this.resetBackground();
      this.drawForm();
    }
    this.form.valueChanges
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(form => {
        // if (form[Card4KeyEnum.Background] === this.canvasBackgroundImg.src) {
        this.resetBackground();
        this.drawForm();
        this.setImg();


        // } else {
        //   this.canvasBackgroundImg.src = form[Card4KeyEnum.Background];
        // }
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
      form[Card4KeyEnum.Risk],
    );


    // this.canvasService.drawNumber(`${form[Card4KeyEnum.Value]}%`, CARD2_CONFIG[Card4KeyEnum.Value]);
    // this.canvasService.drawText(form[Card4KeyEnum.EntryPrice], CARD2_CONFIG[Card4KeyEnum.EntryPrice]);
    // this.canvasService.drawText(form[Card4KeyEnum.LastPrice], CARD2_CONFIG[Card4KeyEnum.LastPrice]);
    // this.canvasService.drawText(form[Card4KeyEnum.Referral], CARD2_CONFIG[Card4KeyEnum.Referral]);
    // this.qr$.next(form[Card4KeyEnum.Referral]);
  }
}
