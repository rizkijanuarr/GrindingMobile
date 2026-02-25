// Repository Implementation: implementasi KONKRIT dari domain interface
// Di sinilah data layer ketemu domain layer
// Bisa combine remote + local cache, transform data, dll

import type {HelloWorldRepository} from '../../domain/repository/HelloWorldRepository';
import type {HelloWorldResponse} from '../../domain/model/HelloWorldModel';
import {HelloWorldRemoteDataSource} from '../remote/HelloWorldRemoteDataSource';

export class HelloWorldRepositoryImpl implements HelloWorldRepository {
  private remoteDataSource: HelloWorldRemoteDataSource;

  constructor() {
    this.remoteDataSource = new HelloWorldRemoteDataSource();
  }

  async getHelloWorld(): Promise<HelloWorldResponse> {
    // Nanti bisa tambah logic: cek cache dulu, baru hit API
    return this.remoteDataSource.getHelloWorld();
  }
}
