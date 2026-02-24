import { withDurableExecution, DurableContext } from '@aws/durable-execution-sdk-js';
import { container, TYPES } from '../container/inversify.config';

export const durableFunction = withDurableExecution(async (event: any, context: DurableContext):
  Promise<any> => {
  const useCase = container.get<any>(TYPES.DurableFunction);
  return useCase.handler(event, context);
});