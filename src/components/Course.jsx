const terms = { F: 'Fall', W: 'Winter', S: 'Spring'};

const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

const getCourseNumber = course => (
  course.id.slice(1, 4)
);

export const Course = ({ course }) => (
  <div className="card m-1 p-2">
    <div className="card-body">
      <h5 className="card-title">{ getCourseTerm(course) } CS { getCourseNumber(course) }</h5>
      <div className="card-text">{ course.title }</div>
    </div>
    <div><hr/></div>
    <div className="text-center">{ course.meets }</div>
  </div>
);