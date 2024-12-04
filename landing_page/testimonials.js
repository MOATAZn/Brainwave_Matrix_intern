// Testimonials Data
const testimonials = [
    {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Web Developer',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
        text: 'The courses here transformed my career. I went from knowing nothing about web development to landing my dream job in just 6 months!'
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'Data Scientist',
        avatar: 'https://media.istockphoto.com/id/1915382108/photo/smiling-friendly-confident-millennial-caucasian-lady-manager-teacher-in-formal-wear-with.jpg?s=1024x1024&w=is&k=20&c=zNqoVeTWpYOWHh-32ISLi-nC5p8PUyWsnAxKJW4yekM=',
        text: 'The data science course was exactly what I needed to transition into AI and machine learning. The instructors are top-notch!'
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        role: 'Mobile Developer',
        avatar:'https://cdn.pixabay.com/photo/2022/05/05/01/13/woman-7175038_960_720.jpg',
        text: `I learned iOS development here and now Im building my own apps. The practical projects really helped me understand complex concepts.`
    },
    {
        id: 4,
        name: 'David Park',
        role: 'UX Designer',
        avatar: 'https://media.istockphoto.com/id/1919265357/photo/close-up-portrait-of-confident-businessman-standing-in-office.jpg?s=2048x2048&w=is&k=20&c=b31q8IXUnas7j0DCl8eMrAWMVj8YG14cP7lw5eF8TrQ=',
        text: 'The UX design program exceeded my expectations. The mentorship and real-world projects gave me the confidence to switch careers.'
    },
    {
        id: 5,
        name: 'Lisa Thompson',
        role: 'Cloud Architect',
        avatar: 'https://media.istockphoto.com/id/1502797939/photo/portrait-of-an-attractive-brunette-haired-woman-cheerful-smiling-against-isolated-background.jpg?s=2048x2048&w=is&k=20&c=UDn763a_wCfdCrDlfqtwNG1GOG_8RT0xZOVqJ1SO9AA=',
        text: 'Learning cloud architecture here was a game-changer. The hands-on labs and AWS certification prep were invaluable.'
    },
    {
        id: 6,
        name: 'James Wilson',
        role: 'Blockchain Developer',
        avatar: 'https://media.istockphoto.com/id/1413765604/photo/successful-mid-adult-business-man-looking-away.jpg?s=2048x2048&w=is&k=20&c=s_X7es6S85UnreyMpXBqAFxyqRpk1oUS-YDYCiuwX6g=',
        text:`'The blockchain development course was comprehensive and up-to-date. Im now working on cutting-edge DeFi projects.`
    }
];
  
  // Testimonials Slider
  const testimonialCards = document.querySelector('.testimonial-cards');
  const prevButton = document.querySelector('.slider-btn.prev');
  const nextButton = document.querySelector('.slider-btn.next');
  let currentSlide = 0;
  
  const createTestimonialCard = (testimonial) => {
    return `
      <div class="testimonial-card">
        <div class="testimonial-header">
          <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar">
          <div class="testimonial-info">
            <h4>${testimonial.name}</h4>
            <span>${testimonial.role}</span>
          </div>
        </div>
        <p class="testimonial-text">${testimonial.text}</p>
      </div>
    `;
  };
  
  const updateSlider = () => {

    testimonialCards.style.transform = `translateX(-${currentSlide * 100}%)`;
  };
  
  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % testimonials.length;
    updateSlider();
  };
  
  const prevSlide = () => {
    currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
    updateSlider();
  };
  
  // Initialize testimonials
  testimonialCards.innerHTML = testimonials.map(createTestimonialCard).join('');
  
  // Event listeners
  prevButton?.addEventListener('click', prevSlide);
  nextButton?.addEventListener('click', nextSlide);
  
  // Auto-slide
//   setInterval(nextSlide, 5000);
