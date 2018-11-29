app.directive("crBootstrapDatepicker", function () {
    return {
        restrict: "EAC",
        require: "ngModel",
        scope: {
            ngModel: "=",
            startDate: "=",
            endDate: "="
        },
        link: function (scope, elem, attr) {
            $(elem).datepicker({
                weekStart: 6,
                //daysOfWeekDisabled: "5",
                calendarWeeks: true,
                todayBtn: 'linked',
                todayHighlight: true,
                autoclose: true,
                startDate: scope.startDate,
                endDate: scope.endDate,
                format: 'yyyy/mm/dd'
            }).on("changeDate", function (e) {
                return scope.$apply(function () {
                    return scope.ngModel = e.format();
                });
            });

            return scope.$watch("ngModel", function (newValue) {
                $(elem).datepicker("update", newValue);
            });
        }
    };
});
app.directive("datepicker", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (dateText) {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(dateText);
                });
            };
            var options = {
                dateFormat: "yy/mm/dd",
                changeMonth: true,
                changeYear: true,
                onSelect: function (dateText) {
                    updateModel(dateText);
                }
            };
            elem.datepicker(options);
        }
    }
});
app.directive('isNumberWithDecimal', function () {
    return {
        restrict: "EAC",
        require: "ngModel",
        scope: {
            "ngModel": "="
        },
        link: function (scope) {
            scope.$watch('ngModel', function (newValue, oldValue) {
                if (angular.isUndefined(newValue))
                    scope.ngModel = "";
                else {
                    var arr = String(newValue).split("");
                    if (arr.length === 0) return;
                    if (arr.length === 1 && (arr[0] === '.')) return;
                    if (arr.length === 2 && newValue === '.') return;
                    if (isNaN(newValue)) {
                        scope.ngModel = oldValue;
                    }
                }                
            });
        }
    };
});
app.directive("decimals", function ($filter) {
    return {
        restrict: "A", // Only usable as an attribute of another HTML element
        require: "?ngModel",
        scope: {
            decimals: "@",
            decimalPoint: "@"
        },
        link: function (scope, element, attr, ngModel) {
            var decimalCount = parseInt(scope.decimals) || 2;
            var decimalPoint = scope.decimalPoint || ".";

            // Run when the model is first rendered and when the model is changed from code
            ngModel.$render = function () {
                if (ngModel.$modelValue != null && ngModel.$modelValue >= 0) {
                    if (typeof decimalCount === "number") {
                        element.val(ngModel.$modelValue.toFixed(decimalCount).toString().replace(".", ","));
                    } else {
                        element.val(ngModel.$modelValue.toString().replace(".", ","));
                    }
                }
            }

            // Run when the view value changes - after each keypress
            // The returned value is then written to the model
            ngModel.$parsers.unshift(function (newValue) {
                if (typeof decimalCount === "number") {
                    var floatValue = parseFloat(newValue.replace(",", "."));
                    if (decimalCount === 0) {
                        return parseInt(floatValue);
                    }
                    return parseFloat(floatValue.toFixed(decimalCount));
                }

                return parseFloat(newValue.replace(",", "."));
            });

            // Formats the displayed value when the input field loses focus
            element.on("change", function (e) {
                var floatValue = parseFloat(element.val().replace(",", "."));
                if (!isNaN(floatValue) && typeof decimalCount === "number") {
                    if (decimalCount === 0) {
                        element.val(parseInt(floatValue));
                    } else {
                        var strValue = floatValue.toFixed(decimalCount);
                        element.val(strValue.replace(".", decimalPoint));
                    }
                }
            });
        }
    }
});
function countDecimalPlaces(value) {
    var decimalPos = String(value).indexOf('.');
    if (decimalPos === -1) {
        return 0;
    } else {
        return String(value).length - decimalPos - 1;
    }
}
app.directive('sbPrecision', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attributes, ngModel) {
            var precision = attributes.sbPrecision;

            function setPrecision() {
                var value = ngModel.$modelValue;

                //since this is just a mask, don't hide decimal values that
                //go beyond our precision and don't format empty values
                if (value && !isNaN(value) && countDecimalPlaces(value) <= precision) {
                    var formatted = Number(value).toFixed(precision);
                    ngModel.$viewValue = formatted;
                    ngModel.$render();
                }
            }

            element.bind('blur', setPrecision);
            setTimeout(setPrecision, 0); //after initial page render
        }

    };
})

app.directive('sbNumber', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attributes, ngModel) {

            function validateNumber(value) {
                var validity = !isNaN(value);
                ngModel.$setValidity('number', validity)
                return value;
            }

            ngModel.$parsers.push(validateNumber);
            ngModel.$formatters.push(validateNumber);
        }

    };
})
app.directive('sbMin', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attributes, ngModel) {

            function minimum(value) {
                if (!isNaN(value)) {
                    var validity = Number(value) >= attributes.sbMin;
                    ngModel.$setValidity('min-value', validity)
                }
                return value;
            }

            ngModel.$parsers.push(minimum);
            ngModel.$formatters.push(minimum);
        }

    };
})

