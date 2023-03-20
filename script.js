const container = document.querySelector('.container');
const count =document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');
const allseats = document.querySelectorAll('.seat');
const button = document.getElementById('buy');
const reserved = document.querySelectorAll('.seat.reserved');


getFromLocalStorage();
calculateTotal();

container.addEventListener('click',function(e){
    if (e.target.classList.contains('seat')&& !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateTotal();
    }
});


select.addEventListener('change',function(e){
    calculateTotal();
})

function calculateTotal(){

    const selectedSeats =container.querySelectorAll('.seat.selected');
    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat);
    });

    seats.forEach(function(seat){
        seatsArr.push(seat);
    });

    let selectedSeatIndex = selectedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);
    });

   // console.log(selectedSeatIndex);


    let selectedSeatCount =selectedSeats.length;
    
    count.innerText =selectedSeatCount;
    amount.innerText =selectedSeatCount*select.value;

    saveToLocalStorage(selectedSeatIndex);
}

function getFromLocalStorage() {
    const selectedSeats =JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function(seat,index){
            if (selectedSeats.indexOf(index)> -1) {
                seat.classList.add('selected');
            }
        })
    }

    
    const selectedMovieIndex =JSON.parse(localStorage.getItem('selectedMovieIndex'));

    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }


    const reservedSeats = JSON.parse(localStorage.getItem('reservedSeats'));

    if (reservedSeats != null && reservedSeats.length > 0) {
        seats.forEach(function(seat,index){
            if (reservedSeats.indexOf(index)> -1) {
                seat.classList.add('reserved');
            }
        })
    }
}

function saveToLocalStorage(indexs) {
    localStorage.setItem('selectedSeats',JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex',select.selectedIndex);
}

function saveToLocalStorageForReserved(indexs) {
    localStorage.setItem('reservedSeats', JSON.stringify(indexs));
}


button.addEventListener('click',function() {
    const selectedSeats =JSON.parse(localStorage.getItem('selectedSeats'));
    const reservedSeats= container.querySelectorAll('.seat.reserved');
    const reservedSeatsArr = [];
    const seatsArr = [];

    reservedSeats.forEach(function(seat){
         reservedSeatsArr.push(seat);
    });

    seats.forEach(function(seat){
        seatsArr.push(seat);
    });

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function(seat,index){
            if (selectedSeats.indexOf(index)> -1) {
                
                seat.classList.add('reserved');
                reservedSeatsArr.push(seat);

                let selectedSeatIndex = [];
                saveToLocalStorage(selectedSeatIndex);

            }
        })
    }else{
        getFromLocalStorage();
    }

    let reservedSeatIndex = reservedSeatsArr.map(function(seat){
        return seatsArr.indexOf(seat);
    });

    saveToLocalStorageForReserved(reservedSeatIndex);

})