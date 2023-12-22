document.addEventListener('DOMContentLoaded', () => {

  const coursesApiUrl = 'https://private-e05942-courses22.apiary-mock.com/courses';

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
    const courseDropdownElement = document.getElementById('courseDropdown');

    courseDropdownElement.innerHTML = '';

    courses.forEach(course => {
      const optionElement = document.createElement('option');
      optionElement.value = course.slug;
      optionElement.textContent = course.title;

      courseDropdownElement.appendChild(optionElement);
    })
  }
});