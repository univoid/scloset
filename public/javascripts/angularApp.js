angular.module('scloset', ['ui.router'])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'MainCtrl',
            resolve: {
                postPromise: ['items', function(items){
                    return items.getAll();
                }]
            }
        })
        .state('items', {
            url: '/items',
            templateUrl: '/items.html',
            controller: 'MainCtrl',
        })
        .state('filter', {
            url: '/filter',
            templateUrl: '/filter.html',
            controller: 'MainCtrl',
        });
    $urlRouterProvider.otherwise('home');
}])

.factory('items', ['$http', function($http){
    var o = {
        items: [
        ]
    };
    o.getAll = function() {
        return $http.get('/allItems').success(function(data){
            angular.copy(data, o.items);
        });
    };
    o.create = function(item) {
        return $http.post('/addItem', item).success(function(data){
            o.items.push(data);
        });
    };
    o.filter = function(degree, weather, feeling, aim) {
        return $http.get('/filter',{params: {degree: degree, weather: weather, feeling: feeling, aim: aim}
        }).success(function(data){
            angular.copy(data, o.items);
        });
    };
    return o;
}])

.controller('MainCtrl', [
'$scope',
'items',
function($scope, items){
    $scope.items = items.items;
    $scope.addItem = function(){
        if(!$scope.name || $scope.name === '') { return; }
        items.create({
            name: $scope.name,
            warmth: $scope.warmth,
            pattern: $scope.pattern,
            r: $scope.r,
            g: $scope.g,
            b: $scope.b,
        });
        $scope.name = '';
        $scope.warmth = '';
        $scope.pattern = '';
        $scope.r = null;
        $scope.g = null;
        $scope.b = null;
    };
    $scope.filterItem = function(){
        items.filter($scope.degree, $scope.weather, $scope.feeling, $scope.aim);
    };
}])


