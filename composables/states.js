export const useColor = () => useState('color', () => 'pink');
export const useCounter = () => useState('counter', () => Math.round(Math.random() * 1000));
export const useRouteActive = () => useState('routeActive', (routeName) => routeName);
