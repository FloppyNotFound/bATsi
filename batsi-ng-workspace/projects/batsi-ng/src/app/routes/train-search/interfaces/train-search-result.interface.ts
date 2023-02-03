import { TrainInfoResponse } from 'batsi-models';
import { TrainQueryData } from './train-query-data.interface';

export interface TrainSearchResult {
  query: TrainQueryData;
  response: TrainInfoResponse;
}
