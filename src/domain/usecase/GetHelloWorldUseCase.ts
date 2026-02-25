// UseCase: satu aksi bisnis yang spesifik
// UseCase cuma depend ke Repository INTERFACE (bukan implementasi)
// Ini yang di-consume sama ViewModel

import type {HelloWorldResponse} from '../model/HelloWorldModel';
import type {HelloWorldRepository} from '../repository/HelloWorldRepository';

export class GetHelloWorldUseCase {
  private repository: HelloWorldRepository;

  constructor(repository: HelloWorldRepository) {
    this.repository = repository;
  }

  async execute(): Promise<HelloWorldResponse> {
    return this.repository.getHelloWorld();
  }
}
