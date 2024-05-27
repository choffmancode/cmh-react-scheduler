import {toggle, CourseList} from "./CourseList";

export const terms = { F: 'Fall', W: 'Winter', S: 'Spring'};


export const getCourseTerm = course => (
  course.term
);

const getCourseNumber = course => (
  course.number
);

const hasConflict = (course, selected) => (
  selected.some(selection => courseConflict(course, selection))
);

const meetsPat = /^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/;

const timeParts = meets => {
  const [match, days, hh1, mm1, hh2, mm2] = meetsPat.exec(meets) || [];
  return !match ? {} : {
    days,
    hours: {
      start: hh1 * 60 + mm1 * 1,
      end: hh2 * 60 + mm2 * 1
    }
  };
};

const mapValues = (fn, obj) => (
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)]))
);

const addCourseTimes = course => ({
  ...course,
  ...timeParts(course.meets)
});

const days = ['M', 'Tu', 'W', 'Th', 'F'];

const daysOverlap = (days1, days2) => ( 
  days.some(day => days1.includes(day) && days2.includes(day))
);

const hoursOverlap = (hours1, hours2) => (
  Math.max(hours1.start, hours2.start) < Math.min(hours1.end, hours2.end)
);

const timeConflict = (course1, course2) => (
  daysOverlap(course1.days, course2.days) && hoursOverlap(course1.hours, course2.hours)
);

const courseConflict = (course1, course2) => (
  getCourseTerm(course1) === getCourseTerm(course2)
  && timeConflict(course1, course2)
);

export const addScheduleTimes = schedule => ({
  title: schedule.title,
  courses: mapValues(addCourseTimes, schedule.courses)
});

export const Course = ({ course, selected, setSelected }) => {
  const isSelected = selected.includes(course);
  const isDisabled = !isSelected && hasConflict(course, selected);
  const style = {
    backgroundColor: isDisabled? 'lightgrey' : isSelected ? 'lightgreen' : 'white'
  };
  return (
    <div className="card m-1 p-2"
    style={style}
      onClick={isDisabled ? null : () => setSelected(toggle(course, selected))}>
      <div className="card-body">
        <div className="card-title">{ getCourseTerm(course) } CS { getCourseNumber(course) }</div>
        <div className="card-text">{ course.title }</div>
    </div>
    <div><hr/></div>
    <div className="text-center">{ course.meets }</div>
  </div>
);
};