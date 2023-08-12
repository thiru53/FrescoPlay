
appModule.controller("mailEditorController", function ($scope, $window, mailFactory, $routeParams) {
    /*
        get url parameter mailId
        If mailId is -1 then it is new mail otherwise draft
    */
    $scope.mailId;
    $scope.formDataObj = {};

    $scope.getMailInfo = function () {
        /**
         *  get the Email information if mailId not equal to -1
         *  assign the response data to  $scope.formDataObj
         *  $scope.formDataObj should contain to, cc, bcc, subject and  messageBody properties
         *  eg:{ to:"", date: "",cc: "",bcc: "",subject: "", messageBody: ""}
         */


    }

    $scope.getMailInfo();


    $scope.goBack = function () {
        // navigate back
    }

    $scope.getCurrentDate = function () {
        // return today's date in DD/MM/YYYY format
        // eg: 21/05/2020
        return "DD/MM/YYYY";
    }


    $scope.send = function () {
        // to send Email and navigate back

    };
    $scope.saveDraft = function () {
        // to save as draft and navigate back
        // If user is opening existing draft then add the propery name "_id" 
        // and assign mailId to it  

    }
    $scope.deleteMessage = function () {
        // to delete Email and naviagte back

    }

});