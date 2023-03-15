import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Card6KeyEnum } from '../../enums/card6-key.enum';
import { BackgroundEnum } from '../../enums/background.enum';
import { CARD6_CONFIG } from '../../constants/card6.config';
import { Subject, takeUntil } from 'rxjs';
import { CanvasService } from '../../services/canvas.service';
import { CARD6_CONFIG_BLACK } from '../../constants/card6black.config';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, AfterViewInit {
  @ViewChild('mirror') imgRef: ElementRef;
  canvas: HTMLCanvasElement;
  form = new FormGroup({
    [Card6KeyEnum.Balance]: new FormControl('0'),
    [Card6KeyEnum.Margin]: new FormControl('0'),
    [Card6KeyEnum.Wallet]: new FormControl('0'),
    [Card6KeyEnum.Pnl]: new FormControl('0'),
    [Card6KeyEnum.Background]: new FormControl(BackgroundEnum.Card6Background1),
  })

  config = CARD6_CONFIG;

  imgSrc: any = BackgroundEnum.Card6Background1;
  keys = Card6KeyEnum;
  backgrounds = [
    {
      label: 'Background 1',
      value: BackgroundEnum.Card6Background1,
    },
    {
      label: 'Background 2',
      value: BackgroundEnum.Card6Background2,
    }
  ]

  private canvasBackgroundImg = new Image();
  private destroy$ = new Subject<void>()

  constructor(
    private canvasService: CanvasService
  ) {}

  ngOnInit(): void {
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
        if (form[Card6KeyEnum.Background] === this.canvasBackgroundImg.src) {
          this.resetBackground();
          this.drawForm();
          this.setImg();
        } else {
          this.config = form[Card6KeyEnum.Background] === BackgroundEnum.Card6Background1 ? CARD6_CONFIG : CARD6_CONFIG_BLACK;
          this.canvasBackgroundImg.src = form[Card6KeyEnum.Background];
        }
      });
  }

  ngAfterViewInit(): void {
    this.canvas = document.createElement('canvas');
    this.canvasService.initContext(this.canvas);
    this.canvasBackgroundImg.src = BackgroundEnum.Card6Background1;
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
    this.canvasService.drawAccountLine(
      form[Card6KeyEnum.Balance],
      this.config === CARD6_CONFIG,
    );
    this.canvasService.drawText(`${form[Card6KeyEnum.Margin]} USD`, this.config[Card6KeyEnum.Margin]);
    this.canvasService.drawText(`${form[Card6KeyEnum.Wallet]} USD`, this.config[Card6KeyEnum.Wallet]);
    this.canvasService.drawText(`${form[Card6KeyEnum.Pnl]} USD`, this.config[Card6KeyEnum.Pnl]);
    this.canvasService.drawText(`≈ $${(+form[Card6KeyEnum.Margin]).toFixed(2)}`, this.config[Card6KeyEnum.MarginAvg]);
    this.canvasService.drawText(`≈ $${(+form[Card6KeyEnum.Wallet]).toFixed(2)}`, this.config[Card6KeyEnum.WalletAvg]);
    this.canvasService.drawText(`≈ $${(+form[Card6KeyEnum.Pnl]).toFixed(2)}`, this.config[Card6KeyEnum.PnlAvg]);
  }
}
