
appModule.controller("mailBoxInfoController", function ($scope, $window, mailFactory, $routeParams) {
    /*
     get url parameter boxValue and mailId
     boxValue holds mail type
    */
    $scope.mailType;
    $scope.mailId ;

    $scope.goBack = function () {
        // navigate back.

    }
    $scope.mailInfoObj = { };

    $scope.getMailInfo = function () {
        /**
         *  -> get the mail details and assign it to $scope.mailInfoObj
         *  -> if mailType is "inbox" then $scope.mailInfoObj should contain from, date, cc, 
         * bcc, subject and messageBody properties 
         * eg:{ from:"", date: "",cc: "",bcc: "",subject: "", messageBody: ""}
         *  -> if mailType is "sent" then $scope.mailInfoObj should contain to, date, cc, 
         * bcc, subject and messageBody properties
         * eg:{ to:"", date: "",cc: "",bcc: "",subject: "", messageBody: ""}
         */

    }

    $scope.getMailInfo();

    $scope.deleteMessage = function () {
        // delete the Email and navigate back.
       
    }
});