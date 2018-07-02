import './index.scss';

import moment from 'moment';

import '../../../../js/lib/crypto1/crypto/crypto.js';
import '../../../../js/lib/crypto1/hmac/hmac.js';
import '../../../../js/lib/crypto1/sha1/sha1.js';

const controller = 'uploadCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$timeout', '$interval', '$utils'];

function mainCtrl($scope, $timeout, $interval, $utils) {
  $scope.uploadValue = [{
    id: 1,
    name: '666.jpg',
    url: 'http://inews.gtimg.com/newsapp_match/0/1467611934/0',
    progress: 50,
  }, {
    id: 2,
    name: '666.jpg',
    url: 'http://img1.0515yc.cn/material/news/img/640x/2016/11/20161129104030q4Px.gif',
    progress: 100,
  }, {
    id: 3,
    name: '666.pdf',
    url: 'http://inews.gtimg.com/newsapp_match/0/1467611934/0',
    progress: 100,
  }];

  const policyText = {
    expiration: moment().add('year', 5)._d.toISOString(), // 设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
    conditions: [
      ['content-length-range', 0, 1048576000] // 设置上传文件的大小限制
    ]
  };

  $scope.uploadConfig = {
    accept: 'image/gif,image/jpeg,image/bmp,image/jpg,image/png,image/svg,application/pdf',
    size: {
      gif: 0.5 * 1024 * 1024,
      png: 0.5 * 1024 * 1024,
      jpg: 0.5 * 1024 * 1024,
      pdf: 5 * 1024 * 1024
    },
  };

  const OSSAccessKeyId = 'IkOF7oy0XNr3Kbco';
  const accesskey = 'FDd6C9CK8xatXjuXYQNGm4QkbIMWiQ';
  const policy = $utils.Base64.encode(JSON.stringify(policyText));
  const bytes = Crypto.HMAC(Crypto.SHA1, policy, accesskey, { asBytes: true });
  const signature = Crypto.util.bytesToBase64(bytes);

  $scope.uploadConfigOss = {
    accept: 'image/gif,image/jpeg,image/bmp,image/jpg,image/png,image/svg,application/pdf,video/mp4',
    size: {
      gif: 0.5 * 1024 * 1024,
      png: 0.5 * 1024 * 1024,
      jpg: 0.5 * 1024 * 1024,
      pdf: 5 * 1024 * 1024,
      mp4: 50 * 1024 * 1024,
    },
    multiple: true,
    url: `${window.location.protocol}//wxleborn.oss-cn-shenzhen.aliyuncs.com`,
    ossConfig: {
      dir: 'upload',
      OSSAccessKeyId,
      signature,
      policy,
    },
  };

  $scope.codeText = require('./code.html');
}

export default {
  template: require('./index.html'),
  controller,
};
