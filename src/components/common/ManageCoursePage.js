import React, { useState, useEffect } from "react";
import CourseForm from "../CourseForm";
import * as courseAPi from "../../api/courseApi";
import { toast } from "react-toastify";

const ManageCoursePage = (props) => {
  const [error, setError] = useState({});
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  useEffect(() => {
    const slug = props.match.params.slug;
    if (slug) {
      courseAPi.getCourseBySlug(slug).then((_course) => setCourse(_course));
    }
  }, [props.match.params.slug]);

  function handeChange({ target }) {
    setCourse({ ...course, [target.name]: target.value });
  }

  function formIsValid() {
    const _error = {};

    if (!course.title) _error.title = "Title is Requierd";
    if (!course.authorId) _error.authorId = "authorId is Requierd";
    if (!course.category) _error.category = "category is Requierd";
    setError(_error);
    return Object.keys(_error).length === 0;
  }
  function handelSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseAPi.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Hi UDU");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        error={error}
        course={course}
        onChange={handeChange}
        onSubmit={handelSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
