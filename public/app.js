/**
 * Created by Alican on 2016-12-16.
 */

var jetbrains = angular.module("jetbrains", []);
var url = "http://localhost:3000";
var socket = new WebSocket("ws://localhost:3000");

jetbrains.controller("AppCtrl", function ($http, $scope) {
    var app = this;
    $scope.user = "";
    $scope.username = "";
    $scope.password = "";

    socket.onmessage = function (message) {
        console.log(message);
    };

    /*socket.on('news', function (data) {
        console.log(data);
        socket.emit('my other event', { my: 'data' });
    });*/

    app.sendMessage = function (pseudo, msg) {
        $http.post(url + "/send", {name: pseudo, message:msg});
    };

    $scope.login = function () {
        $http.post(url + "/login", {username: $scope.username, password: $scope.password}).then(function (err) {
            console.log("here");
            if(err){
                if(err.data == "error")
                    console.log(err);
                else{
                    console.log(err.data + " not error");
                    $scope.user = err.data;

                    var loginSuccess = document.getElementById("start");
                    if(loginSuccess.style.display === 'block' || loginSuccess.style.display === '')
                        loginSuccess.style.display = 'none';
                    else
                        loginSuccess.style.display = 'block';

                    var chat = document.getElementById("chat");
                    if(chat.style.display === 'block' || chat.style.display === '')
                        chat.style.display = 'none';
                    else
                        chat.style.display = 'block';
                }//else
            }//if
        })
    };

    $scope.register = function (/*username, password*/){
        $http.post(url + "/register", {username: $scope.username, password: $scope.password}).then(function(err){
            if(err){
                if(err.data = "it exists")
                    console.log("it exists");
                else{
                    console.log(err.data + " doesnt exist");
                    $scope.user = err.data;

                    var loginSuccess = document.getElementById("start");
                    if(loginSuccess.style.display === 'block' || loginSuccess.style.display === '')
                        loginSuccess.style.display = 'none';
                    else
                        loginSuccess.style.display = 'block';

                    var chat = document.getElementById("chat");
                    if(chat.style.display === 'block' || chat.style.display === '')
                        chat.style.display = 'none';
                    else
                        chat.style.display = 'block';
                }//else
            }//if
        })
    };
});