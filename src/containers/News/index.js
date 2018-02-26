import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./News'),
  loading: () => null,
});
