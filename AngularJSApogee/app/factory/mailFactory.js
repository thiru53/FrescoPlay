appModule.factory('mailFactory', function ($http) {
    /* 
       ******** URL *********
       --> "api/getInbox" to get Inbox
           -> use POST method
   
       --> "api/getDraftMsg" to get Draft Email
           -> use POST method
   
       --> "api/getSentMsg" to get Sent Email
           -> use POST method
   
       --> "api/getMailInfo" to get Email details
           -> use POST method
       
       --> "api/sendMail" to send Email
           -> use POST method

       --> "api/deleteEmail" to delete Email
           -> use POST method

       --> "api/saveDraft" to save as draft
           -> use POST method     
        */
    var mailFactory = {};

    mailFactory.authKey = "s1426478";

    mailFactory.getInbox = function () {
        //POST: return HttpPromise
        // code here
        return null;
    };

    mailFactory.getDraftMsg = function () {
        //POST: return HttpPromise
        // code here
        return null;
    };

    mailFactory.getSentMsg = function () {
        //POST: return HttpPromise
        // code here
        return null;
    };

    mailFactory.getMailInfo = function (msgId) {
        //POST: return HttpPromise
        // code here
        return null;
    };


    mailFactory.sendMail = function (obj) {
        //POST: return HttpPromise
        // code here
        return null;
    };

    mailFactory.deleteEmail = function (msgId) {
        //POST: return HttpPromise
        // code here
        return null;
    }

    mailFactory.saveDraft = function (obj) {
        //POST: return HttpPromise
        // code here
        return null;
    };
    return mailFactory;
});