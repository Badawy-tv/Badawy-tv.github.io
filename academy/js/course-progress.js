import { db } from "./firebase-config.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const userID = "student_demo"; // temporary student ID

export async function markLessonComplete(course, lesson) {

  const ref = doc(db, "students", userID);

  const snapshot = await getDoc(ref);

  let data = {};

  if (snapshot.exists()) {
    data = snapshot.data();
  }

  if (!data.courses) data.courses = {};
  if (!data.courses[course]) data.courses[course] = {};

  data.courses[course][lesson] = true;

  await setDoc(ref, data);

  checkCourseCompletion(course, data.courses[course]);
}

function checkCourseCompletion(course, lessons) {

  if (
    lessons.lesson1 &&
    lessons.lesson2 &&
    lessons.lesson3 &&
    lessons.lesson4
  ) {
    window.location.href = "/academy/course-complete.html?course=" + course;
  }

}
