import $ from 'jquery';

const name = 'requestService';

angular.module(name, []).factory('$request', requestService);

requestService.$inject = ['$message', '$q', '$http', '$timeout',
  '$modal', 'loginService', '$loading',
];

function requestService($message, $q, $http, $timeout, $modal, loginService, $loading) {
  return {
    get: function(url, data, config) {
      var defaultConfig = {
        method: 'GET'
      };

      $.extend(true, defaultConfig, config);

      return this.request(url, data, defaultConfig);
    },
    post: function(url, data, config) {
      var defaultConfig = {
        method: 'POST'
      };

      $.extend(true, defaultConfig, config);

      return this.request(url, data, defaultConfig);
    },
    request: function(url, data, config) {
      var deferred = $q.defer();

      // 错误弹窗 false 为不提示
      var errorTip = config.errorTip !== false;

      // 绑定元素
      var el = config.el;

      // get请求是否缓存
      var cache = config.cache === true;

      // 请求超时时间
      var timeout = config.timeout || 30000;

      // 多久出现加载中遮罩 false 为都不出现
      var loadingDelay = !config.loadingDelay && config.loadingDelay !== 0 && config.loadingDelay !==
        false ? 2000 : config.loadingDelay;
      var loadingText = config.loadingText || '';
      var loadingDelaySt = null;
      var loadingShow = false;

      if (el) {
        if ($(el).hasClass('disabled-http-request')) {
          $timeout(function() {
            deferred.reject();
          });
          return deferred.promise;
        }
        $(el).addClass('disabled-http-request');
      }

      if (loadingDelay !== false) {
        loadingDelaySt = $timeout(function() {
          $loading.show(loadingText);
          loadingShow = true;
        }, loadingDelay);
      }

      $http({
        method: config.method,
        url: url,
        data: config.method == 'POST' ? data : null,
        params: config.method == 'GET' ? data : null,
        timeout: timeout,
        cache: config.method == 'GET' ? cache : false
      }).then(function(data) {
        if (el) {
          $timeout(function() {
            $(el).removeClass('disabled-http-request');
          }, 300);
        }

        if (loadingShow) {
          $loading.hide();
          loadingShow = false;
        }
        $timeout.cancel(loadingDelaySt);

        deferred.resolve(data.data);
      }, function(data) {
        if (el) {
          $timeout(function() {
            $(el).removeClass('disabled-http-request');
          }, 300);
        }

        if (loadingShow) {
          $loading.hide();
          loadingShow = false;
        }
        $timeout.cancel(loadingDelaySt);

        // 未登录，跳到登录页面
        if (data.status === 403) {
          $modal.alert({
            content: '认证失败',
            okCallback() {
              loginService.logout();
            }
          });
        } else if (errorTip) {
          if (data.status === 400) {
            $message.danger(data.data.message || '未知错误');
          } else if (data.status === 404) {
            $message.danger('页面不存在');
          } else {
            // $message.danger(data || '未知错误');
          }
        }

        console.error(url, config.method, data);

        deferred.reject(data);
      });

      return deferred.promise;
    }
  };
}


export default name;
