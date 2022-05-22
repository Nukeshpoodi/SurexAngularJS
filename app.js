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
        const removeNumericOneIfStrStartsWith = (text) => {
           var text = (text.startsWith("1")) ? text.substring(1, text.length) : text;
           ngModelCtrl.$setViewValue(text);
           ngModelCtrl.$render();
           return text;
        }
        const removeNonNumericChars = (text) => {
            if (text) {
                var numeric = text.replace(/[^0-9]/g, '');
                numeric = (numeric.length > 10) ? numeric.substring(0, 10) : numeric;
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
        ngModelCtrl.$parsers.push(removeNumericOneIfStrStartsWith);
        ngModelCtrl.$parsers.push(removeNonNumericChars);
        ngModelCtrl.$parsers.push(parsePhoneNum);
        //$formatters for formatting the model value if the value is populated from the constroller
        ngModelCtrl.$formatters.push(caPhNumFormatter);
      },
    };
  });


   

