describe('mailEditorController', function () {
    var $rootScope, $httpBackend, $location, $controller, $window, mailFactory;
    var $scope;
    var controller;
    beforeEach(module('mail'));

    beforeEach(inject(function (_$rootScope_, _$location_, _$controller_, _$window_, _$httpBackend_, _mailFactory_) {
        $rootScope = _$rootScope_;
        $location = _$location_;
        $controller = _$controller_;
        $window = _$window_;
        $httpBackend = _$httpBackend_;
        mailFactory = _mailFactory_;
    }));
    beforeEach(function () {
        $scope = $rootScope.$new();
        controller = $controller('mailEditorController', { $scope: $scope });
        var baseTime = new Date(2019, 2, 22);
        jasmine.clock().mockDate(baseTime);
    });
    it("goBack function should call $window to go back", function () {
        var spy = spyOn($window.history, "back");
        $scope.goBack();
        expect(spy).toHaveBeenCalled();
    });



    it("Test1 getMailInfo should call mailFactory.getMailInfo function if mailId>0", function () {
        var spy = spyOn(mailFactory, "getMailInfo").and.returnValue(Promise.resolve({
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
        }));
        $scope.mailId = '12541sss0cg';
        $scope.getMailInfo();
        expect(spy).toHaveBeenCalledWith($scope.mailId);
    });
    it("Test2 getMailInfo should call mailFactory.getMailInfo function if mailId>0", function (done) {
        controller = $controller('mailEditorController', { $scope: $scope, $routeParams: { mailId: "12541sss0cg" } });
        var spy = spyOn(mailFactory, "getMailInfo").and.returnValue(Promise.resolve({
            data: {
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
            }
        }));
        var dsd = {
            "to": "draft2@newmail.com",
            "cc": "new4@webnxg.com new7@webnxg.com",
            "bcc": "new@webnxg.com new2@webnxg.com",
            "subject": "draft 2",
            "messageBody": "draft message2"
        }

        $scope.getMailInfo();
        mailFactory.getMailInfo().then(function (res) {
            expect($scope.formDataObj).toEqual(dsd);
            done();
        });
        expect(spy).toHaveBeenCalledWith('12541sss0cg');
    });

    it("Test3 getMailInfo should call mailFactory.getMailInfo function if mailId>0", function (done) {
        controller = $controller('mailEditorController', { $scope: $scope, $routeParams: { mailId: "12541ss0cg" } });

        var spy = spyOn(mailFactory, "getMailInfo").and.returnValue(Promise.resolve({
            data: {
                _id: '12541ss0cg',
                "header": {
                    "from": "newaccount@webnxg.com",
                    "date": "22/02/2018",
                    "to": "draf55t2@newmail.com",
                    "cc": "new4@webnxg.com new7@webnxg.com",
                    "bcc": "new@webnxg.com new2@webnxg.com",
                    "subject": "draft draf55t2"
                },
                "messageBody": "draft message2"
            }
        }));
        var dsd = {
            "to": "draf55t2@newmail.com",
            "cc": "new4@webnxg.com new7@webnxg.com",
            "bcc": "new@webnxg.com new2@webnxg.com",
            "subject": "draft draf55t2",
            "messageBody": "draft message2"
        }

        $scope.getMailInfo();
        mailFactory.getMailInfo().then(function (res) {
            expect($scope.formDataObj).toEqual(dsd);
            done();

        });
        expect(spy).toHaveBeenCalledWith('12541ss0cg');
    });

    it("getMailInfo should not call mailFactory.getMailInfo function when $scope.mailId<0", function () {
        controller = $controller('mailEditorController', { $scope: $scope, $routeParams: { mailId: "-1" } });
        var spy = spyOn(mailFactory, "getMailInfo").and.returnValue(Promise.resolve(200));
        spy.calls.reset();
        $scope.getMailInfo();
        expect(spy).not.toHaveBeenCalled();
    });

    it("Test1.0 send function should call mailFactory.sendMail()", function () {

        controller = $controller('mailEditorController', { $scope: $scope, $routeParams: { mailId: "-1" } });
        var spy = spyOn(mailFactory, "sendMail").and.returnValue(Promise.resolve(200));
        spyOn($scope, "getCurrentDate").and.returnValue("22/02/2019");
        $scope.formDataObj.to = "sent2@newmail.com";
        $scope.formDataObj.cc = "test@gha.com teshh2@gjnkasd.com";
        $scope.formDataObj.bcc = "testrbcc@webnxg.com";
        $scope.formDataObj.subject = "welcome";
        $scope.formDataObj.messageBody = "new mail";
        $scope.send();
        expect(spy).toHaveBeenCalledWith({
            "header": {
                "from": "newaccount@webnxg.com",
                "date": "22/02/2019",
                "to": "sent2@newmail.com",
                "cc": "test@gha.com teshh2@gjnkasd.com",
                "bcc": "testrbcc@webnxg.com",
                "subject": "welcome"
            },
            "messageBody": "new mail"
        });
    });
    it("Test1.1 send function should call mailFactory.sendMail()", function () {
        controller = $controller('mailEditorController', { $scope: $scope, $routeParams: { mailId: "-1" } });

        var spy = spyOn(mailFactory, "sendMail").and.returnValue(Promise.resolve(200));
        spyOn($scope, "getCurrentDate").and.returnValue("22/02/2019");
        $scope.formDataObj.to = "send2@webnxg.com";
        $scope.formDataObj.cc = "testh@a.com teshh@webnxg.com";
        $scope.formDataObj.bcc = "testrbcc@webnxg.com";
        $scope.formDataObj.subject = "welcome sd";
        $scope.formDataObj.messageBody = "new mail webnxg";
        $scope.send();
        expect(spy).toHaveBeenCalledWith({
            "header": {
                "from": "newaccount@webnxg.com",
                "date": "22/02/2019",
                "to": "send2@webnxg.com",
                "cc": "testh@a.com teshh@webnxg.com",
                "bcc": "testrbcc@webnxg.com",
                "subject": "welcome sd"
            },
            "messageBody": "new mail webnxg"
        });
    });
    it("Test2.0 send function should call mailFactory.sendMail()", function () {
        controller = $controller('mailEditorController', { $scope: $scope, $routeParams: { mailId: "554251ss" } });

        var spy = spyOn(mailFactory, "sendMail").and.returnValue(Promise.resolve(200));
        spyOn($scope, "getCurrentDate").and.returnValue("22/02/2019");
        $scope.formDataObj.to = "send2@webnxg.com";
        $scope.formDataObj.cc = "testh@a.com teshh@webnxg.com";
        $scope.formDataObj.bcc = "testrbcc@webnxg.com";
        $scope.formDataObj.subject = "welcome sd";
        $scope.formDataObj.messageBody = "new mail webnxg";
        $scope.send();
        expect(spy).toHaveBeenCalledWith({
            _id: "554251ss",
            "header": {
                "from": "newaccount@webnxg.com",
                "date": "22/02/2019",
                "to": "send2@webnxg.com",
                "cc": "testh@a.com teshh@webnxg.com",
                "bcc": "testrbcc@webnxg.com",
                "subject": "welcome sd"
            },
            "messageBody": "new mail webnxg"
        });
    });


    it("Test2.0 send function should call goBack after sent", function (done) {
        controller = $controller('mailEditorController', { $scope: $scope, $routeParams: { mailId: "554251ss" } });

        var spy = spyOn(mailFactory, "sendMail").and.returnValue(Promise.resolve(200));
        spyOn($scope, "getCurrentDate").and.returnValue("22/02/2019");
        $scope.formDataObj.to = "send2@webnxg.com";
        $scope.formDataObj.cc = "testh@a.com teshh@webnxg.com";
        $scope.formDataObj.bcc = "testrbcc@webnxg.com";
        $scope.formDataObj.subject = "weddbnxg sd";
        $scope.formDataObj.messageBody = "new mail weddbnxg";
        var ps = spyOn($scope, 'goBack');
        $scope.send();
        var v = {
            _id: "554251ss",
            "header": {
                "from": "newaccount@webnxg.com",
                "date": "22/02/2019",
                "to": "send2@webnxg.com",
                "cc": "testh@a.com teshh@webnxg.com",
                "bcc": "testrbcc@webnxg.com",
                "subject": "weddbnxg sd"
            },
            "messageBody": "new mail weddbnxg"
        };
        expect(spy).toHaveBeenCalledWith(v);
        mailFactory.sendMail(v).then(function (res) {
            expect(ps).toHaveBeenCalled();
            done();
        });
    });

    it("Test1 saveDraft function should call mailFactory.saveDraft() if message id = -1", function () {
        controller = $controller('mailEditorController', { $scope: $scope, $routeParams: { mailId: "-1" } });

        spyOn($scope, "getCurrentDate").and.returnValue("22/02/2019");
        var spy = spyOn(mailFactory, "saveDraft").and.returnValue(Promise.resolve(true));
        $scope.formDataObj.to = "send2@webnxg.com";
        $scope.formDataObj.cc = "testh@a.com teshh@webnxg.com";
        $scope.formDataObj.bcc = "testrbcc@webnxg.com";
        $scope.formDataObj.subject = "weddbnxg sd";
        $scope.formDataObj.messageBody = "new mail weddbnxg";
        $scope.saveDraft();
        var v = {
            "header": {
                "from": "newaccount@webnxg.com",
                "date": "22/02/2019",
                "to": "send2@webnxg.com",
                "cc": "testh@a.com teshh@webnxg.com",
                "bcc": "testrbcc@webnxg.com",
                "subject": "weddbnxg sd"
            },
            "messageBody": "new mail weddbnxg"
        };
        expect(spy).toHaveBeenCalledWith(v);
    });


    it("Test2 saveDraft function should call mailFactory.saveDraft() if message id != -1", function () {
        controller = $controller('mailEditorController', { $scope: $scope, $routeParams: { mailId: "sdsdcvbvs22" } });

        spyOn($scope, "getCurrentDate").and.returnValue("22/02/2019");
        var spy = spyOn(mailFactory, "saveDraft").and.returnValue(Promise.resolve(true));
        $scope.formDataObj.to = "send2@webnxg.com";
        $scope.formDataObj.cc = "testh@a.com teshh@webnxg.com";
        $scope.formDataObj.bcc = "cccccc@webnxg.com";
        $scope.formDataObj.subject = "ddddd sd";
        $scope.formDataObj.messageBody = "new weddbnxg";
        $scope.saveDraft();
        var v = {
            _id: 'sdsdcvbvs22',
            "header": {
                "from": "newaccount@webnxg.com",
                "date": "22/02/2019",
                "to": "send2@webnxg.com",
                "cc": "testh@a.com teshh@webnxg.com",
                "bcc": "cccccc@webnxg.com",
                "subject": "ddddd sd"
            },
            "messageBody": "new weddbnxg"
        };
        expect(spy).toHaveBeenCalledWith(v);
    });

    it("Test3 saveDraft function should call goBack after saving draft", function (done) {
        controller = $controller('mailEditorController', { $scope: $scope, $routeParams: { mailId: "-1" } });

        spyOn($scope, "getCurrentDate").and.returnValue("22/02/2019");
        var spy = spyOn(mailFactory, "saveDraft").and.returnValue(Promise.resolve(true));
        $scope.formDataObj.to = "send2@webnxg.com";
        $scope.formDataObj.cc = "testh@a.com teshh@webnxg.com";
        $scope.formDataObj.bcc = "ccccc@webnxg.com";
        $scope.formDataObj.subject = "weddbnxg sd";
        $scope.formDataObj.messageBody = "new mail weddbnxg";
        var ps = spyOn($scope, 'goBack');

        $scope.saveDraft();
        var v = {
            "header": {
                "from": "newaccount@webnxg.com",
                "date": "22/02/2019",
                "to": "send2@webnxg.com",
                "cc": "testh@a.com teshh@webnxg.com",
                "bcc": "ccccc@webnxg.com",
                "subject": "weddbnxg sd"
            },
            "messageBody": "new mail weddbnxg"
        };
        expect(spy).toHaveBeenCalledWith(v);
        mailFactory.saveDraft(v).then(function (res) {
            expect(ps).toHaveBeenCalled();
            done();
        });
    });


    it("Test1 deleteMessage function should call mailFactory.deleteEmail()", function () {
        controller = $controller('mailEditorController', { $scope: $scope, $routeParams: { mailId: "2sdsd" } });

        var spy = spyOn(mailFactory, "deleteEmail").and.returnValue(Promise.resolve(true));
        $scope.deleteMessage();
        expect(spy).toHaveBeenCalledWith('2sdsd');
    });
    it("Test2 deleteMessage function should call mailFactory.deleteEmail()", function () {
        controller = $controller('mailEditorController', { $scope: $scope, $routeParams: { mailId: "sdsdsdsd2" } });

        var spy = spyOn(mailFactory, "deleteEmail").and.returnValue(Promise.resolve(true));
        $scope.deleteMessage();
        expect(spy).toHaveBeenCalledWith('sdsdsdsd2');
    });

    it("Test3 deleteMessage function should goBack after deleting mail", function (done) {
        controller = $controller('mailEditorController', { $scope: $scope, $routeParams: { mailId: "sdsdsdsd2" } });

        var spy = spyOn(mailFactory, "deleteEmail").and.returnValue(Promise.resolve(true));
        var ps = spyOn($scope, 'goBack');

        $scope.deleteMessage();
        expect(spy).toHaveBeenCalledWith('sdsdsdsd2');

        mailFactory.deleteEmail('sdsdsdsd2').then(function (res) {
            expect(ps).toHaveBeenCalled();
            done();
        });
    });
});