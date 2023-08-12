describe('mailBoxController', function () {
    var $rootScope, $httpBackend, $location, $controller, mailFactory;
    beforeEach(module('mail'));

    beforeEach(inject(function (_$rootScope_, _$location_, _$controller_, _$httpBackend_, _mailFactory_) {
        $rootScope = _$rootScope_;
        $location = _$location_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        mailFactory = _mailFactory_;
    }));
    var sdObj = {
        data: [
            {
                _id: '12541sss0cg',
                "header": {
                    "from": "newaccount@webnxg.com",
                    "date": "22/02/2018",
                    "to": "draft2@newmail.com",
                    "cc": "new4@webnxg.com new7@webnxg.com",
                    "bcc": "new@webnxg.com new2@webnxg.com",
                    "subject": "draft 2"
                },
                "messageBody": "draft message2"
            },
            {
                _id: '12541cccss0cg',
                "header": {
                    "from": "newaccount@webnxg.com",
                    "date": "22/02/2018",
                    "to": "draft2@newmail.com",
                    "cc": "new4@webnxg.com new7@webnxg.com",
                    "bcc": "new@webnxg.com new2@webnxg.com",
                    "subject": "draft 4"
                },
                "messageBody": "fghfghfgc dfgsdfvg dfgfdgf"
            }
        ]
    };
    var sdObj2 = {
        data: [
            {
                _id: 'jshajdh2',
                "header": {
                    "from": "newaccnt@webnxg.com",
                    "date": "22/02/2018",
                    "to": "draft2@newmail.com",
                    "cc": "new4@webnxg.com new7@webnxg.com",
                    "bcc": "new@webnxg.com new2@webnxg.com",
                    "subject": "oiihasdasiofoadisofj 2"
                },
                "messageBody": "draft message2"
            },
            {
                _id: 'jkdbf3458',
                "header": {
                    "from": "newaccnt@webnxg.com",
                    "date": "22/02/2018",
                    "to": "draft2@newmail.com",
                    "cc": "new4@webnxg.com new7@webnxg.com",
                    "bcc": "new@webnxg.com new2@webnxg.com",
                    "subject": "sdsdsdsd 4"
                },
                "messageBody": "fghfghfgc dfgsdfvg dfgfdgf"
            }
        ]
    };
    it("setTitle function should initalize value to the variable titleType based on the mailType", function () {

        var $scope = $rootScope.$new();
        var controller = $controller('mailBoxController', { $scope: $scope, $routeParams: { boxValue: "inbox" } });
        $scope.mailType = "inbox";
        expect($scope.titleType).toEqual("Inbox");
        controller = $controller('mailBoxController', { $scope: $scope, $routeParams: { boxValue: "draft" } });

        $scope.mailType = "draft";
        expect($scope.titleType).toEqual("Draft");
        controller = $controller('mailBoxController', { $scope: $scope, $routeParams: { boxValue: "sent" } });

        $scope.mailType = "sent";
        expect($scope.titleType).toEqual("Sent Mail");
    });


    it('readMailList function should call mailFactory.getInbox function ', function () {
        var $scope = $rootScope.$new();
        var controller = $controller('mailBoxController', { $scope: $scope, $routeParams: { boxValue: "inbox" } });
        var spy = spyOn(mailFactory, "getInbox").and.returnValue(Promise.resolve(sdObj));
        $scope.readMailList();
        expect(spy).toHaveBeenCalled();
    });

    it('readMailList function should call mailFactory.getDraftMsg function ', function () {
        var $scope = $rootScope.$new();
        var controller = $controller('mailBoxController', { $scope: $scope, $routeParams: { boxValue: "draft" } });
        var spy = spyOn(mailFactory, "getDraftMsg").and.returnValue(Promise.resolve(sdObj));
        $scope.readMailList();
        expect(spy).toHaveBeenCalled();
    });


    it('readMailList function should call mailFactory.getSentMsg function ', function () {
        var $scope = $rootScope.$new();
        var controller = $controller('mailBoxController', { $scope: $scope, $routeParams: { boxValue: "sent" } });
        var spy = spyOn(mailFactory, "getSentMsg").and.returnValue(Promise.resolve(sdObj));
        $scope.readMailList();
        expect(spy).toHaveBeenCalled();
    });


    it('Test1 readMailList function should assign response data to mailBox ', function (done) {
        var $scope = $rootScope.$new();
        var controller = $controller('mailBoxController', { $scope: $scope, $routeParams: { boxValue: "inbox" } });
        var spy = spyOn(mailFactory, "getInbox").and.returnValue(Promise.resolve(sdObj));
        $scope.readMailList();
        expect(spy).toHaveBeenCalled();
        mailFactory.getInbox().then(function (res) {
            expect($scope.mailBox).toEqual(sdObj.data);
            done();
        });
    });

    it('Test2 readMailList function should assign response data to mailBox ', function (done) {
        var $scope = $rootScope.$new();
        var controller = $controller('mailBoxController', { $scope: $scope, $routeParams: { boxValue: "draft" } });
        var spy = spyOn(mailFactory, "getDraftMsg").and.returnValue(Promise.resolve(sdObj));
        $scope.readMailList();
        expect(spy).toHaveBeenCalled();
        mailFactory.getDraftMsg().then(function (res) {
            expect($scope.mailBox).toEqual(sdObj.data);
            done();
        });
    });


    it('Test3 readMailList function should assign response data to mailBox ', function (done) {
        var $scope = $rootScope.$new();
        var controller = $controller('mailBoxController', { $scope: $scope, $routeParams: { boxValue: "sent" } });
        var spy = spyOn(mailFactory, "getSentMsg").and.returnValue(Promise.resolve(sdObj));
        $scope.readMailList();
        expect(spy).toHaveBeenCalled();
        mailFactory.getSentMsg().then(function (res) {
            expect($scope.mailBox).toEqual(sdObj.data);
            done();
        });
    });


    it('Test4 readMailList function should assign response data to mailBox ', function (done) {
        var $scope = $rootScope.$new();
        var controller = $controller('mailBoxController', { $scope: $scope, $routeParams: { boxValue: "inbox" } });
        var spy = spyOn(mailFactory, "getInbox").and.returnValue(Promise.resolve(sdObj2));
        $scope.readMailList();
        expect(spy).toHaveBeenCalled();
        mailFactory.getInbox().then(function (res) {
            expect($scope.mailBox).toEqual(sdObj2.data);
            done();
        });
    });

    it('Test5 readMailList function should assign response data to mailBox ', function (done) {
        var $scope = $rootScope.$new();
        var controller = $controller('mailBoxController', { $scope: $scope, $routeParams: { boxValue: "draft" } });
        var spy = spyOn(mailFactory, "getDraftMsg").and.returnValue(Promise.resolve(sdObj2));
        $scope.readMailList();
        expect(spy).toHaveBeenCalled();
        mailFactory.getDraftMsg().then(function (res) {
            expect($scope.mailBox).toEqual(sdObj2.data);
            done();
        });
    });


    it('Test6 readMailList function should assign response data to mailBox ', function (done) {
        var $scope = $rootScope.$new();
        var controller = $controller('mailBoxController', { $scope: $scope, $routeParams: { boxValue: "sent" } });
        var spy = spyOn(mailFactory, "getSentMsg").and.returnValue(Promise.resolve(sdObj2));
        $scope.readMailList();
        expect(spy).toHaveBeenCalled();
        mailFactory.getSentMsg().then(function (res) {
            expect($scope.mailBox).toEqual(sdObj2.data);
            done();
        });
    });

    it("showEmail should route to mailEditor page if mailType is draft", function () {
        $httpBackend.expectGET('app/mailEditor/mailEditor.html').respond(200);
        var $scope = $rootScope.$new();
        var controller = $controller('mailBoxController', { $scope: $scope, $routeParams: { boxValue: "inbox" } });
        $scope.mailType = "draft";
        var spy = spyOn($location, "path");
        $scope.showEmail(1);
        expect(spy).toHaveBeenCalledWith("mailEditor/1");
    });

    it("showEmail should route to mailBoxInfo page if mailType is inbox", function () {
        $httpBackend.expectGET('app/mailBoxInfo/mailBoxInfo.html').respond(200);
        var $scope = $rootScope.$new();
        var controller = $controller('mailBoxController', { $scope: $scope, $routeParams: { boxValue: "inbox" } });
        $scope.mailType = "inbox";
        var spy = spyOn($location, "path");
        $scope.showEmail(1);
        expect(spy).toHaveBeenCalledWith("mailBox/inbox/mailBoxInfo/1");
    });

    it("showEmail should route to mailBoxInfo page if mailType is sent", function () {
        $httpBackend.expectGET('app/mailBoxInfo/mailBoxInfo.html').respond(200);
        var $scope = $rootScope.$new();
        var controller = $controller('mailBoxController', { $scope: $scope, $routeParams: { boxValue: "inbox" } });
        $scope.mailType = "sent";
        var spy = spyOn($location, "path");
        $scope.showEmail(1);
        expect(spy).toHaveBeenCalledWith("mailBox/sent/mailBoxInfo/1");
    });
    it('deleteMessage function should call mailFactory.deleteMail function ', function () {
        var $scope = $rootScope.$new();
        var controller = $controller('mailBoxController', { $scope: $scope, $routeParams: { boxValue: "inbox" } });
        var spy = spyOn(mailFactory, "deleteEmail").and.returnValue(Promise.resolve(200));
        var msgId = 1;
        $scope.mailType = "inbox";

        $scope.deleteMessage(msgId);
        expect(spy).toHaveBeenCalledWith(msgId);
    });
    it("deleteMessage function should call readMailList after deleting mail", function (done) {
        var $scope = $rootScope.$new();
        var controller = $controller('mailBoxController', { $scope: $scope, $routeParams: { boxValue: "inbox" } });
        spyOn(mailFactory, "deleteEmail").and.returnValue(Promise.resolve(200));
        var spy = spyOn($scope, "readMailList");
        $scope.messageId = 'sdsds23';
        $scope.deleteMessage();
        mailFactory.deleteEmail('sdsds23').then(function (res) {
            expect(spy).toHaveBeenCalled();
            done();
        });
    });
});