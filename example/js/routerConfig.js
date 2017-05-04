const routes = [];

function flatten(routes, parentRoute) {
  let flattenRoutes = [];
  routes.forEach((route) => {
    flattenRoutes.push(route);
    flattenRoutes = flattenRoutes.concat(flatten(route.routes || [], route));
  });

  return flattenRoutes;
}

module.exports = flatten(routes);
