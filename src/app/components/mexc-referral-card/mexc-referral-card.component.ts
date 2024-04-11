import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BackgroundEnum } from '../../enums/background.enum';
import { filter, map, Subject, takeUntil, tap } from 'rxjs';
import { Card9KeyEnum } from '../../enums/card9-key.enum';
import { SellEnum } from '../../enums/sell.enum';
import { MEXC_CLIENTS } from '../../constants/mexc-clients.const';
import { CardLanguage } from '../../enums/card-language.enum';
import { CARD9_CONFIG_EN } from '../../constants/card9en.config';
import { CARD9_CONFIG_RU } from '../../constants/card9ru.config';
import { MexcReferralCanvasService } from '../../services/mexc-referral.canvas.service';

const ruBgs = [
  {
    label: '0',
    value: BackgroundEnum.MexCard2Ru1,
  },
  {
    label: '1',
    value: BackgroundEnum.MexCard2Ru2,
  },
  {
    label: '2',
    value: BackgroundEnum.MexCard2Ru3,
  },
  {
    label: '3',
    value: BackgroundEnum.MexCard2Ru4,
  },
  {
    label: '4',
    value: BackgroundEnum.MexCard2Ru5,
  },
];

const enBgs = [
  {
    label: '0',
    value: BackgroundEnum.MexCard2En1,
  },
  {
    label: '1',
    value: BackgroundEnum.MexCard2En2,
  },
  {
    label: '2',
    value: BackgroundEnum.MexCard2En3,
  },
  {
    label: '3',
    value: BackgroundEnum.MexCard2En4,
  },
  {
    label: '4',
    value: BackgroundEnum.MexCard2En5,
  },
];


@Component({
  selector: 'app-mexc-referral-card',
  templateUrl: './mexc-referral-card.component.html',
  styleUrls: ['./mexc-referral-card.component.scss']
})
export class MexcReferralCardComponent implements OnInit, AfterViewInit, OnDestroy{
  @ViewChild('mirror') imgRef: ElementRef;
  canvas: HTMLCanvasElement;
  form = new FormGroup({
    [Card9KeyEnum.Background]: new FormControl(),
    [Card9KeyEnum.Sell]: new FormControl(SellEnum.ShortEn),
    [Card9KeyEnum.Factor]: new FormControl(''),
    [Card9KeyEnum.Coin]: new FormControl(''),
    [Card9KeyEnum.Referral]: new FormControl(''),
    [Card9KeyEnum.Pnl]: new FormControl(''),
    [Card9KeyEnum.Pnl2]: new FormControl(''),
    [Card9KeyEnum.FairPrice]: new FormControl(''),
    [Card9KeyEnum.EntryPrice]: new FormControl(''),
    [Card9KeyEnum.Time]: new FormControl(''),
    [Card9KeyEnum.Lang]: new FormControl(CardLanguage.En),
  })

  imgSrc: any = BackgroundEnum.MexCard2En1;
  key = Card9KeyEnum;
  referals = MEXC_CLIENTS;
  sell = SellEnum;
  config = CARD9_CONFIG_EN;
  backgrounds = enBgs;
  cardLanguage = CardLanguage;

  private lang = CardLanguage.En;
  private qr$ = new Subject<string>();
  private qrImg = new Image();
  private canvasBackgroundImg = new Image();
  private destroy$ = new Subject<void>();

  constructor(
    private canvasService: MexcReferralCanvasService
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

    this.canvasBackgroundImg.src = this.imgSrc;

    this.form.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap(form => {
          this.lang = form[Card9KeyEnum.Lang];
          this.backgrounds = this.lang === CardLanguage.En ? enBgs : ruBgs;
          this.config = this.lang === CardLanguage.En ? CARD9_CONFIG_EN : CARD9_CONFIG_RU;
          this.canvasBackgroundImg.src = this.backgrounds[+form[this.key.Background]].value;
        })
      )
      .subscribe(() => {
        this.drawForm();
        this.setImg();
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
      .drawImage(this.qrImg, this.config[this.key.Qr].x, this.config[this.key.Qr].y, 163, 163);
    this.setImg();
  }

  private setImg(): void {
    this.imgSrc = this.canvas.toDataURL('image/png');
  }

  private drawForm(): void {
    let form = this.form.value;
    this.canvasService.drawText(`${form[this.key.Coin].toUpperCase()} USDT ${this.lang === CardLanguage.En ? 'Perpetual' : 'Бессрочный'}`, this.config[this.key.Coin]);
    this.canvasService.drawSellLine(this.getSellValue(), form[this.key.Factor], this.config);
    this.canvasService
      .drawNumber(`${form[this.key.Pnl]}%`, this.config[this.key.Pnl]);
    this.canvasService
      .drawNumber(`${form[this.key.Pnl2]}`, this.config[this.key.Pnl2]);
    this.canvasService.drawText(form[this.key.FairPrice], this.config[this.key.FairPrice]);
    this.canvasService.drawText(form[this.key.EntryPrice], this.config[this.key.EntryPrice]);
    this.canvasService.drawText(form[this.key.Time], this.config[this.key.Time]);
    this.canvasService.drawText(form[this.key.Referral], this.config[this.key.Referral]);
    this.qr$.next(form[this.key.Referral]);
  }

  private getSellValue(): SellEnum {
    console.log(this.lang, this.form[this.key.Sell]);
    return {
      [CardLanguage.En]: {
        [SellEnum.LongEn]: SellEnum.LongEn,
        [SellEnum.ShortEn]: SellEnum.ShortEn
      },
      [CardLanguage.Ru]: {
        [SellEnum.LongEn]: SellEnum.Long,
        [SellEnum.ShortEn]: SellEnum.Short,
      }
    }[this.lang][this.form.value[this.key.Sell]];
  }
}
