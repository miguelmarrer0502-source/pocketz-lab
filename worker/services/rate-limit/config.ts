export enum RateLimitStore {
	KV = 'kv',
	RATE_LIMITER = 'rate_limiter',
	DURABLE_OBJECT = 'durable_object',
}

export interface RateLimitConfigBase {
	enabled: boolean;
	store: RateLimitStore;
}

export interface KVRateLimitConfig extends RateLimitConfigBase {
	store: RateLimitStore.KV;
	limit: number;
	period: number;
	burst?: number;
	burstWindow?: number;
	bucketSize?: number;
}

export interface RLRateLimitConfig extends RateLimitConfigBase {
	store: RateLimitStore.RATE_LIMITER;
	bindingName: string;
}

export interface DORateLimitConfig extends RateLimitConfigBase {
	store: RateLimitStore.DURABLE_OBJECT;
	limit: number;
	period: number;
	burst?: number;
	burstWindow?: number;
	bucketSize?: number;
	dailyLimit?: number;
}

export type LLMCallsRateLimitConfig = (DORateLimitConfig) & {
	excludeBYOKUsers: boolean;
};

export type RateLimitConfig =
	| RLRateLimitConfig
	| KVRateLimitConfig
	| DORateLimitConfig
	| LLMCallsRateLimitConfig;

export enum RateLimitType {
	API_RATE_LIMIT = 'apiRateLimit',
	AUTH_RATE_LIMIT = 'authRateLimit',
	APP_CREATION = 'appCreation',
	LLM_CALLS = 'llmCalls',
}

export interface RateLimitSettings {
	[RateLimitType.API_RATE_LIMIT]: RLRateLimitConfig;
	[RateLimitType.AUTH_RATE_LIMIT]: RLRateLimitConfig;
	[RateLimitType.APP_CREATION]: DORateLimitConfig | KVRateLimitConfig;
	[RateLimitType.LLM_CALLS]: LLMCallsRateLimitConfig;
}

export const DEFAULT_RATE_LIMIT_SETTINGS: RateLimitSettings = {
	apiRateLimit: {
		enabled: true,
		store: RateLimitStore.RATE_LIMITER,
		bindingName: 'API_RATE_LIMITER',
	},
	authRateLimit: {
		enabled: true,
		store: RateLimitStore.RATE_LIMITER,
		bindingName: 'AUTH_RATE_LIMITER',
	},
	appCreation: {
		enabled: false,
		store: RateLimitStore.DURABLE_OBJECT,
		limit: 3,
		dailyLimit: 3,
		period: 24 * 60 * 60,
	},
	llmCalls: {
		enabled: false,
		store: RateLimitStore.DURABLE_OBJECT,
		limit: 250,
		period: 24 * 60 * 60,
		dailyLimit: 250,
		excludeBYOKUsers: true,
	},
};