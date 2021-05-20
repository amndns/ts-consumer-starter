import 'reflect-metadata';

jest.mock('axios', () => ({
  post: () => Promise.resolve({ response: { status: 200 } }),
}));
