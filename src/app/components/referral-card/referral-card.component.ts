import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BackgroundEnum } from '../../enums/background.enum';
import { filter, map, Subject, takeUntil, tap } from 'rxjs';
import { CanvasService } from '../../services/canvas.service';
import { Card2KeyEnum } from '../../enums/card2-key.enum';
import { CLIENTS } from '../../constants/clients.const';
import { CARD2_CONFIG } from '../../constants/card2.config';
import { ColorEnum } from '../../enums/color.enum';
import { SellEnum } from '../../enums/sell.enum';

@Component({
  selector: 'app-referral-card',
  templateUrl: './referral-card.component.html',
  styleUrls: ['./referral-card.component.scss']
})
export class ReferralCardComponent implements OnInit, AfterViewInit, OnDestroy{
  @ViewChild('mirror') imgRef: ElementRef;
  canvas: HTMLCanvasElement;
  form = new FormGroup({
    [Card2KeyEnum.Sell]: new FormControl(SellEnum.Short),
    [Card2KeyEnum.Factor]: new FormControl(''),
    [Card2KeyEnum.Coin]: new FormControl(''),
    [Card2KeyEnum.Value]: new FormControl(''),
    [Card2KeyEnum.EntryPrice]: new FormControl(''),
    [Card2KeyEnum.LastPrice]: new FormControl(''),
    [Card2KeyEnum.Referral]: new FormControl(''),
    [Card2KeyEnum.Background]: new FormControl(BackgroundEnum.Card2Background1),
  })

  imgSrc: any = BackgroundEnum.Card2Background1;
  KEYS = Card2KeyEnum;
  CLIENTS = CLIENTS;
  SELL = SellEnum;
  backgrounds = [
    {
      label: 'Background 1',
      value: BackgroundEnum.Card2Background1,
    },
    {
      label: 'Background 2',
      value: BackgroundEnum.Card2Background2,
    },
    {
      label: 'Background 3',
      value: BackgroundEnum.Card2Background3,
    },
  ]

  private qr$ = new Subject<string>();
  private qrImg = new Image();
  private canvasBackgroundImg = new Image();
  private destroy$ = new Subject<void>()

  constructor(
    private canvasService: CanvasService
  ) {}

  ngOnInit(): void {
    this.qrImg.onload = () => {
      this.setQr();
      this.setImg();
    }
    this.canvasBackgroundImg.onload = () => {
      this.canvas.width = this.canvasBackgroundImg.width;
      this.canvas.height = this.canvasBackgroundImg.height;
      this.resetBackground();
      this.drawForm();
    }
    this.form.valueChanges
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(form => {
        if (form[Card2KeyEnum.Background] === this.canvasBackgroundImg.src) {
          this.resetBackground();
          this.drawForm();
        } else {
          this.canvasBackgroundImg.src = form[Card2KeyEnum.Background];
        }
      });

    this.qr$.pipe(
      tap(qr => {
        if (!qr) { this.setImg() }
      }),
      filter(Boolean),
      map(qr => `assets/img/${qr}.png`),
      takeUntil(this.destroy$),
    ).subscribe(qr => {
      this.qrImg.src === qr ? this.setQr() : this.qrImg.src = qr;
    })
  }

  ngAfterViewInit(): void {
    this.canvas = document.createElement('canvas');
    this.canvasService.initContext(this.canvas.getContext('2d'));
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  private resetBackground(): void {
    this.canvasService.drawImage(this.canvasBackgroundImg, 0, 0);
  }

  private setQr(): void {
    this.canvasService
      .drawImage(this.qrImg, CARD2_CONFIG[Card2KeyEnum.Qr].x, CARD2_CONFIG[Card2KeyEnum.Qr].y, 95, 95);
    this.setImg();
  }

  private setImg(): void {
    this.imgSrc = this.canvas.toDataURL('image/png');
  }

  private drawForm(): void {
    let form = this.form.value;
    this.canvasService
      .drawLine(form[Card2KeyEnum.Sell], `${form[Card2KeyEnum.Factor]}x`, `${form[Card2KeyEnum.Coin].toUpperCase()}  Бессрочный`);
    this.canvasService.drawText(`${form[Card2KeyEnum.Value]}%`, {
      ...CARD2_CONFIG[Card2KeyEnum.Value],
      color: form[Card2KeyEnum.Value].replace(',', '.') > 0 ? ColorEnum.Green : ColorEnum.Red,
    });
    this.canvasService.drawText(form[Card2KeyEnum.EntryPrice], CARD2_CONFIG[Card2KeyEnum.EntryPrice]);
    this.canvasService.drawText(form[Card2KeyEnum.LastPrice], CARD2_CONFIG[Card2KeyEnum.LastPrice]);
    this.canvasService.drawText(form[Card2KeyEnum.Referral], CARD2_CONFIG[Card2KeyEnum.Referral]);
    this.qr$.next(form[Card2KeyEnum.Referral]);
  }
}
