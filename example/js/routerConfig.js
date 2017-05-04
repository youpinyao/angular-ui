import main from '../pages/main';

const routes = [{
  title: '首页',
  state: 'main',
  url: '/main',
  ...main,
}];

function flatten(routes, parentRoute) {
  let flattenRoutes = [];
  routes.forEach((route) => {
    flattenRoutes.push(route);
    flattenRoutes = flattenRoutes.concat(flatten(route.routes || [], route));
  });

  return flattenRoutes;
}

module.exports = flatten(routes);
