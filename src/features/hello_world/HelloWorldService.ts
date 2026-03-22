// HelloWorldService: definisi API endpoint
// Serupa Retrofit interface Kotlin

import { networkModule } from '../../core/network/NetworkModule';
import type { HelloWorldResponse } from './HelloWorldModel';

export const HelloWorldService = {
    getHelloWorld: (): Promise<HelloWorldResponse> => {
        return networkModule.request<HelloWorldResponse>(
            '/field-officer/mobile/v1/agronomist/team',
        );
    },
};
