appModule.controller("mailBoxController", function ($scope, $location, mailFactory, $routeParams) {
    /*
     get url parameter boxValue
     boxValue holds mail type
    */
    $scope.mailType;
    // mailBox
    $scope.mailBox = null;

    /**
     * Based on mailType assign title to $scope.titleType
     *  
     * Mail Type   ->   Title 
     *  "inbox"    ->   "Inbox"
     *  "draft"    ->   "Draft"   
     *   sent"     ->   "Sent Mail"   
     * 
     **/

    $scope.titleType = "";



    $scope.readMailList = function () {
        /**
         * Based on mailType use the factory method to get the email list
         * Assign the response data to $scope.mailBox
         **/

    }

    $scope.deleteMessage = function (mailId) {
        /**
         * delete Email
         * And call the readMailList function
         * */

    }

    $scope.showEmail = function (mailId) {
        /**  
         *  if mailType is inbox or sent then route to mailBoxInfo.html
         *  if mailType is draft then route to mailEditor.html
         **/

    }

    $scope.readMailList();
});
