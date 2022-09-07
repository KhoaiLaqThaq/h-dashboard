export const useRouteActive = () => useState('routeActive', (routeName) => routeName);
export const useLayoutActive = () => useState('layout', (layoutActive) => layoutActive);
export const useToken = () => useState('token', (token) => token);
