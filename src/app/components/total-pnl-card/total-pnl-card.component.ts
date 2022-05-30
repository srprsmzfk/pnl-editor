import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { filter, map, Subject, takeUntil, tap } from 'rxjs';
import { CanvasService } from '../../services/canvas.service';
import { Card1KeyEnum } from '../../enums/card1-key.enum';
import { CARD1_CONFIG } from '../../constants/card1.config';
import { CLIENTS } from '../../constants/clients.const';
import { BackgroundEnum } from '../../enums/background.enum';

@Component({
  selector: 'app-total-pnl-card',
  templateUrl: './total-pnl-card.component.html',
  styleUrls: ['./total-pnl-card.component.scss']
})
export class TotalPnlCardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mirror') imgRef: ElementRef;
  canvas: HTMLCanvasElement;
  form = new FormGroup({
    [Card1KeyEnum.StartDate]: new FormControl(''),
    [Card1KeyEnum.EndDate]: new FormControl(''),
    [Card1KeyEnum.Value]: new FormControl(''),
    [Card1KeyEnum.Referral]: new FormControl(''),
  })

  img: HTMLImageElement;
  imgSrc: any = BackgroundEnum.Card1;
  canvasBackground: any;
  KEYS = Card1KeyEnum;
  CLIENTS = CLIENTS;

  private qr$ = new Subject<string>();
  private qrImg: any = new Image();
  private destroy$ = new Subject<void>()

  constructor(
    private canvasService: CanvasService
  ) {}

  ngOnInit(): void {
    this.qrImg = new Image()
    this.qrImg.onload = () => {
      this.setQr();
      this.setImg();
    }
    this.form.valueChanges
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(form => {
        this.resetBackground();
        this.canvasService.drawText(`${form[Card1KeyEnum.Value]}%`, CARD1_CONFIG[Card1KeyEnum.Value]);
        this.canvasService.drawText(`${form[Card1KeyEnum.StartDate]} - ${form[Card1KeyEnum.EndDate]}`, CARD1_CONFIG[Card1KeyEnum.StartDate]);
        this.canvasService.drawText(`${form[Card1KeyEnum.Referral]}`, CARD1_CONFIG[Card1KeyEnum.Referral]);
        this.qr$.next(form[Card1KeyEnum.Referral]);
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
    this.img = this.imgRef.nativeElement;
    this.canvas = document.createElement('canvas');
    this.canvasService.initContext(this.canvas.getContext('2d'));
    this.setBackground();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  private setBackground(): void {
    this.canvasBackground = new Image();
    this.canvasBackground.src = BackgroundEnum.Card1;
    this.canvasBackground.onload = () => {
      this.canvas.width = this.canvasBackground.width;
      this.canvas.height = this.canvasBackground.height;
      this.resetBackground();
    }
  }

  private resetBackground(): void {
    this.canvasService.drawImage(this.canvasBackground, 0, 0);
  }

  private setQr(): void {
    this.canvasService
      .drawImage(this.qrImg, CARD1_CONFIG[Card1KeyEnum.Qr].x, CARD1_CONFIG[Card1KeyEnum.Qr].y, 160, 160);
    this.setImg();
  }

  private setImg(): void {
    this.imgSrc = this.canvas.toDataURL('image/png');
  }
}
