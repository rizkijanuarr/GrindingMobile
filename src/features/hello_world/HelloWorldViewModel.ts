import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { UiState } from '../../core/common/UiState';
import { helloWorldRepository } from './HelloWorldRepository';
import type { HelloWorldResponse } from './HelloWorldModel';
import React from 'react';

export const HelloWorldViewModel = () => {
    const [helloWorldState, setHelloWorldState] = useState<UiState<HelloWorldResponse>>(
        UiState.idle(),
    );

    const fetchHelloWorld = useCallback(async () => {
        setHelloWorldState(UiState.loading());
        try {
            const data = await helloWorldRepository.getHelloWorld();
            setHelloWorldState(UiState.success(data));
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
            setHelloWorldState(UiState.error(message));
        }
    }, []);

    // Auto-refresh saat screen focus (seperti onResume di Kotlin)
    useFocusEffect(
        React.useCallback(() => {
            fetchHelloWorld();
            return () => { };
        }, [fetchHelloWorld]),
    );

    return {
        helloWorldState,
        fetchHelloWorld,
    };
};
