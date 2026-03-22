import type { HelloWorldResponse } from './HelloWorldModel';
import { HelloWorldService } from './HelloWorldService';

class HelloWorldRepository {
    async getHelloWorld(): Promise<HelloWorldResponse> {
        return HelloWorldService.getHelloWorld();
    }
}

// Singleton instance (menggantikan RepositoryModule DI)
export const helloWorldRepository = new HelloWorldRepository();
