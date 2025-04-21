export * from './stations.service';
import { StationsService } from './stations.service';
export * from './train.service';
import { TrainService } from './train.service';
export const APIS = [StationsService, TrainService];
