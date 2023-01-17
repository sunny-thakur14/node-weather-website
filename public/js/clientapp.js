
console.log('This is client side javascript file loaded');


// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

//challenge
// console.log('Client side javascript file is loaded!')


//displaying above data on webpage 

const weatherForm = document.querySelector('form');
const searchCity = document.querySelector('input');
const msgOne = document.querySelector('#message-1');
const msgTwo = document.querySelector('#message-2');

//msgOne.textContent = 'hello node' ;

weatherForm.addEventListener('submit', (e) => {
    //preventing automatic browser refresh
    e.preventDefault();
    const location1 = searchCity.value;
    msgOne.textContent = 'loading...';
    msgTwo.textContent = '';

    fetch('http://localhost:3000/weather1?location=' + location1).then((response) => {
        response.json().then((data) => {
            // console.log('here -- ' + data.city);
            // console.log('here -- ' + data.data1.Temperatur1);
            // console.log('here -- ' + data.data1.Day_desc);
            if (data.error) {
                msgOne.textContent = data.error ;
            } else {
                console.log('fetch loc ' + data.city)
                // console.log('fetch data '+data.weatherReport)    --cant get data directly from weatherReport
                msgOne.textContent ='Current temperature is '+ data.forecast1.Temperatur1 + ' degree celcious.';
                msgTwo.textContent = 'It will be '+data.forecast1.Day_desc + ' outside.';
            }
        })
    })

    console.log(location1);
    
})