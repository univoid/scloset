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
    /* o.filter = function() { */
    /*     return $http.post('/filter', ) */
    /* } */
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
        $scope.color = null;
    };
}])


