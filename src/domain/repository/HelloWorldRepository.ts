// Domain Repository: INTERFACE / kontrak
// Domain layer TIDAK TAU implementasinya gimana (API? Local DB? Hardcode?)
// Yang penting dia tau: "ada fungsi getHelloWorld yang return HelloWorldResponse"

import type {HelloWorldResponse} from '../model/HelloWorldModel';

export interface HelloWorldRepository {
  getHelloWorld(): Promise<HelloWorldResponse>;
}
