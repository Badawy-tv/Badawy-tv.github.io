
const raised = 12450;
const goal = 50000;

const percent = (raised/goal)*100;

document.getElementById("progress-fill").style.width = percent + "%";

