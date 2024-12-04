// Course Data
const courses = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      category: 'web',
      image: 'https://blog.pwskills.com/wp-content/uploads/2023/05/Untitled-1-1.png',
      rating: 4.8,
      students: 1234,
      price: 99.99,
      instructor: 'John Doe',
      tag: 'Best Seller'
    },
    {
      id: 2,
      title: 'iOS & Android App Development',
      category: 'mobile',
      image: 'https://hashstudioz.com/blog/wp-content/uploads/2020/12/key-differences-between-android-and-ios.png',
      rating: 4.7,
      students: 856,
      price: 89.99,
      instructor: 'Jane Smith',
      tag: 'New'
    },
    {
      id: 3,
      title: 'Data Science & Machine Learning',
      category: 'data',
      image: 'https://www.moviesonline.ca/wp-content/uploads/2023/02/What-Skills-Do-I-Need-to-Become-a-Data-Scientist.jpg',
      rating: 4.9,
      students: 978,
      price: 129.99,
      instructor: 'Mike Johnson',
      tag: 'Popular'
    },
  ];
  
  // Course Filtering
  const courseGrid = document.querySelector('.courses-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  const createCourseCard = (course) => {
    return `
      <div class="course-card" data-category="${course.category}">
        <img src="${course.image}" alt="${course.title}" class="course-image">
        <div class="course-content">
          <span class="course-tag tag-${course.category}">${course.tag}</span>
          <h3 class="course-title">${course.title}</h3>
          <p class="course-instructor">By ${course.instructor}</p>
          <div class="course-info">
            <div class="course-rating">
              <i class="fas fa-star"></i>
              <span>${course.rating}</span>
              <span>(${course.students} students)</span>
            </div>
            <div class="course-price">$${course.price}</div>
          </div>
        </div>
      </div>
    `;
  };
  
  const filterCourses = (category) => {
    const filteredCourses = category === 'all' 
      ? courses 
      : courses.filter(course => course.category === category);
    
    courseGrid.innerHTML = filteredCourses.map(createCourseCard).join('');
  };
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      filterCourses(button.getAttribute('data-filter'));
    });
  });
  
  filterCourses('all');