
describe('routingConfig', function () {
    var $rootScope, $route, $httpBackend, $location;
    beforeEach(module('mail'));

    beforeEach(inject(function (_$route_, _$rootScope_, _$httpBackend_, _$location_) {
        $rootScope = _$rootScope_;
        $route = _$route_;
        $httpBackend = _$httpBackend_;
        $location = _$location_;
    }));
    it("/ should route to mailBox.html", function () {
        $httpBackend.expectGET('app/mailBox/mailBox.html').respond(200);
        $location.path('/');
        $rootScope.$digest();
        expect($route.current.templateUrl).toBe('app/mailBox/mailBox.html');
        $httpBackend.flush();
    });
    it("/mailBox/inbox should route to mailBox.html", function () {
        expect($route.current).toBeUndefined();
        $httpBackend.expectGET('app/mailBox/mailBox.html').respond(200);
        $location.path('/mailBox/inbox');
        $rootScope.$digest();
        expect($route.current.templateUrl).toBe('app/mailBox/mailBox.html');
        $httpBackend.flush();
    });

    it("/mailBox/inbox/mailBoxInfo/1 should route to mailBoxInfo.html", function () {
        $httpBackend.expectGET('app/mailBoxInfo/mailBoxInfo.html').respond(200);
        $location.path('/mailBox/inbox/mailBoxInfo/1');
        $rootScope.$digest();
        expect($route.current.templateUrl).toBe('app/mailBoxInfo/mailBoxInfo.html');
        $httpBackend.flush();
    });
    it("/mailEditor/1 should route to mailEditor.html", function () {
        $httpBackend.expectGET('app/mailEditor/mailEditor.html').respond(200);
        $location.path('/mailEditor/1');
        $rootScope.$digest();
        expect($route.current.templateUrl).toBe('app/mailEditor/mailEditor.html');
        $httpBackend.flush();
    });
});