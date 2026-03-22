import type { HelloWorldResponse } from './HelloWorldModel';

export const HelloWorldService = {
    getHelloWorld: (): Promise<HelloWorldResponse> => {
        // return networkModule.request<HelloWorldResponse>(
        //     '/field-officer/mobile/v1/agronomist/team',
        // );
        //
        // Karena ini hanya contoh (Boilerplate Dummy), kita kembalikan Mock Data
        // dengan simulasi delay 1.5 detik (seolah-olah sedang hit API beneran)
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: 1,
                    message: 'Halo, Selamat Datang di Boilerplate MVVM!',
                    timestamp: new Date().toISOString(),
                });
            }, 1500);
        });
    },
};
