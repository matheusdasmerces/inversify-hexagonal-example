import { DurableContext } from '@aws/durable-execution-sdk-js';

export interface DurableFunctionEvent {
  eventContexts: string[];
}

export interface DurableFunctionResponse {
  success: boolean;
  response?: any;
  error?: string;
  timestamp: string;
}

abstract class DurableParallelAbstractHandler {
  async handler(event: DurableFunctionEvent, context: DurableContext):
    Promise<DurableFunctionResponse> {
    try {
      const contextsToBeExecuted = event.eventContexts.map((eventContext) =>
        async (ctx: DurableContext) => {
          return await ctx.runInChildContext(eventContext, async (childCtx) => {
            return await this.execute(eventContext, childCtx)
          });
        },
      );


      const results = await context.parallel('execute-contexts-in-parallel', contextsToBeExecuted);

      console.log('Durable Function completed successfully');

      return {
        success: true,
        response: results,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      console.error('Durable Function failed:', error);

      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  protected abstract execute(event: any, childContext: DurableContext): Promise<any>;
}

export default DurableParallelAbstractHandler;
