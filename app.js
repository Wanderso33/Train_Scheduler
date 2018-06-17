/* global firebase moment */
// Steps to complete:
// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyA5eYKsB8T2q6rMGdKSvac6eQsWTzsZEjE",
    authDomain: "fir-recent-user.firebaseapp.com",
    databaseURL: "https://fir-recent-user.firebaseio.com",
    storageBucket: "fir-recent-user.appspot.com"
};

firebase.initializeApp(config);

var database = firebase.TrainScheduler();
// 2. Create button for adding new train - then update the html + update the database
$("#add-new-train").on("click", function (event) {
    event.preventDefault();

    // 3. Create a way to retrieve employees from the employee database.
    train_name = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#first-train-input").val().trim();
    frequency = $("#frequency-input").val().trim();


    console.log("train_name", train_name);
    console.log("destination", destination);
    console.log("firstTrain", firstTrain);
    console.log("frequency", frequency);

    database.ref().push({
        train_name: train_name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    });


});

database.ref().on("child_added", function (snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().train_name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().frequency);

    var tName = snapshot.val().train_name;
    var tDestination = snapshot.val().destination;
    var tFrequency = snapshot.val().frequency;
    var tArrival= snapshot.val().firstTrain



    $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
    tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
