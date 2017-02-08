(function() {
  const LOGIN = angular.module('zen.login', []);
  LOGIN.controller('LoginCtrl', function($scope, $location) {
    // $scope.login = function () {
    //   $location.path();
    // }
  });


// example.controller("LoginController", function($scope) {
//     $scope.login = function() {
//         window.location.href = "https://api.imgur.com/oauth2/authorize?client_id=" + "CLIENT_ID_HERE" + "&response_type=token"
//     }

// });

// example.controller("SecureController", function($scope) {

//     $scope.accessToken = JSON.parse(window.localStorage.getItem("imgur")).oauth.access_token;

// });
// function onSignIn(googleUser) {
//         // Useful data for your client-side scripts:
//         var profile = googleUser.getBasicProfile();
//         // profile gets profile of user. We can create a user object with the following info:
//         // The ID token you need to pass to your backend:
//         var id_token = googleUser.getAuthResponse().id_token;
//         console.log('ID token is what we send to back-end');
//         console.log('ID Token: ' + id_token);
//         var url = '/api/users/' + profile.getEmail();
//         var userRoute = '/api/users';
//         var user = {
//           name: profile.getName(),
//           email: profile.getEmail(),
//         };
//         if (id_token) {
//           // Upon Successful Google Auth - AJAX Calls
//           axios.get(url)
//           .then(function(data) {
//             console.log('GET data passed is: ', data);
//             // check if User Email Account exists in DB
//             if (data) {
//               return window.location = 'index.html';
//             }
//             axios.post(userRoute, {
//               data: user
//             })
//             .then(function() {
//               window.location = 'index.html';
//             })
//             .catch(function(err) {
//               console.log(err);
//             });
//           })
//           .catch(function(err) {
//             console.log(err);
//           });
//         } // end of if id_token
//       };
//       gapi.load('auth2', function() {
//         gapi.auth2.init();
//       });
//       function signOut() {
//         var auth2 = gapi.auth2.getAuthInstance();
//         auth2.signOut().then(function() {
//           console.log('User signed out.');
//         });
//       };

})();





