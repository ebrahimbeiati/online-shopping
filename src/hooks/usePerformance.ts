'use client';

import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  componentMountTime: number;
  renderTime: number;
  interactionTime?: number;
}

export function usePerformance(componentName: string) {
  const mountTime = useRef<number>(Date.now());
  const renderTime = useRef<number>(0);
  const interactionTime = useRef<number>(0);

  useEffect(() => {
    const mountDuration = Date.now() - mountTime.current;
    
    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 ${componentName} mounted in ${mountDuration}ms`);
    }

    // In production, you could send this to analytics service
    // analytics.track('component_mount', { component: componentName, duration: mountDuration });

    return () => {
      const totalTime = Date.now() - mountTime.current;
      if (process.env.NODE_ENV === 'development') {
        console.log(`🔄 ${componentName} unmounted after ${totalTime}ms total`);
      }
    };
  }, [componentName]);

  const trackInteraction = (action: string) => {
    interactionTime.current = Date.now();
    if (process.env.NODE_ENV === 'development') {
      console.log(`👆 ${componentName} interaction: ${action}`);
    }
  };

  const trackRender = () => {
    renderTime.current = Date.now();
  };

  return {
    trackInteraction,
    trackRender,
    getMetrics: (): PerformanceMetrics => ({
      componentMountTime: mountTime.current,
      renderTime: renderTime.current,
      interactionTime: interactionTime.current,
    }),
  };
}
