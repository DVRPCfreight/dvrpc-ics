const ical = require('ical-generator');
const moment = require('moment');
var FileSaver = require('file-saver');


// Create new Calendar and set optional fields
const cal = ical({
    domain: 'dvrpc.org',
    prodId: {company: 'dvrpc', product: 'ical-generator'},
    timezone: 'America/New_York',
    method: 'request'
});


var button = document.querySelector('#generate');
button.addEventListener('click',buildEvent,false);

function buildEvent(){
    let myForm = document.getElementById('event-creator');
    let formData = new FormData(myForm);
    
    
    let date = formData.get('date')
    let start = formData.get('start')
    let end = formData.get('end')

    // create a new event
    const event = cal.createEvent({
        start: moment(date + ' ' + start, 'MMM DD, YYYY hh:mm A'),
        end: moment(date + ' ' + end, 'MMM DD, YYYY hh:mm A'),
        timestamp: moment(),
        summary: formData.get('summary'),
        organizer: formData.get('organizer') + '<'+ formData.get('email') +'>',
        description: formData.get('desc'),
        location: formData.get('location'),
        url: formData.get('url')
    });
    console.log(cal.toString());
    let filename = formData.get('fn') + ".ics";
    var blob = new Blob([cal.toString()], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, filename);
}







