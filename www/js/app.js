// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})

.controller('MainView',['$scope','$cordovaCapture','$cordovaFileTransfer',function($scope,$cordovaCapture,$cordovaFileTransfer){
  $scope.captureImage = function() {
   var options = { limit: 1 };
   $scope.imageUploadComplete = false;
   $scope.uploadingFile = false;
   $scope.progressVal = 0;

    $cordovaCapture.captureImage(options).then(function(imageData) {
      // Success! Image data is here
      console.log(imageData);
      imageData = imageData[0];
      var serverUrl = 'https://api.parse.com/1/files/' + imageData.name;
      var options = {
        fileKey:"myFile",
        fileName:"",
        httpMethod:"POST",
        mimeType:imageData.type,
        headers: {
          "X-Parse-Application-Id":"<your-parse-app-id>",
          "X-Parse-REST-API-Key":"<your-parse-rest-api-key>"
        }
      };
      $scope.uploadingFile = true;
      $cordovaFileTransfer.upload(serverUrl, imageData.fullPath, options)
      .then(function(result) {
        // Success!
        $scope.imageUploadComplete = true;
        $scope.capturedImg = JSON.parse(result.response)["url"];
        console.log(result);
        $scope.uploadingFile = false;
      }, function(err) {
        $scope.uploadingFile = false;
        // Error
      }, function (progress) {
        // constant progress updates
        console.log(progress);
        $scope.progressVal = (progress.loaded/progress.total)*100;
      });
    }, function(err) {
      // An error occurred. Show a message to the user
      alert(JSON.stringify(err));
    });
  }

  $scope.captureVideo = function() {
    var options = { limit: 1, duration: 15 };

    $cordovaCapture.captureVideo(options).then(function(videoData) {
      // Success! Video data is here
      console.log(videoData);

      videoData = videoData[0];
      var serverUrl = 'https://api.parse.com/1/files/' + videoData.name;
      var options = {
        fileKey:"myFile",
        fileName:"",
        httpMethod:"POST",
        mimeType:videoData.type,
        headers: {
          "X-Parse-Application-Id":"<your-parse-app-id>",
          "X-Parse-REST-API-Key":"<your-parse-rest-api-key>"
        }
      };
      $scope.uploadingFile = true;
      $cordovaFileTransfer.upload(serverUrl, videoData.fullPath, options)
      .then(function(result) {
        // Success!
        $scope.imageUploadComplete = true;
        $scope.capturedImg = JSON.parse(result.response)["url"];
        console.log(result);
        $scope.uploadingFile = false;
      }, function(err) {
        $scope.uploadingFile = false;
        // Error
      }, function (progress) {
        // constant progress updates
        console.log(progress);
        $scope.progressVal = (progress.loaded/progress.total)*100;
      });
    }, function(err) {
      // An error occurred. Show a message to the user
      alert(JSON.stringify(err));
    });
  }
}]);
