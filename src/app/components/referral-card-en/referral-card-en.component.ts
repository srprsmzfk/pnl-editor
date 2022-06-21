import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BackgroundEnum } from '../../enums/background.enum';
import { filter, map, Subject, takeUntil, tap } from 'rxjs';
import { CanvasService } from '../../services/canvas.service';
import { Card3KeyEnum } from '../../enums/card3-key.enum';
import { CLIENTS } from '../../constants/clients.const';
import { CARD3_CONFIG } from '../../constants/card3.config';
import { SellEnum } from '../../enums/sell.enum';

@Component({
  selector: 'app-referral-card-en',
  templateUrl: './referral-card-en.component.html',
  styleUrls: ['./referral-card-en.component.scss']
})
export class ReferralCardEnComponent implements OnInit, AfterViewInit, OnDestroy{
  @ViewChild('mirror') imgRef: ElementRef;
  canvas: HTMLCanvasElement;
  form = new FormGroup({
    [Card3KeyEnum.Sell]: new FormControl(SellEnum.ShortEn),
    [Card3KeyEnum.Factor]: new FormControl(''),
    [Card3KeyEnum.Coin]: new FormControl(''),
    [Card3KeyEnum.Value]: new FormControl(''),
    [Card3KeyEnum.EntryPrice]: new FormControl(''),
    [Card3KeyEnum.LastPrice]: new FormControl(''),
    [Card3KeyEnum.Referral]: new FormControl(''),
    [Card3KeyEnum.Background]: new FormControl(BackgroundEnum.Card3Background1),
  })

  imgSrc: any = BackgroundEnum.Card3Background1;
  KEYS = Card3KeyEnum;
  CLIENTS = CLIENTS;
  SELL = SellEnum;
  backgrounds = [
    {
      label: 'Background 1',
      value: BackgroundEnum.Card3Background1,
    },
    {
      label: 'Background 2',
      value: BackgroundEnum.Card3Background2,
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
        if (form[Card3KeyEnum.Background] === this.canvasBackgroundImg.src) {
          this.resetBackground();
          this.drawForm();
        } else {
          this.canvasBackgroundImg.src = form[Card3KeyEnum.Background];
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
    this.canvasService.initContext(this.canvas);
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  private resetBackground(): void {
    this.canvasService.drawImage(this.canvasBackgroundImg, 0, 0);
  }

  private setQr(): void {
    this.canvasService
      .drawImage(this.qrImg, CARD3_CONFIG[Card3KeyEnum.Qr].x, CARD3_CONFIG[Card3KeyEnum.Qr].y, 95, 95);
    this.setImg();
  }

  private setImg(): void {
    this.imgSrc = this.canvas.toDataURL('image/png');
  }

  private drawForm(): void {
    let form = this.form.value;
    this.canvasService
      .drawLineEn(form[Card3KeyEnum.Sell], `${form[Card3KeyEnum.Factor]}x`, `${form[Card3KeyEnum.Coin].toUpperCase()}  Perpetual`);
    this.canvasService
      .drawNumber(`${form[Card3KeyEnum.Value].replace(',', '.').trim() < 0 || form[Card3KeyEnum.Value] === '-' ? '' : '+'}${form[Card3KeyEnum.Value]}%`, CARD3_CONFIG[Card3KeyEnum.Value]);
    this.canvasService.drawText(form[Card3KeyEnum.EntryPrice], CARD3_CONFIG[Card3KeyEnum.EntryPrice]);
    this.canvasService.drawText(form[Card3KeyEnum.LastPrice], CARD3_CONFIG[Card3KeyEnum.LastPrice]);
    this.canvasService.drawText(form[Card3KeyEnum.Referral], CARD3_CONFIG[Card3KeyEnum.Referral]);
    this.qr$.next(form[Card3KeyEnum.Referral]);
  }
}
