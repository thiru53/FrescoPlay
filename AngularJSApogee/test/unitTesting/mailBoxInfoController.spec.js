describe('mailBoxInfoController', function () {
    var $rootScope, $httpBackend, $location, $controller, mailFactory, $window, spyGetmailInfo;
    var $scope, controller, spyG;

    beforeEach(module('mail'));

    beforeEach(inject(function (_$rootScope_, _$location_, _$controller_, _$httpBackend_, _mailFactory_, _$window_) {
        $rootScope = _$rootScope_;
        $location = _$location_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        mailFactory = _mailFactory_;
        $window = _$window_;
    }));

    beforeEach(function () {
        spyGetmailInfo =
        {
            _id: 'sdsds23',
            header: {
                from: "newAccount@webnxg.com",
                date: "22/02/2018",
                to: "newAccount@webnxg.com",
                cc: "new4@webnxg.com new7@webnxg.com",
                bcc: "new@webnxg.com new2@webnxg.com",
                subject: "subject new message"
            },
            messageBody: "msg3"

        };
        $scope = $rootScope.$new();
        controller = $controller('mailBoxInfoController', { $scope: $scope });
        spyG = spyOn(mailFactory, "getMailInfo").and.returnValue(Promise.resolve(spyGetmailInfo));

    });
    it("goBack function should call $window to go back", function () {
        var spy = spyOn($window.history, "back");
        $scope.goBack();
        expect(spy).toHaveBeenCalled();
    });

    it("Test1 getMailInfo should call mailFactory.getMailInfo", function () {
        controller = $controller('mailBoxInfoController', {
            $scope: $scope, $routeParams: {
                boxValue: "inbox", mailId: "sdsds23"
            }
        });
        $scope.getMailInfo();
        expect(spyG).toHaveBeenCalledWith('sdsds23');
        controller = $controller('mailBoxInfoController', {
            $scope: $scope, $routeParams: {
                boxValue: "inbox", mailId: "sds23cc"
            }
        });
        $scope.getMailInfo();
        expect(spyG).toHaveBeenCalledWith('sds23cc');
    });

    it("Test2 getMailInfo should call mailFactory.getMailInfo function if type is sent", function (done) {
        spyG.and.returnValue(Promise.resolve({
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
            "date": "22/02/2018",
            "cc": "new4@webnxg.com new7@webnxg.com",
            "bcc": "new@webnxg.com new2@webnxg.com",
            "subject": "draft 2",
            "messageBody": "draft message2"
        }
        controller = $controller('mailBoxInfoController', {
            $scope: $scope, $routeParams: {
                boxValue: "sent", mailId: "12541sss0cg"
            }
        });
        $scope.getMailInfo();
        mailFactory.getMailInfo().then(function (res) {
            expect($scope.mailInfoObj).toEqual(dsd);
            done();
        });
        expect(spyG).toHaveBeenCalledWith('12541sss0cg');
    });


    it("Test3 getMailInfo should call mailFactory.getMailInfo function if type is inbox", function (done) {
        spyG.and.returnValue(Promise.resolve({
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
            "from": "newaccount@webnxg.com",
            "date": "22/02/2018",
            "cc": "new4@webnxg.com new7@webnxg.com",
            "bcc": "new@webnxg.com new2@webnxg.com",
            "subject": "draft draf55t2",
            "messageBody": "draft message2"
        };
        controller = $controller('mailBoxInfoController', {
            $scope: $scope, $routeParams: {
                boxValue: "inbox", mailId: "12541ss0cg"
            }
        });

        $scope.getMailInfo();
        mailFactory.getMailInfo().then(function (res) {
            expect($scope.mailInfoObj).toEqual(dsd);
            done();

        });
        expect(spyG).toHaveBeenCalledWith('12541ss0cg');
    });

    it("deleteMessage function should call mailFactory.deleteMail()", function () {
        controller = $controller('mailBoxInfoController', {
            $scope: $scope, $routeParams: {
                boxValue: "inbox", mailId: "12541ss0cg"
            }
        });
        var spy = spyOn(mailFactory, "deleteEmail").and.returnValue(Promise.resolve(200));
        $scope.deleteMessage();
        expect(spy).toHaveBeenCalledWith("12541ss0cg");

        controller = $controller('mailBoxInfoController', {
            $scope: $scope, $routeParams: {
                boxValue: "inbox", mailId: "sdsd2"
            }
        });
        $scope.deleteMessage();
        expect(spy).toHaveBeenCalledWith('sdsd2');
    });

    it("deleteMessage function should call goBack() after deleting mail", function (done) {
        controller = $controller('mailBoxInfoController', {
            $scope: $scope, $routeParams: {
                boxValue: "inbox", mailId: "sdsds23"
            }
        });
        spyOn(mailFactory, "deleteEmail").and.returnValue(Promise.resolve(200));
        var spy = spyOn($scope, "goBack");
        $scope.deleteMessage();
        mailFactory.deleteEmail('sdsds23').then(function (res) {
            expect(spy).toHaveBeenCalled();
            done();
        });
    });
});