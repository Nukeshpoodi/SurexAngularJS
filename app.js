// @ts-ignore
var app = angular.module("surexApp", []);

app
  .controller("MyController", function ($scope) {
    $scope.phone = "2345678901";
  })
  .directive("canadaPhone", function () {
    return {
      restrict: "A",
      require: "ngModel",
      link: function (scope, element, attr, ngModelCtrl) {

        const removeNonNumericChars = (text) => {
            if (text) {
                var numeric = text.replace(/^1|[^0-9]/g, '').substring(0, 10);
                if (numeric !== text) {
                    ngModelCtrl.$setViewValue(numeric);
                    ngModelCtrl.$render();
                }
                return numeric;
            }
            return undefined;
        }    
        const caPhNumFormatter = (numeric) => {
            var format = numeric;
            if (numeric.length > 3)
              format = `(${numeric.substring(0,3)})${numeric.substring(3, 6)}`;

            if (numeric.length > 6) 
              format = `${format}-${numeric.substring(6, numeric.length)}`;
            
            return format;
        }

        const parsePhoneNum = (numeric) => {
            ngModelCtrl.$viewValue = caPhNumFormatter(numeric);
            ngModelCtrl.$render();
            return numeric;
        }

        ngModelCtrl.$parsers.push(removeNonNumericChars);
        ngModelCtrl.$parsers.push(parsePhoneNum);
        //$formatters for formatting the model value if the value is populated from the constroller
        ngModelCtrl.$formatters.push(caPhNumFormatter);
      },
    };
  }).directive('sampleDirective', function SampleDirective() {
    return {
      restrict: 'E',
      templateUrl: 'sample.html',
      scope: {
        ngModel: '='
      },
      require: '^?ngModel',
      link: function($scope) {
          // Watch expression
          $scope.$watch('sample', function(newValue, oldValue) {
          if (newValue !== oldValue) {
          console.log('Value has changed to: ' + newValue);
          }
        });
      },
    }
  });


  