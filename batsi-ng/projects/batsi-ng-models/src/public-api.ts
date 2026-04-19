/*
 * Public API Surface of batsi-ng-models
 */

export * from './lib/typescript-client/index';
export { createClient, provideHeyApiClient } from './lib/typescript-client/client/client.gen';

// Type aliases for backward compatibility
import type { TrainInfoResponse } from './lib/typescript-client/types.gen';
export type TrainWagonsInner = NonNullable<NonNullable<TrainInfoResponse['train']>['wagons']>[number];
