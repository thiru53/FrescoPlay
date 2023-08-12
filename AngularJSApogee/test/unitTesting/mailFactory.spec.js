describe('factory', function () {
    var $http, $httpBackend, mailFactory;
    beforeEach(module('mail'));
    var authKey = 's1426478';
    var type = ['inbox', 'draft', 'sent'];
    var tmp = [
        {
            "header": {
                "from": "newaccount@webnxg.com",
                "date": "22/02/2018",
                "to": "draft4@newmail.com",
                "cc": "draft3@newmail.com",
                "bcc": "",
                "subject": "draft 4"
            },
            "messageBody": "draft message4"
        },
        {
            _id: 'ijhsdjsjkdo9mkn',
            "header": {
                "from": "newaccount@webnxg.com",
                "date": "22/02/2018",
                "to": "draft4@newmail.com",
                "cc": "draft3@newmail.com",
                "bcc": "",
                "subject": "draft 4"
            },
            "messageBody": "draft message4"
        }
    ]
    beforeEach(inject(function (_mailFactory_, _$httpBackend_, _$http_) {
        $httpBackend = _$httpBackend_;
        mailFactory = _mailFactory_;
        $http = _$http_;
    }));

    it("getInbox should use http post method", function () {
        $httpBackend.whenPOST("api/getInbox")
            .respond(200);
        var spy = spyOn($http, "post");
        mailFactory.getInbox();
        expect(spy).toHaveBeenCalledWith("api/getInbox", { authKey: authKey, type: type[0] });
    });


    it("getInbox should return http post method promise", function () {
        $httpBackend.whenPOST("api/getInbox")
            .respond(200);
        mailFactory.getInbox().then(function (res) {
        });
    });

    it("getDraftMsg should use http post method", function () {
        $httpBackend.whenPOST("api/getDraftMsg")
            .respond(200);
        var spy = spyOn($http, "post");
        mailFactory.getDraftMsg();
        expect(spy).toHaveBeenCalledWith("api/getDraftMsg", { authKey: authKey, type: type[1] });
    });


    it("getDraftMsg should return http post method promise", function () {
        $httpBackend.whenPOST("api/getDraftMsg")
            .respond(200);
        mailFactory.getDraftMsg().then(function (res) {
        });
    });

    it("getSentMsg should use http post method", function () {
        $httpBackend.whenPOST("api/getSentMsg")
            .respond(200);
        var spy = spyOn($http, "post");
        mailFactory.getSentMsg();
        expect(spy).toHaveBeenCalledWith("api/getSentMsg", { authKey: authKey, type: type[2] });
    });


    it("getSentMsg should return http post method promise", function () {
        $httpBackend.whenPOST("api/getSentMsg")
            .respond(200);
        mailFactory.getSentMsg().then(function (res) {
        });
    });


    it("Test1 getMailInfo should use http post method", function () {
        $httpBackend.whenPOST("api/getMailInfo")
            .respond(200);
        var spy = spyOn($http, "post");
        mailFactory.getMailInfo(1);
        expect(spy).toHaveBeenCalledWith("api/getMailInfo", { authKey: authKey, _id: 1 });
    });


    it("Test2 getMailInfo should use http post method", function () {
        $httpBackend.whenPOST("api/getMailInfo")
            .respond(200);
        var spy = spyOn($http, "post");
        mailFactory.getMailInfo(2);
        expect(spy).toHaveBeenCalledWith("api/getMailInfo", { authKey: authKey, _id: 2 });
    });

    it("getMailInfo should return http post method promise", function () {
        $httpBackend.whenPOST("api/getMailInfo")
            .respond(200);
        mailFactory.getMailInfo(1).then(function (res) {
        });
    });



    it("Test1 sendMail should use http post method", function () {
        $httpBackend.whenPOST("api/sendMail")
            .respond(200);
        var spy = spyOn($http, "post");
        mailFactory.sendMail(tmp[1]);
        expect(spy).toHaveBeenCalledWith("api/sendMail", { authKey: authKey, message: tmp[1] });
    });


    it("Test2 sendMail should use http post method", function () {
        $httpBackend.whenPOST("api/sendMail")
            .respond(200);
        var spy = spyOn($http, "post");
        mailFactory.sendMail(tmp[0]);
        expect(spy).toHaveBeenCalledWith("api/sendMail", { authKey: authKey, message: tmp[0] });
    });

    it("sendMail should return http post method promise", function () {
        $httpBackend.whenPOST("api/sendMail")
            .respond(200);
        mailFactory.sendMail(1).then(function (res) {
        });
    });


    it("Test1 deleteEmail should use http post method", function () {
        $httpBackend.whenPOST("api/deleteEmail")
            .respond(200);
        var spy = spyOn($http, "post");
        mailFactory.deleteEmail(1);
        expect(spy).toHaveBeenCalledWith("api/deleteEmail", { authKey: authKey, _id: 1 });
    });


    it("Test2 deleteEmail should use http post method", function () {
        $httpBackend.whenPOST("api/deleteEmail")
            .respond(200);
        var spy = spyOn($http, "post");
        mailFactory.deleteEmail(2);
        expect(spy).toHaveBeenCalledWith("api/deleteEmail", { authKey: authKey, _id: 2 });
    });

    it("deleteEmail should return http post method promise", function () {
        $httpBackend.whenPOST("api/deleteEmail")
            .respond(200);
        mailFactory.deleteEmail(1).then(function (res) {
        });
    });

    it("Test1 saveDraft should use http post method", function () {
        $httpBackend.whenPOST("api/saveDraft")
            .respond(200);
        var spy = spyOn($http, "post");
        mailFactory.saveDraft(tmp[1]);
        expect(spy).toHaveBeenCalledWith("api/saveDraft", { authKey: authKey, message: tmp[1] });
    });


    it("Test2 saveDraft should use http post method", function () {
        $httpBackend.whenPOST("api/saveDraft")
            .respond(200);
        var spy = spyOn($http, "post");
        mailFactory.saveDraft(tmp[0]);
        expect(spy).toHaveBeenCalledWith("api/saveDraft", { authKey: authKey, message: tmp[0] });
    });

    it("saveDraft should return http post method promise", function () {
        $httpBackend.whenPOST("api/saveDraft")
            .respond(200);
        mailFactory.saveDraft(1).then(function (res) {
        });
    });

});
