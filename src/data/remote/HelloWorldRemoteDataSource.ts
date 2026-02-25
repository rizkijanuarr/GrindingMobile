// Remote Data Source: tempat panggil API beneran
// Pakai Service layer untuk define endpoint

import type {HelloWorldResponse} from '../../domain/model/HelloWorldModel';
import {HelloWorldService} from '../services/HelloWorldService';

export class HelloWorldRemoteDataSource {
  async getHelloWorld(): Promise<HelloWorldResponse> {
    return HelloWorldService.getHelloWorld();
  }
}
