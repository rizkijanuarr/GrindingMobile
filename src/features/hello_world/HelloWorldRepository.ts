// HelloWorldRepository: ambil data dari API
// RemoteDataSource + RepositoryImpl + interface digabung jadi satu
// Tidak perlu dipisah karena tidak ada logika cache / swap implementasi

import type { HelloWorldResponse } from './HelloWorldModel';
import { HelloWorldService } from './HelloWorldService';

class HelloWorldRepository {
    async getHelloWorld(): Promise<HelloWorldResponse> {
        return HelloWorldService.getHelloWorld();
    }
}

// Singleton instance (menggantikan RepositoryModule DI)
export const helloWorldRepository = new HelloWorldRepository();
