import {toggle} from './CourseList';
import {hasConflict, getCourseTerm, getCourseNumber} from '../utils/times';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useUserState } from '../utils/firebase';

export const Course = ({ course, selected, setSelected }) => {
  const navigate = useNavigate();
  const isSelected = selected.includes(course);
  const isDisabled = !isSelected && hasConflict(course, selected);
  const user = useUserState();
  const isLoggedIn = user['0']?.uid
  const style = {
    backgroundColor: isDisabled? 'lightgrey' : isSelected ? 'lightgreen' : 'white'
  };
  return (
    <div className="card m-1 p-2"
    style={style}
      onClick={isDisabled ? null : () => setSelected(toggle(course, selected))}
      onDoubleClick={!isLoggedIn ? null : () => navigate('/edit', { state: course })}>
      <div className="card-body">
        <div className="card-title">{ getCourseTerm(course) } CS { getCourseNumber(course) }</div>
        <div className="card-text">{ course.title }</div>
    </div>
    <div><hr/></div>
    <div className="text-center">{ course.meets }</div>
  </div>
);
};