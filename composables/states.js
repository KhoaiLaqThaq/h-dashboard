export const useColor = () => useState('color', () => 'pink');
export const useCounter = () => useState('counter', () => Math.round(Math.random() * 1000));
