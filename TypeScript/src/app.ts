interface BookRecord {
  name: string,
  date: Date,
  room: string
}

enum Months {
  January, February, March, 
  April, May, June, 
  July, August, September, 
  October, November, December 
}

const isValidDate = (date: string): Boolean => !isNaN(new Date(date).valueOf());

const humanizedDate = (date: (Date | string)): string => {
  const recordDate = date instanceof Date ? date : new Date(date);
  return [
    Months[recordDate.getMonth()], 
    recordDate.getDate(), 
    recordDate.getFullYear()
  ].join(' ');
}


class BookingSystem {

  // ? Properties

  rooms: string[];
  bookRecords: object[];


  // ? Constructor

  constructor (rooms: string[] = []) {
    this.rooms = rooms;
    this.bookRecords = [];
  }


  // ? Private Methods

  #generateCalendarBookings = (month?: string, year?: number): void => {
    
    // Get the date
    let date: Date;
    const now = new Date();
    if (!month && !year)
      date = new Date();
    else if (month && !year)
      date = new Date(now.getFullYear(), Months[month as keyof typeof Months]);
    else 
      date = new Date(year, Months[month as keyof typeof Months]);

    const dateYear = date.getFullYear();
    const dateMonth = date.getMonth(); // 0-11

    // Get the booking date of current month
    let bookingDatesOfTheMonth: Date[] = 
      this.bookRecords
        .filter(({ date }: BookRecord): Boolean => date.getMonth() === dateMonth)
        .reduce<Date[]>((dates: Date[], { date }: BookRecord): Date[] => 
          [...dates, date]
          , []
        )

    // Get the days in Month  
    const daysInMonth = new Date(dateYear, dateMonth + 1, 0).getDate();

    // Get the first day of the month
    const firstDayOfMonth = new Date(dateYear, dateMonth, 1).getDay();

    // Temporary week
    let weekArr: number[] = [];

    // If first day is not sunday
    // Fill leading days by 0
    if (firstDayOfMonth > 0) {
      for (let j = 0; j < firstDayOfMonth; j++) {
        weekArr.push(0);
      }
    }

    // Generate the days
    let monthCalendarGrid = [];
    for (let i = 1; i <= daysInMonth+1; i++) {
      const day = new Date(dateYear, dateMonth, i).getDay();
      if (day === 0 || i === daysInMonth+1) {
        if (weekArr.length) monthCalendarGrid.push(weekArr);
        weekArr = [];
      }
      weekArr.push(i);
    }

    // Generate the calendar grid
    let calendarGridArr: string[] = [
      `${ Months[dateMonth].padEnd(9) }       ${ dateYear }\n`,
      '--------------------\n',
      'Su Mo Tu We Th Fr Sa\n'
    ]
    monthCalendarGrid.forEach(week => {
      const weekStr = week.map(day => {

        // Change 0 to spaces
        if (day === 0) return '  ';
        
        // Check if that date has been booked
        const isDateBooked = bookingDatesOfTheMonth.some((date: Date) => 
          date.getTime() === new Date(dateYear, dateMonth, day).getTime()
        )
        
        // Mark as X instead of number if date has been booked
        return isDateBooked ? ' X' : day.toString().padStart(2);
      }).join(' ');
      calendarGridArr.push(weekStr + '\n');
    })
    console.log(calendarGridArr.join(''));
  }
  

  // ? Public Methods
  
  book(name: string, date: string, room: string): void {

    // For validation
    let dateNow = new Date();
    let bookDate = new Date(date);

    // Check if name is not blank
    if (!name) {
      console.error(`Name is required and cannot be blank.`);
      return;
    }

    // Check if date is not blank
    if (!date) {
      console.error(`Date is required and cannot be blank.`);
      return;
    }

    // Check if room is not blank
    if (!room) {
      console.error(`Room is required and cannot be blank.`);
      return;
    }

    // Check if date is valid
    if (!isValidDate(date)) {
      console.error(`[${ date }] is not a valid date.`);
      return;
    }

    // Check if room exists in rooms
    if (!this.rooms.includes(room)) {
      console.error(`[${ room }] does not exists.`);
      return;
    }

    // Check if date is a past date
    if (bookDate.getTime() < dateNow.getTime()) {
      console.error(`[${ humanizedDate(date) }] is a past date.`);
      return;
    }

    // Check if room is already booked for a given date
    let isRoomBoooked: Boolean = this.bookRecords.some(({ room, date }: BookRecord): Boolean =>
      room === room && bookDate.getTime() === date.getTime()
    )
    if (isRoomBoooked) {
      console.error(`[${ room }] is unavailable on date [${ humanizedDate(date) }] for [${ name }].`);
      return;
    }

    // Push the record in book records
    this.bookRecords.push({
      name: name,
      date: new Date(date),
      room: room
    });

    console.log(`[${ room }] for [${ name }] has been successfully booked on [${ humanizedDate(date) }]`);
  }

  getBookings(param1: string = '', param2?: string): void {

    // Container for filtered records
    let bookRecords: object[];

    // If no parameters
    if (!param1 && !param2) {

      // Sort all booking records in ascending order
      bookRecords = this.bookRecords
        .sort(({ date: date1 }: BookRecord, { date: date2 }: BookRecord): number => 
          date1.getTime() - date2.getTime()
        )
    }

    // If has param1 but no param2
    if (param1 && !param2) {

      // Filter book records by search query (param)
      bookRecords = this.bookRecords
        .filter(({ name, room, date }: BookRecord) => 
          name === param1  || room === param1 || date.getTime() === new Date(param1).getTime()
        )
    }

    // If has param1 and param2
    if (param1 && param2) {

      // Check if param1 and param2 are valid dates
      if(!isValidDate(param1)) {
        console.error(`[${ param1 }] is not a valid date`);
        return;
      }
      if(!isValidDate(param2)) {
        console.error(`[${ param2 }] is not a valid date`);
        return;
      }

      const startDate = new Date(param1);
      const endDate = new Date(param2);

      // Check if date range is valid
      if (startDate.getTime() > endDate.getTime()) {
        console.error(`[${ param1 }] and [${ param2 }] is not a valid respective start and end date.`);
        return;
      }

      // Filter the bookings on a given date range
      bookRecords = this.bookRecords
        .filter(({ date }: BookRecord) => {
          const bookRecordDate = date.getTime();
          return bookRecordDate >= startDate.getTime() && bookRecordDate <= endDate.getTime();
        })
    }

    // Display book record
    bookRecords.length 
      ? bookRecords.forEach(({ name, date, room }: BookRecord): void => {
          console.log([name, humanizedDate(date), room].join(', '));
        }) 
      : console.log('No result was found');
  }

  displayCalendarBookings(month?: string, year?: number): void {

    // Check if month is valid
    if(month && !Months[month as keyof typeof Months]) {
      console.error(`[${ month }] is not a valid date`);
      return;
    }

    this.#generateCalendarBookings(month, year);
  }

  addRoom(room: string): void {

    // Check if room is valid
    if(!room) {
      console.error(`Room is required and cannot be blank.`);
      return;
    }

    // Check if room already existing in rooms
    if(this.rooms.includes(room)) {
      console.error(`[${ room }] has been already added.`);
      return;
    }

    this.rooms.push(room);
    console.log(`[${ room }] has been successfully added.`);
  }
}