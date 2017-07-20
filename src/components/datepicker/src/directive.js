import moduleName from './name.js';
import $ from 'jquery';
import moment from 'moment';
import maDatePickerTpl from './maDatePickerTpl.html';
import maDateRangePickerTpl from './maDateRangePickerTpl.html';

angular.module(moduleName)
  .directive('maDatePicker', maDatePicker)
  .directive('maDateRangePicker', maDateRangePicker);

maDatePicker.$inject = [];

function maDatePicker() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      view: '@maView',
      minView: '@maMinView',
      model: '=ngModel',
      format: '@maFormat',
      minDate: '=maMinDate',
      maxDate: '=maMaxDate',
      maPlaceholder: '@maPlaceholder',
    },
    template: maDatePickerTpl,
    controllerAs: '$ctrl',
    controller: ['$scope', function($scope) {
      $scope.clear = clear;
      $scope.changeValue = changeValue;

      function changeValue(modeName, date) {
        $scope.model = date;
      }

      function clear() {
        $scope.model = null;
      }
    }],
    link: function(scope, element, attrs, ctrl) {

    }
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
      const format = scope.format || 'YYYY-MM-DD';
      const seperator = '~';

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
          scope.dateRangePicker.clear();
        }
      });

      $(element).find('input').dateRangePicker(defaultConfig).bind('datepicker-change', function(
        evt, obj) {
        scope.model = [obj.date1, obj.date2];
        $timeout();
      });
      scope.dateRangePicker = $(element).find('input').data('dateRangePicker');
    }
  };
}
