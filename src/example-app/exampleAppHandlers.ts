import { 
  APIGatewayProxyEvent, 
  APIGatewayProxyHandler, 
  APIGatewayProxyResult } 
from "aws-lambda";

import {
  container, 
  TYPES } 
from "../container/inversify.config";

import HelloWorld from "./hello-world/helloWorld";

export const helloWorld: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent,
  ): Promise<APIGatewayProxyResult> => {
    const lambda = container.get<HelloWorld>(
      TYPES.HelloWorld,
    );
  
    return lambda.handler(event);
};