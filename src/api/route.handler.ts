import type { NextResponse, NextRequest } from 'next/server';

// HttpMethod is a type that represents the HTTP methods that can be used in a request: 'GET', 'POST', 'PUT', 'DELETE'.
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

//RouteHandler is a type that represents a function that takes a request and a response object and doesn't return anything. This is a typical pattern for server-side functions in Node.js and Next.js.
type RouteHandler = (req: NextRequest, res: NextResponse) => void;

//The RouteHandler function is an asynchronous function that takes an object as an argument. This object can have keys that are HTTP methods ('GET', 'POST', 'PUT', 'DELETE') and values that are functions of type RouteHandler. If no handlers are provided, it throws an error.
const RouteHandler = async (handlers: {[K in HttpMethod]?: RouteHandler}) => {
  if (!handlers) throw new Error(`No handlers provided, or ${handlers} is not allowed`);

  return handlers;
};

export default RouteHandler;

//his utility can be used to handle different HTTP methods in a Next.js serverless function in a structured way.
