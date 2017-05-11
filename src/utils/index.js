import $ from 'jquery';

const utils = {
  each,
  flattenRouter,
  isNull,
  isEmpty,
};

Object.assign(angular, utils);

export default utils;

function flattenRouter(routers, level, parent) {
  let flattenRoutes = [];
  routers = $.extend(true, [], routers);

  if (!level) {
    level = 1;
  } else {
    level++;
  }

  routers.forEach((router) => {
    flattenRoutes.push(router);

    router.level = level;
    router.parent = parent;

    if (router.routers && router.routers.length) {
      flattenRoutes = flattenRoutes.concat(this.flattenRouter(router.routers, level, router));
    }

    delete router.routers;
  });

  return flattenRoutes;
}

function isNull(value) {
  if (value === '' || value === undefined || value === null) {
    return true;
  }
  return false;
}

function isEmpty(data) {
  if (isNull(data)) {
    return true;
  }
  let count = 0;

  angular.forEach(data, function (d) {
    count++;
  });

  return count <= 0;
}

function each(data, callback) {
  if (data && typeof data === 'object') {
    if (!isNaN(data.length)) {
      data.forEach((v, k, f) => {
        callback.call(v, v, k, f);
      });
    } else {
      const items = Object.keys(data);
      each(items, v => {
        callback.call(data[v], data[v], v, data);
      });
    }
  }
}
