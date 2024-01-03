export declare function appendParamsToURL(baseUrl: string, params: Record<string, any>): string;
export declare function preconnect(url: string, rel?: 'preconnect' | 'prefetch' | 'preload'): boolean;
export declare function loadScript(src: string): Promise<void>;
export declare function getRequestCredentials(crossorigin?: string | null): RequestCredentials | undefined;
