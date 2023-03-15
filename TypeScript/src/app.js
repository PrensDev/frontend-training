class BookingSystem {

  // ? Constructor

  constructor (rooms = []) {
    this.rooms = rooms;
    this.bookings = [];
  }


  // ? Private Methods
  #bookRecordFinder = searchQuery => {
    let keyValPair = this.bookings
      .map(booking => Object.entries(booking))
      .reduce((keyValPairs, arrEntries) => {
        let keyValPairIndividual = arrEntries
      }, []);
    console.log(keyValPair);
  }
  

  // ? Public Methods
  
  book(name, date, room) {

    // Check if room exist in rooms
    if (!this.rooms.includes(room)) {
      console.error(`${ room } does not exist.`);
      return;
    }

    // Check if 
    
    this.bookings.push({
      name: name,
      date: date,
      room: room
    });
  }

  getBookings(param) {

    // If no parameters
    if (!param) {
      this.bookings
        .sort((booking1, booking2) => {
          const bookingDate1 = new Date(booking1.date);
          const bookingDate2 = new Date(booking2.date);
          return bookingDate1.getTime() - bookingDate2.getTime();
        })
        .forEach(booking => {
          console.log(Object.values(booking).join(', '));
        })
      return;
    }

    // If has parameter
    this.#bookRecordFinder(param)
  }
}


const SpinifexIT = new BookingSystem(['Room 1001', 'Training Room']);

SpinifexIT.book('Jetsun', '03-26-2023', 'Room 1001');
SpinifexIT.book('Renz', '03-25-2023', 'Room 404');
SpinifexIT.book('Judy', '03-25-2023', 'Training Room');
SpinifexIT.book('Jayson', '03-26-2023', 'Room 1001');
SpinifexIT.book('John', '03-24-2023', 'Room 1001');
SpinifexIT.book('Joshua', '03-27-2023', 'Room 1001');

SpinifexIT.getBookings('Jayson');

