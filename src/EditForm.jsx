import { useLocation } from "react-router-dom";
import { useForm } from './useForm';
import { timeParts } from "./utils/times";

const isValidMeets = (meets) => {
  const parts = timeParts(meets);
  return (meets === '' || (parts.days && !isNaN(parts.hours?.start) && !isNaN(parts.hours?.end)));
};

const validateCourseData = (key, val) => {
  switch (key) {
    case 'title': return /(^$|\w\w)/.test(val) ? '' : 'must be least two characters';
    case 'meets': return isValidMeets(val) ? '' : 'must be days hh:mm-hh:mm';
    default: return '';
  }
};

const submit = (values) => alert(JSON.stringify(values));

export const EditForm = () => {
  const { state: course } = useLocation();
  const [ errors, handleSubmit ] = useForm(validateCourseData, submit);
  return (
    <form onSubmit={handleSubmit} noValidate className={errors ? 'was-validated' : null}>
        <input type="hidden" name="id" value={course.id} />
        <div className="mb-3">
        <label htmlFor="title" className="form-label">Course title</label>
        <input className="form-control" id="title" name="title" defaultValue={course.title} />
        <div className="invalid-feedback">{errors?.title}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="meets" className="form-label">Meeting time</label>
        <input className="form-control" id="meets" name="meets" defaultValue={course.meets} />
        <div className="invalid-feedback">{errors?.meets}</div>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
};
