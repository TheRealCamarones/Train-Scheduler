var trainName;
var destination;
var frequency;
var firstTrain;
var nextArrival;
var minutesAway;
var newTrain = {
    trainName,
    destination,
    frequency,
    nextArrival,
    minutesAway,
    firstTrain,
};

var config = {
    apiKey: key,
    authDomain: "trainschedulingapp.firebaseapp.com",
    databaseURL: "https://trainschedulingapp.firebaseio.com",
    projectId: "trainschedulingapp",
    storageBucket: "trainschedulingapp.appspot.com",
    messagingSenderId: "279864743322"
  };

  firebase.initializeApp(config);

  database = firebase.database();

$("#submitButton").on("click", function(event) {
    event.preventDefault();
    trainName = $("#train-name").val().trim();
    console.log(trainName);
    destination = $("#train-destination").val().trim();
    console.log(destination);
    firstTrain = $("#first-train").val().trim();
    console.log(firstTrain);
    frequency = $("#train-frequency").val().trim();
    console.log(frequency);

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
    });
});

database.ref().on("child_added", function(snapshot) {
    var sv = snapshot.val();

    var firstTimeConverted = moment(sv.firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var howFrequent = sv.frequency;

    // Time apart (remainder)
    var tRemainder = diffTime % howFrequent;
    console.log(tRemainder);

    // Minute Until Train
    minutesAway = howFrequent - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // Next Train
    nextArrival = moment().add(minutesAway, "minutes").format("hh:mm A");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

    var row = $("<tr>")
        .append("<td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency +"</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td>");
        $("#table-body > tbody:last-child").append(row)
}, function(errorObject) {
    console.log("Errors: " + errorObject.code);
});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(childSnapshot) {
    var sv = childSnapshot.val();
});