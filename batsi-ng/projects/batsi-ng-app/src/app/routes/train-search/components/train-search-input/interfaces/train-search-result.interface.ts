import { TrainInfoResponse } from 'batsi-ng-models';
import { TrainQueryData } from './train-query-data.interface';

export interface TrainSearchResult {
  query: TrainQueryData;
  response: TrainInfoResponse;
}
