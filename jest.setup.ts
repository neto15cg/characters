import '@testing-library/jest-dom';

require('jest-fetch-mock').enableMocks();

const react = document.createElement('div');
react.id = 'react';
react.style.height = '100vh';
document.body.appendChild(react);

(window as any).skipEventLoop = () => new Promise(resolve => setImmediate(resolve));

(window as any).requestAnimationFrame = (callback: () => void) => {
  setTimeout(callback, 0);
};

(window as any).matchMedia = () => ({
  addListener: () => undefined,
  matches: false,
  removeListener: () => undefined,
});

// eslint-disable-next-line
console.error = jest.fn((...args) => {
  const [error] = args;
  const skipMessages = [
    'Browser does not support SVG',
    "Content type isn't valid",
    'Could not convert the src',
    'Error parsing input',
    'Expected `%s` listener',
    'fetch is not a function',
    'Missing src',
    'Not found',
  ];

  if (!skipMessages.some(d => error.toString().includes(d))) {
    // consoleError(...(args as any));
  }
});
