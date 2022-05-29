import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, map, Subject, takeUntil, tap } from 'rxjs';
import { CanvasService } from '../../services/canvas.service';
import { Card1KeyEnum } from '../../enums/card1-key.enum';
import { CARD1_CONFIG } from '../../constants/card1.config';
import { CLIENTS } from '../../constants/clients.const';

@Component({
  selector: 'app-total-pnl-card',
  templateUrl: './total-pnl-card.component.html',
  styleUrls: ['./total-pnl-card.component.scss']
})
export class TotalPnlCardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('card') card: HTMLDivElement;
  @ViewChild('canvas') canvasRef: ElementRef;
  canvas: HTMLCanvasElement;
  form = new FormGroup({
    [Card1KeyEnum.StartDate]: new FormControl(''),
    [Card1KeyEnum.EndDate]: new FormControl(''),
    [Card1KeyEnum.Value]: new FormControl(''),
    [Card1KeyEnum.Referral]: new FormControl(''),
  })

  img: any = new Image();
  KEYS = Card1KeyEnum;
  CLIENTS = CLIENTS;

  private qr$ = new BehaviorSubject<string>(null);
  private qrImg: any = new Image();
  private destroy$ = new Subject<void>()

  constructor(
    private canvasService: CanvasService
  ) {}

  ngOnInit(): void {
    this.qrImg = new Image()
    this.qrImg.onload = () => {
      this.setQr();
    }
    this.form.valueChanges
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(form => {
        this.resetImg();
        this.canvasService.drawText(`${form[Card1KeyEnum.Value]}%`, CARD1_CONFIG[Card1KeyEnum.Value]);
        this.canvasService.drawText(`${form[Card1KeyEnum.StartDate]} - ${form[Card1KeyEnum.EndDate]}`, CARD1_CONFIG[Card1KeyEnum.StartDate]);
        this.canvasService.drawText(`${form[Card1KeyEnum.Referral]}`, CARD1_CONFIG[Card1KeyEnum.Referral]);
        this.qr$.next(form[Card1KeyEnum.Referral]);
      });

    this.qr$.pipe(
      filter(Boolean),
      tap(() => this.setQr()),
      distinctUntilChanged(),
      map(qr => `assets/img/${qr}.png`),
      takeUntil(this.destroy$),
    ).subscribe(qr => {
      this.qrImg.src = qr;
    })
  }

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.canvasService.initContext(this.canvas.getContext('2d'));
    this.setImg();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  private setImg(): void {
    this.img = new Image();
    this.img.src = `assets/img/card1Background1.png`;
    this.img.onload = () => {
      this.canvas.width = this.img.width;
      this.canvas.height = this.img.height;
      this.resetImg();
    }
  }

  private resetImg(): void {
    this.canvasService.drawImage(this.img, 0, 0);
  }

  private setQr(): void {
    this.canvasService.drawImage(this.qrImg, 66, 781, 160, 160);
  }

}
