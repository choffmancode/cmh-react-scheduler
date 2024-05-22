const terms = { F: 'Fall', W: 'Winter', S: 'Spring'};

const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

const getCourseNumber = course => (
  course.id.slice(1, 4)
);

export const Course = ({ course }) => (
  <div>
    { getCourseTerm(course) } CS { getCourseNumber(course) }: { course.title }
  </div>
);