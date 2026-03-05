const assignments = [
  {
    title: "Assignment 2",
    course: "BUS 343",
    due: "2026-03-18T23:59:00",
    priority: "high"
  },
  {
    title: "Quiz 4",
    course: "BUS 321",
    due: "2026-03-12T20:00:00",
    priority: "medium"
  },
  {
    title: "Group Reflection",
    course: "BUS 251",
    due: "2026-03-25T17:00:00",
    priority: "low"
  },
  {
    title: "Case Discussion Post",
    course: "BUS 237",
    due: "2026-03-09T18:30:00",
    priority: "high"
  }
];

const grid = document.getElementById("assignmentGrid");
const courseFilter = document.getElementById("courseFilter");
const sortBy = document.getElementById("sortBy");

function dueStatus(dateStr) {
  const now = new Date();
  const due = new Date(dateStr);
  const diffMs = due - now;

  if (diffMs <= 0) {
    return { label: "Overdue", className: "overdue" };
  }

  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;

  if (totalHours < 48) {
    return { label: `${days}d ${hours}h left`, className: "soon" };
  }

  return { label: `${days}d ${hours}h left`, className: "ok" };
}

function prettyPriority(priority) {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

function sortAssignments(list, type) {
  const sorted = [...list];

  if (type === "priority") {
    const rank = { high: 0, medium: 1, low: 2 };
    sorted.sort((a, b) => rank[a.priority] - rank[b.priority]);
  } else if (type === "course") {
    sorted.sort((a, b) => a.course.localeCompare(b.course));
  } else {
    sorted.sort((a, b) => new Date(a.due) - new Date(b.due));
  }

  return sorted;
}

function render() {
  const selectedCourse = courseFilter.value;
  const selectedSort = sortBy.value;

  const filtered = assignments.filter((item) => {
    if (selectedCourse === "all") {
      return true;
    }
    return item.course === selectedCourse;
  });

  const sorted = sortAssignments(filtered, selectedSort);

  if (!sorted.length) {
    grid.innerHTML = "<p>No assignments for this filter.</p>";
    return;
  }

  grid.innerHTML = sorted
    .map((item) => {
      const due = new Date(item.due);
      const status = dueStatus(item.due);
      return `
        <article class="card">
          <h3>${item.title}</h3>
          <p class="meta"><strong>Course:</strong> ${item.course}</p>
          <p class="meta"><strong>Due:</strong> ${due.toLocaleString()}</p>
          <span class="priority ${item.priority}">${prettyPriority(item.priority)} Priority</span>
          <span class="countdown ${status.className}">${status.label}</span>
        </article>
      `;
    })
    .join("");
}

function initCourseOptions() {
  const uniqueCourses = [...new Set(assignments.map((a) => a.course))].sort();
  for (const course of uniqueCourses) {
    const opt = document.createElement("option");
    opt.value = course;
    opt.textContent = course;
    courseFilter.appendChild(opt);
  }
}

initCourseOptions();
render();

courseFilter.addEventListener("change", render);
sortBy.addEventListener("change", render);

setInterval(render, 60 * 1000);
