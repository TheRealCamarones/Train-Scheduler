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
}
var newArray = [];

function addTrain() {
    var row = $("<tr>")
        .append("<td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency +"</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td>");
        $("#table-body").append(row);
};

$("#submitButton").on("click", function () {
    trainName = $("#train-name").val().trim();
    console.log(trainName);
    destination = $("#train-destination").val().trim();
    console.log(destination);
    firstTrain = $("#first-train").val().trim();
    console.log(firstTrain);
    frequency = $("#train-frequency").val().trim();
    console.log(frequency);
    messWithTime();
    addTrain();
});

function messWithTime() {
    // we know firstTime and the frequency already, exactly how we did it in class
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    minutesAway = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // Next Train
    nextArrival = moment().add(minutesAway, "minutes").format("hh:mm A");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));
}
