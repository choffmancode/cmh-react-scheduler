import {Course} from './Course'
import TermSelector from './TermSelector';
import React, { useState } from 'react';
import { getCourseTerm } from '../utils/times';

export const toggle = (x, lst) => (
  lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
);

export const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall');
  const [selected, setSelected] = useState([]);
  const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));
  return (
    <>
      <TermSelector term={term} setTerm={setTerm} />
      <div className="course-list">
      { termCourses.map(course => <Course key={course.term + course.number} course={ course } selected={selected} setSelected={ setSelected } />) }
      </div>
    </>
  );
};
