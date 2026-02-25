// HelloWorldService: definisi API endpoints (mirip Retrofit interface di Kotlin)

import { networkModule } from '../../core/network/NetworkModule';
import type { HelloWorldResponse } from '../../domain/model/HelloWorldModel';

export const HelloWorldService = {
  getHelloWorld: (): Promise<HelloWorldResponse> => {
    return networkModule.request<HelloWorldResponse>(
      '/field-officer/mobile/v1/agronomist/team',
    );
  },
};
