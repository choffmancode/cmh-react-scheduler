import {Course} from './Course'

export const CourseList = ({ courses }) => (
  <div className="course-list">
    { Object.values(courses).map(course => <Course key={course.term + course.number} course={ course } />) }
  </div>
);