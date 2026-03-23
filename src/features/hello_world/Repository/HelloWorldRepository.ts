import { type HelloWorldResponse, HelloWorldService } from '..';

class HelloWorldRepository {
    async getHelloWorld(): Promise<HelloWorldResponse> {
        return HelloWorldService.getHelloWorld();
    }
}

// Singleton instance (menggantikan RepositoryModule DI)
export const helloWorldRepository = new HelloWorldRepository();
