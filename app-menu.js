//var app = angular.module("UNDSS", ['ui.bootstrap', 'AxelSoft', 'angucomplete-alt']);
app.controller('menuController', ['$http', function ($http) {
    var vm = this;
    vm.SiteMenu = [];
    $http.get(appConfig.HostApiUrl + '/Home/GetSiteMenu').then(function (data) {
        vm.SiteMenu = data.data;
        console.log(vm.SiteMenu);
    }, function (error) {
        alert('Error');
    })
}]);
$("ul.tab_item_own li:first-child,.tab_item_content_own div.tab-pane:first-child").addClass("active");
$(".tab_item_content_own div.tab-pane:first-child").addClass("in");

//var picker = new Pikaday({
//    field: document.getElementById('dtContactFrom'),
//    firstDay: 6,
//    format: "DD/MM/YYYY",
//    minDate: new Date('1930-01-01'),
//    maxDate: new Date('2050-12-31'),
//    yearRange: [1930, 2050],
//    theme: 'blue-theme'
//});
//var pickerDob = new Pikaday({
//    field: document.getElementById('dtDOB'),
//    firstDay: 6,
//    format: "DD/MM/YYYY",
//    minDate: new Date('1930-01-01'),
//    maxDate: new Date('2050-12-31'),
//    yearRange: [1930, 2050],
//    theme: 'blue-theme'
//});
//var pickercontValidtill = new Pikaday({
//    field: document.getElementById('dtContactValidTill'),
//    firstDay: 6,
//    format: "DD/MM/YYYY",
//    minDate: new Date('1930-01-01'),
//    maxDate: new Date('2050-12-31'),
//    yearRange: [1930, 2050],
//    theme: 'blue-theme'
//});
//var pickerIntPassValidTill = new Pikaday({
//    field: document.getElementById('dtIntPassValidTill'),
//    firstDay: 6,
//    format: "DD/MM/YYYY",
//    minDate: new Date('1930-01-01'),
//    maxDate: new Date('2050-12-31'),
//    yearRange: [1930, 2050],
//    theme: 'blue-theme'
//});
//var pickerUnplValidTill = new Pikaday({
//    field: document.getElementById('dtUnplValidTill'),
//    firstDay: 6,
//    format: "DD/MM/YYYY",
//    minDate: new Date('1930-01-01'),
//    maxDate: new Date('2050-12-31'),
//    yearRange: [1930, 2050],
//    theme: 'blue-theme'
//});
//var pickerNatioPassValidTill = new Pikaday({
//    field: document.getElementById('dtNatioPassValidTill'),
//    firstDay: 6,
//    format: "DD/MM/YYYY",
//    minDate: new Date('1930-01-01'),
//    maxDate: new Date('2050-12-31'),
//    yearRange: [1930, 2050],
//    theme: 'blue-theme'
//});
//var pickerIntDrivLiValidTill = new Pikaday({
//    field: document.getElementById('dtIntDrivLiValidTill'),
//    firstDay: 6,
//    format: "DD/MM/YYYY",
//    minDate: new Date('1930-01-01'),
//    maxDate: new Date('2050-12-31'),
//    yearRange: [1930, 2050],
//    theme: 'blue-theme'
//});
//var pickerNationDrivLiValidTill = new Pikaday({
//    field: document.getElementById('dtNationDrivLiValidTill'),
//    firstDay: 6,
//    format: "DD/MM/YYYY",
//    minDate: new Date('1930-01-01'),
//    maxDate: new Date('2050-12-31'),
//    yearRange: [1930, 2050],
//    theme: 'blue-theme'
//});
//var pickerIDCardIssu = new Pikaday({
//    field: document.getElementById('dtIDCardIssue'),
//    firstDay: 6,
//    format: "DD/MM/YYYY",
//    minDate: new Date('1930-01-01'),
//    maxDate: new Date('2050-12-31'),
//    yearRange: [1930, 2050],
//    theme: 'blue-theme'
//});
//var pickerIDCardExpier = new Pikaday({
//    field: document.getElementById('dtIDCardExpier'),
//    firstDay: 6,
//    format: "DD/MM/YYYY",
//    minDate: new Date('1930-01-01'),
//    maxDate: new Date('2050-12-31'),
//    yearRange: [1930, 2050],
//    theme: 'blue-theme'
//});

