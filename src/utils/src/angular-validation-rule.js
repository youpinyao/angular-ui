import $ from 'jquery';

angular
  .module('validation.rule', [])
  .config(['$validationProvider', function($validationProvider) {
    let expression = {
      null: function() {
        return true;
      },
      required: function(value) {
        if (value && typeof value === 'object' && value.length === 0) {
          return false;
        }
        if (value === 0) {
          return true;
        }
        return !!value;
      },
      url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/,
      email: /^([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
      number: /^\d+$/,
      minlength: function(value, scope, element, attrs, param) {
        return value.length >= param;
      },
      maxlength: function(value, scope, element, attrs, param) {
        return value.length <= param;
      },
      phone: function(value, scope, element, attrs, param) {
        value += '';
        if (!value) {
          return false;
        }
        if (isNaN(value)) {
          return false;
        }
        // 固话 位数
        // 3 + 7
        // 3 + 8
        // 4 + 7
        // 4 + 8
        // 手机 位数
        // 11
        if (value.length !== 10 && value.length !== 11 && value.length !== 12) {
          return false;
        }

        return true;
      },
      zipcode: function(value, scope, element, attrs, param) {
        return /^[1-9]\d{5}$/g.test(value);
      },
      bankcard: function(value, scope, element, attrs, param) {
        return /^([1-9]{1})(\d{11}|\d{14}|\d{15}|\d{17}|\d{18}|\d{19})$/g.test(value);
      },
      // 比例
      ratio: function(value, scope, element, attrs, param) {
        return !value || (value >= 0 && /^[1-9]\d*$/.test(String(value)));
      },
      // 计数
      count: function(value, scope, element, attrs, param) {
        return !value || String(value) === '0' || /^[1-9]\d*$/.test(String(value));
      },
      // 金额
      currency: function(value, scope, element, attrs, param) {
        return !value || String(value) === '0' || /^[0-9]+(.[0-9]{1,2})?$/.test(String(
          value));
      },
      // 百分比
      percentage: function(value, scope, element, attrs, param) {
        return !value || String(value) === '0' || /^[0-9]+(.[0-9]{1,2})?$/.test(String(
          value));
      },
      // 自定义验证，param 是正则表达式
      custom: function(value, scope, element, attrs, param) {
        var regExp = new RegExp(param);
        return !value || regExp.test(String(value));
      },
      password(value) {
        if (value) {
          var pwdReg = /^[a-zA-Z0-9_!@#$%^&*]{6,16}$/;
          var num = /^[0-9]{1,9}$/;
          return pwdReg.test(value) && !num.test(value);
        }
        return false;
      },
      same(value, scope, element, attrs, param) {
        return value == scope.$eval(param);
      },
    };

    let errorMsgTemplate = function(element, attrs, param, msg) {
      if (attrs.invalidMessage) {
        return attrs.invalidMessage;
      }
      return msg;
    };

    let defaultMsg = {
      null: {
        error: function(element, attrs, param) {
          return errorMsgTemplate(element, attrs, param, 'OK');
        },
        success: 'OK'
      },
      phone: {
        error: function(element, attrs, param) {
          return errorMsgTemplate(element, attrs, param, '请输入正确的电话号码');
        },
        success: 'OK'
      },
      required: {
        error: function(element, attrs, param) {
          return errorMsgTemplate(element, attrs, param, '不能为空');
        },
        success: 'OK'
      },
      url: {
        error: function(element, attrs, param) {
          return errorMsgTemplate(element, attrs, param, '请输入URL链接');
        },
        success: 'OK'
      },
      email: {
        error: function(element, attrs, param) {
          return errorMsgTemplate(element, attrs, param, '请输入正确的邮箱地址');
        },
        success: 'OK'
      },
      number: {
        error: function(element, attrs, param) {
          return errorMsgTemplate(element, attrs, param, '请输入数字');
        },
        success: 'OK'
      },
      minlength: {
        error: function(element, attrs, param) {
          return errorMsgTemplate(element, attrs, param, '太长了');
        },
        success: 'OK'
      },
      maxlength: {
        error: function(element, attrs, param) {
          return errorMsgTemplate(element, attrs, param, '太短了');
        },
        success: 'OK'
      },
      zipcode: {
        error: function(element, attrs, param) {
          return errorMsgTemplate(element, attrs, param, '请输入正确的邮编');
        },
        success: 'OK'
      },
      bankcard: {
        error: function(element, attrs, param) {
          return errorMsgTemplate(element, attrs, param, '请输入正确的银行卡号');
        },
        success: 'OK'
      },
      ratio: {
        error: function(element, attrs, param) {
          return errorMsgTemplate(element, attrs, param, '请输入有效的比例数值');
        },
        success: 'OK',
      },
      count: {
        error: function(element, attrs, param) {
          return errorMsgTemplate(element, attrs, param, '请输入有效的计数数值');
        },
        success: 'OK',
      },
      currency: {
        error: function(element, attrs, param) {
          return errorMsgTemplate(element, attrs, param, '请输入有效的金额数值');
        },
        success: 'OK',
      },
      percentage: {
        error: function(element, attrs, param) {
          return errorMsgTemplate(element, attrs, param, '请输入有效的百分比数值');
        },
        success: 'OK',
      },
      custom: {
        error: function(element, attrs, param) {
          return errorMsgTemplate(element, attrs, param, '验证未通过');
        },
        success: 'OK',
      },
      password: {
        error: function(element, attrs, param) {
          return errorMsgTemplate(element, attrs, param, '长度为6-16个字符，不能包含空格，不能是9位以下纯数字');
        },
        success: 'OK'
      },
      same: {
        error: function(element, attrs, param) {
          return errorMsgTemplate(element, attrs, param, '内容不一致');
        },
        success: 'OK'
      },
    };
    $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);


    $validationProvider.showSuccessMessage = true; // or true(default)
    $validationProvider.showErrorMessage = true; // or true(default)

    $validationProvider.setErrorHTML(function(msg) {
      return '<b class="form-error-text">' + msg + '</b>';
    });
    $validationProvider.setSuccessHTML(function(msg) {
      return '<i></i>';
    });

    $.extend(true, $validationProvider, {
      validCallback: function(element) {
        // console.log(element, 'validCallback');
        element.addClass('ma-input-success').removeClass('ma-input-error');
      },
      invalidCallback: function(element) {
        // console.log(element, 'invalidCallback');
        element.removeClass('ma-input-success').addClass('ma-input-error');
      },
      resetCallback: function(element) {
        // console.log(element, 'resetCallback');
        element.removeClass('ma-input-success').removeClass('ma-input-error');
      }
    });
  }]);
