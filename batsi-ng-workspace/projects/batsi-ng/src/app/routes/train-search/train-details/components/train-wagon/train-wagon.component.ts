import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TrainWagonsInner } from 'batsi-models';

@Component({
  selector: 'batsi-ng-train-wagon',
  templateUrl: './train-wagon.component.html',
  styleUrls: ['./train-wagon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainWagonComponent {
  @Input() wagon: TrainWagonsInner | undefined;

  @Input() loadRatio: number | undefined;
}
