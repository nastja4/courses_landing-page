document.addEventListener('DOMContentLoaded', () => {

  const coursesApiUrl = 'https://private-e05942-courses22.apiary-mock.com/courses';

  const courseDropdownElement = document.getElementById('courseDropdown');
  const courseInfoElement = document.getElementById('courseInfo');
  const totalPriceElement = document.getElementById('totalPrice');
  const nextStartDateElement = document.getElementById('nextStartDate');
  const followingStartDatesElement = document.getElementById('followingStartDates');

  fetchCourses();

  function fetchCourses() {
    fetch(coursesApiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(courses => {
        displayCourses(courses);
      })
      .catch(error =>{
        console.error('Error fetching courses:', error.message);
      });      
  }


  function displayCourses(courses) {    
    courseDropdownElement.innerHTML = '';

    courses.forEach(course => {
      const optionElement = document.createElement('option');
      optionElement.value = course.slug;
      optionElement.textContent = course.title;

      courseDropdownElement.appendChild(optionElement);
    })

    // Add event listener to the dropdown
    courseDropdownElement.addEventListener('change', () => {
      const selectedCourseSlug = courseDropdownElement.value;

      // Fetch course details based on the selected course slug
      fetch(`${coursesApiUrl}/${selectedCourseSlug}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(courseDetails => {
          displayCourseDetails(courseDetails);          
        })
        .catch(error => {
          console.error('Error fetching course details:', error.message);
        })
    })
  }


  function displayCourseDetails(courseDetails) {   
    courseInfoElement.innerHTML = `<p>${courseDetails.description}</p>`;

    // Additional dateils here
    totalPriceElement.textContent = `${courseDetails.prices[0].currency} ${courseDetails.prices[0].amount} / ${courseDetails.prices[1].currency} ${courseDetails.prices[1].amount}`;
    nextStartDateElement.textContent = `${courseDetails.start_dates[0]}`;
    followingStartDatesElement.textContent = `${courseDetails.start_dates[1]}, ${courseDetails.start_dates[2]}`;
  }
});