app.directive('sbMax', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attributes, ngModel) {


            function maximum(value) {
                if (!isNaN(value)) {
                    var validity = Number(value) <= attributes.sbMax;
                    ngModel.$setValidity('max-value', validity);
                }

                return value;
            }

            ngModel.$parsers.push(maximum);
            ngModel.$formatters.push(maximum);
        }

    };
})
app.directive('sbMaxPrecision', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            "ngModel": "="
        },
        link: function (scope, element, attributes, ngModel) {
            scope.$watch('ngModel', function (newValue, oldValue) {
                if (!isNaN(newValue)) {
                    var validity = countDecimalPlaces(newValue) <= attributes.sbMaxPrecision;
                    if (!validity)
                        scope.ngModel = oldValue
                }
            });
            //function maxPrecision(value) {
            //    if (!isNaN(value)) {
            //        var validity = countDecimalPlaces(value) <= attributes.sbMaxPrecision;
            //        ngModel.$setValidity('max-precision', validity);
            //    }

            //    return value;
            //}

            //ngModel.$parsers.push(maxPrecision);
            //ngModel.$formatters.push(maxPrecision);
        }

    };
})

app.directive('isNumber', function () {
    return {
        restrict: "EAC",
        require: "ngModel",
        scope: {
            "ngModel": "="
        },
        link: function (scope) {
            scope.$watch('ngModel', function (newValue, oldValue) {
                if (angular.isUndefined(newValue)) {
                    scope.ngModel = "";
                    return;
                }
                else {
                    var arr = String(newValue).split("");
                    if (_.contains(arr, '.')) {
                        scope.ngModel = oldValue;
                        return;
                    }                    
                    if (arr.length === 1 && (arr[0] === '.')) {
                        scope.ngModel = oldValue;
                        return;
                    }
                    if (arr.length === 2 && newValue === '.') {
                        scope.ngModel = oldValue;
                        return;
                    }
                    if (angular.isNumber(newValue)) return;
                    if (isNaN(newValue)) {
                        scope.ngModel = oldValue;
                    }
                }
            });
        }
    };
});
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter, { 'event': event });
                });

                event.preventDefault();
            }
        });
    };
});
app.directive('numericOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {

            modelCtrl.$parsers.push(function (inputValue) {
                var transformedInput = inputValue ? inputValue.replace(/[^\d.-]/g, '') : null;

                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});
app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
app.directive('autoFocus', ['$timeout', function ($timeout) {
    return {
        restrict: 'AC',
        link: function (_scope, _element) {
            $timeout(function () {
                _element[0].focus();
            }, 0);
        }
    };
}]);
app.directive('focusMe', function ($timeout) {
    return {
        scope: { trigger: '=focusMe' },
        link: function (scope, element) {
            scope.$watch('trigger', function (value) {
                if (value === true) {
                    element[0].focus();
                    scope.trigger = false;
                }
            });
        }
    };
});

app.directive('fileModel', function () {
    return {
        scope: {
            local: "=attr1"
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    if (element[0].files) {
                        //scope.files.length = 0;

                        //angular.forEach(element[0].files, function (f) {
                        //    scope.files.push(f);
                        //});

                        //scope.hasFiles = true;
                        scope.local = element[0].files[0];
                        // scope.attr1 = {Name: 'Sm' };
                        //console.log(scope.Files);
                        //console.log(scope.local);
                    }

                    // scope.fileModel = changeEvent.target.files[0];
                    // or all selected files:
                    // scope.fileread = changeEvent.target.files;
                });
            });
        }
    }

});

(function () {
    'use strict';
    var directiveId = 'ngMatch';
    app.directive(directiveId, ['$parse', function ($parse) {

        var directive = {
            link: link,
            restrict: 'A',
            require: '?ngModel'
        };
        return directive;

        function link(scope, elem, attrs, ctrl) {
            // if ngModel is not defined, we don't need to do anything
            if (!ctrl) return;
            if (!attrs[directiveId]) return;

            var firstPassword = $parse(attrs[directiveId]);

            var validator = function (value) {
                var temp = firstPassword(scope),
                    v = value === temp;
                ctrl.$setValidity('match', v);
                return value;
            };

            ctrl.$parsers.unshift(validator);
            ctrl.$formatters.push(validator);
            attrs.$observe(directiveId, function () {
                validator(ctrl.$viewValue);
            });

        }
    }]);
})();
app.directive('modal', function () {
    return {
        template: '<div class="modal fade">' +
            '<div class="modal-dialog">' +
              '<div class="modal-content">' +
                '<div class="modal-header">' +
                  '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                  '<h4 class="modal-title">{{ title }}</h4>' +
                '</div>' +
                '<div class="modal-body" ng-transclude></div>' +
              '</div>' +
            '</div>' +
          '</div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});
app.filter('decimal', function (input, scope) {

    return function () {

        return input.toFixed(2);

    }

})

