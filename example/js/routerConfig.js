import main from '../pages/main';

const routes = [{
  title: 'Global 全局',
  state: 'main',
  url: '/main',
  ...main,
}];

function flatten(routes, level) {
  let flattenRoutes = [];
  if (!level) {
    level = 0;
  }

  routes.forEach((route) => {
    flattenRoutes.push(route);
    route.level = level;
    flattenRoutes = flattenRoutes.concat(flatten(route.routes || [], ++level));
  });

  return flattenRoutes;
}

module.exports = flatten(routes);
