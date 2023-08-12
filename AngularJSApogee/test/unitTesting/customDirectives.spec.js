describe('routingConfig', function () {
    var $rootScope, $route, $httpBackend, $location,$compile;
    beforeEach(module('mail'));

    beforeEach(inject(function (_$route_, _$rootScope_, _$httpBackend_, _$location_,_$compile_) {
        $rootScope = _$rootScope_;
        $route = _$route_;
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        $compile = _$compile_;

    }));
    it('Testing headNav Custome Directive should return URL of an HTML template', function () {
        $httpBackend.expectGET('app/mailBox/mailBox.html').respond(200);
        $rootScope.$digest();

        $httpBackend.expectGET('app/templates/headNav.html').respond(200);

        var element = $compile("<head-Nav></head-Nav>")($rootScope);
        $rootScope.$digest();
        $httpBackend.flush();
    });
    it('Testing sideNav Custome Directive should return URL of an HTML template', function () {
        $httpBackend.expectGET('app/mailBox/mailBox.html').respond(200);
        $rootScope.$digest();

        $httpBackend.expectGET('app/templates/sideNav.html').respond(200);
        var element = $compile("<side-Nav></side-Nav>")($rootScope);
        $rootScope.$digest();
        $httpBackend.flush();
    });

})