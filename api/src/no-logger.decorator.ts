import { SetMetadata } from '@nestjs/common';

export const NO_LOGGER_KEY = 'noLogger';
export const NoLogger = (...hiddenParams: string[]) => SetMetadata(NO_LOGGER_KEY, hiddenParams);
