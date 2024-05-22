import {Course} from './Course'

export const CourseList = ({ courses }) => (
  <div>
    { Object.values(courses).map(course => <Course key={course.id} course={ course } />) }
  </div>
);