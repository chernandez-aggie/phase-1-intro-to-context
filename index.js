// Your code here

function createEmployeeRecord (employeeInfo) {
      const employeeRecord = {"firstName": employeeInfo[0], "familyName": employeeInfo[1], "title": employeeInfo[2], "payPerHour": employeeInfo[3], "timeInEvents": [], "timeOutEvents": []};
       
      return employeeRecord;
}

function createEmployeeRecords (collectionIndEmployeeRecords) {
    const employeeRecords = [];
    
    for (let i = 0; i < collectionIndEmployeeRecords.length; i++) {
        employeeRecords[i] = createEmployeeRecord(collectionIndEmployeeRecords[i]);
    }

    return employeeRecords;
}

function createTimeInEvent (employeeRecord, dateStamp) {
    
    // employeeRecord = {"firstName": employeeInfo[0], "familyName": employeeInfo[1], "title": employeeInfo[2], "payPerHour": employeeInfo[3], "timeInEvents": [], "timeOutEvents": []};
    
    const splitDateStamp = dateStamp.split(" ");
    const date = splitDateStamp[0];
    const hourString = splitDateStamp[1];
    const hour = parseInt(hourString);
    employeeRecord.timeInEvents.push({"type": "TimeIn", "hour": hour, "date": date});
    
    return employeeRecord;
}

function createTimeOutEvent (employeeRecord, dateStamp) {

    // employeeRecord = {"firstName": employeeInfo[0], "familyName": employeeInfo[1], "title": employeeInfo[2], "payPerHour": employeeInfo[3], "timeInEvents": [], "timeOutEvents": []};

    const splitDateStamp = dateStamp.split(" ");
    const date = splitDateStamp[0];
    const hourString = splitDateStamp[1];
    const hour = parseInt(hourString);
    employeeRecord.timeOutEvents.push({"type": "TimeOut", "hour": hour, "date": date});

    return employeeRecord;
}

function hoursWorkedOnDate (employeeRecord, dateWorked) {
    //timeIn
    const employeeTimeInObject = employeeRecord.timeInEvents.find(element => element.date === dateWorked);
    const timeInDate = employeeTimeInObject.date;
    const timeInHour = employeeTimeInObject.hour;
    //timeOut
    const employeeTimeOutObject = employeeRecord.timeOutEvents.find(element => element.date === dateWorked);
    const timeOutDate = employeeTimeOutObject.date;
    const timeOutHour = employeeTimeOutObject.hour;
    
    
    //find an element that returns true. if true, whole element is returned. In this case it is an object.
    // employeeRecord = {"firstName": employeeInfo[0], "familyName": employeeInfo[1], "title": employeeInfo[2], "payPerHour": employeeInfo[3], "timeInEvents": [], "timeOutEvents": []};

    //[{"type": "TimeIn/Out", "hour": hour, "date": date}]
    let hoursWorked;

    if ((dateWorked === timeInDate) && (dateWorked === timeOutDate)) {
        hoursWorked = (timeOutHour - timeInHour)/100;
    }
    
    return hoursWorked;
    
}

function wagesEarnedOnDate (employeeRecord, dateWorked) {
 
    let hoursWorked = hoursWorkedOnDate(employeeRecord, dateWorked);
    let payOwed = hoursWorked * employeeRecord.payPerHour;

    return payOwed;
}

function allWagesFor (employeeRecordObject) {
    console.log(employeeRecordObject)
   let timeInEventsArray = employeeRecordObject.timeInEvents; //array of objects
   let timeOutEventsArray = employeeRecordObject.timeOutEvents; //array of objects
   let payOwedForAllDates = 0; 
    //[
    // {"type": "TimeIn/Out", "hour": hour, "date": date},
    // {"type": "TimeIn/Out", "hour": hour, "date": date}
    // ]

    timeInEventsArray.forEach(element => {
        payOwedForAllDates += wagesEarnedOnDate(employeeRecordObject, element.date);
    });
 
    return payOwedForAllDates;
}

function calculatePayroll (arrayEmployeeRecords){
    let sumPayOwed = 0;

   arrayEmployeeRecords.forEach(employeeObject => {
       let timeIn = employeeObject.timeInEvents;

       timeIn.forEach(timeInObject => {
            sumPayOwed += wagesEarnedOnDate(employeeObject, timeInObject.date);
       })
       
   });
    return sumPayOwed;
}