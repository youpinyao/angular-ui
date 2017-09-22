import moduleName from './name.js';
import $ from 'jquery';
import uuid from 'uuid/v4';
import debounce from 'debounce';
import moment from 'moment';
import maDatePickerTpl from './maDatePickerTpl.html';
import maDateRangePickerTpl from './maDateRangePickerTpl.html';

angular.module(moduleName)
  .directive('maDatePicker', maDatePicker)
  .directive('maDateRangePicker', maDateRangePicker);

maDatePicker.$inject = ['$filter'];

function maDatePicker($filter) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      view: '@maView',
      minView: '@maMinView',
      model: '=ngModel',
      format: '@maFormat',
      _minDate: '=maMinDate',
      _maxDate: '=maMaxDate',
      maPlaceholder: '@maPlaceholder',
      showClear: '@maClear',
      disabled: '=ngDisabled',
    },
    require: 'ngModel',
    template: maDatePickerTpl,
    controllerAs: '$ctrl',
    link: function(scope, element, attrs, ngModel) {
      const format = scope.format || 'YYYY-MM-DD HH:mm';
      const timezone = scope.timezone || false;
      const dateFilter = $filter('mFormat');

      function formatter(value) {
        if (angular.isNull(value)) {
          return undefined;
        }
        return dateFilter(value, format, timezone);
      }

      function parser(viewValue) {
        if (angular.isNull(viewValue)) {
          return undefined;
        }
        if (viewValue.length === format.length) {
          return viewValue;
        }
        return (viewValue.length === 0) ? viewValue : undefined;
      }
      ngModel.$formatters.push(formatter);
      ngModel.$parsers.unshift(parser);
    },
    controller: ['$scope', function($scope) {
      $scope.datePickerId = uuid();
      $scope.clear = clear;
      $scope.changeValue = changeValue;

      $scope.$watch('model', (d) => {
        $scope.dateModel = d;
        $scope.$broadcast('selectDate', d ? moment(d) : undefined, true);
      });

      $scope.$watch('_minDate', d => {
        $scope.$broadcast('clearPickerView');
        $scope.$broadcast('pickerUpdate', $scope.datePickerId, {
          minDate: d,
        });
      });

      $scope.$watch('_maxDate', d => {
        $scope.$broadcast('clearPickerView');
        $scope.$broadcast('pickerUpdate', $scope.datePickerId, {
          maxDate: d,
        });
      });


      function changeValue(modeName, date) {
        $scope.model = date;
      }

      function clear() {
        $scope.model = undefined;
      }
    }],
  };
}


maDateRangePicker.$inject = ['$timeout'];

function maDateRangePicker($timeout) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      model: '=ngModel',
      format: '@maFormat',
      config: '=maConfig',
      minDate: '=maMinDate',
      maxDate: '=maMaxDate',
      maPlaceholder: '@maPlaceholder',
      showClear: '@maClear',
      disabled: '=ngDisabled',
    },
    template: maDateRangePickerTpl,
    controllerAs: '$ctrl',
    controller: ['$scope', function($scope) {
      $scope.clear = clear;

      function clear() {
        $scope.dateRangePicker.clear();
      }
    }],
    link: function(scope, element, attrs, ctrl) {
      let format = scope.format || 'YYYY-MM-DD';
      const seperator = '~';
      const init = debounce(_init, 100);

      scope.$watch('$destroy', () => {
        if (scope.dateRangePicker) {
          scope.dateRangePicker.destroy();
          scope.dateRangePicker = null;
        }
      });

      scope.$watch('minDate', d => {
        init();
      });
      scope.$watch('maxDate', d => {
        init();
      });

      scope.$watch('model', d => {
        if (angular.isArray(d)) {
          scope.start = d[0];
          scope.end = d[1];
          scope.dateText =
            `${moment(scope.start).format(format)} ${seperator} ${moment(scope.end).format(format)}`;
        } else {
          scope.start = null;
          scope.end = null;
          scope.dateText = '';
          if (scope.dateRangePicker) {
            scope.dateRangePicker.clear();
          }
        }
      });

      function _init() {
        if (scope.dateRangePicker) {
          scope.dateRangePicker.destroy();
          scope.dateRangePicker = null;
        }

        const defaultConfig = $.extend(true, {
          showShortcuts: false,
          format,
          showTopbar: false,
          language: 'cn',
          seperator,
          startDate: scope.minDate || false,
          endDate: scope.maxDate || false,
          startOfWeek: 'monday',
          getValue() {
            if (scope.start && scope.end) {
              return `${moment(scope.start).format(format)} to ${moment(scope.end).format(format)}`;
            }
            return null;
          },
          setValue(data) {
            if (!data) {
              scope.start = null;
              scope.end = null;
              scope.model = null;
              scope.dateText = '';
              $timeout();
            }
          }
        }, scope.config || {});

        $(element).find('input').dateRangePicker(defaultConfig).bind('datepicker-change',
          function(
            evt, obj) {
            scope.model = [obj.date1, obj.date2];
            $timeout();
          });
        scope.dateRangePicker = $(element).find('input').data('dateRangePicker');
      }
    }
  };
}
