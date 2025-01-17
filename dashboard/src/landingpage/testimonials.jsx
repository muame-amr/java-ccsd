import React, { useState } from 'react';

const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 h-full flex flex-col transition-all duration-300 hover:shadow-xl">
    {/* Quote Icon */}
    <div className="mb-6">
      <svg
        className="w-8 h-8 text-indigo-500"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.999v10h-9.999z" />
      </svg>
    </div>

    {/* Testimonial Content */}
    <div className="flex-grow">
      <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
    </div>

    {/* Author Info */}
    <div className="flex items-center">
      <div className="flex-shrink-0">
        {testimonial.img ? (
          <img
            src={testimonial.img}
            alt={testimonial.name}
            className="h-12 w-12 rounded-full object-cover border-2 border-indigo-100"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-indigo-600 font-semibold text-lg">
              {testimonial.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="ml-4">
        <div className="font-semibold text-gray-900">{testimonial.name}</div>
        {testimonial.position && (
          <div className="text-sm text-gray-500">{testimonial.position}</div>
        )}
      </div>
    </div>
  </div>
);

export const Testimonials = ({ data = [] }) => {
  const [activePage, setActivePage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  const visibleTestimonials = data.slice(
    activePage * itemsPerPage,
    (activePage + 1) * itemsPerPage
  );

  // Show loading state if no data is provided
  if (!data || data.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <svg
                className="w-8 h-8 text-gray-400 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
            <p className="text-gray-500">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full mb-8" />
          <p className="text-white max-w-2xl mx-auto">
            Discover why our clients trust us with their IT needs
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {visibleTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.name}-${index}`}
              testimonial={testimonial}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setActivePage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 
                  ${activePage === index 
                    ? 'bg-indigo-600 w-6' 
                    : 'bg-gray-300 hover:bg-indigo-400'
                  }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;