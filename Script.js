// Get current date and time
let currentDate = moment().format('dddd, MMMM Do');
let currentHour = moment().format('H');

// Display current date on the page
$('#currentDay').text(currentDate);

// Create timeblocks for standard business hours (9am to 5pm)
for (let i = 1; i <= 24; i++) {
  // Create elements for each timeblock
  let row = $('<div>').addClass('row timeblock');
  let hour = $('<div>').addClass('hour col-2').text(`${i}:00`);
  let description = $('<textarea>').addClass('description col-8');
  let saveBtn = $('<button>').addClass('saveBtn col-2').html('<i class="fas fa-save"></i>');

  // Append elements to row
  row.append(hour, description, saveBtn);

  // Append row to container
  $('.container').append(row);

  // Check if timeblock is in the past, present, or future
  if (i < currentHour) {
    row.addClass('past');
  } else if (i === currentHour) {
    row.addClass('present');
  } else {
    row.addClass('future');
  }

  // Retrieve saved events from local storage and display them in the corresponding timeblock
  let savedEvent = localStorage.getItem(`${i}:00`);
  if (savedEvent !== null) {
    description.val(savedEvent);
  }
}

// Save event to local storage when save button is clicked
$('.saveBtn').on('click', function() {
  let hour = $(this).siblings('.hour').text();
  let event = $(this).siblings('.description').val();

  localStorage.setItem(hour, event);
});
