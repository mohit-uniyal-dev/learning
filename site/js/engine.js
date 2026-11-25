/**
 * Core Learning Engine
 * Manages active course, dual-mode context, per-step state isolation,
 * full replay reset, and card shell rendering.
 */
export class LearningEngine {
  constructor({ courses, renderers }) {
    this.courses = courses;
    this.renderers = renderers;
    this.state = {
      courseId: Object.keys(courses)[0],
      mode: "generic",
      stepIndex: 0,
      stepData: {}
    };
  }

  getStepKey(courseId, stepId) {
    return `${courseId}:${stepId}`;
  }

  getStepState(stepId, defaults) {
    const key = this.getStepKey(this.state.courseId, stepId);
    if (!this.state.stepData[key]) {
      this.state.stepData[key] = JSON.parse(JSON.stringify(defaults));
    }
    return this.state.stepData[key];
  }

  resetCourseState() {
    const course = this.courses[this.state.courseId];
    course.steps.forEach((s) => {
      delete this.state.stepData[this.getStepKey(this.state.courseId, s.id)];
    });
    this.state.stepIndex = 0;
    this.render();
  }

  init() {
    const courseSelect = document.getElementById("courseSelect");
    courseSelect.innerHTML = Object.entries(this.courses)
      .map(([id, c]) => `<option value="${id}">${c.title}</option>`)
      .join("");

    courseSelect.onchange = (e) => {
      this.state.courseId = e.target.value;
      this.state.stepIndex = 0;
      this.render();
    };

    document.querySelectorAll(".mode-btn").forEach((btn) => {
      btn.onclick = () => {
        this.state.mode = btn.getAttribute("data-mode");
        this.render();
      };
    });

    document.getElementById("globalResetBtn").onclick = () => this.resetCourseState();
    this.render();
  }

  render() {
    const course = this.courses[this.state.courseId];
    const total = course.steps.length;
    if (this.state.stepIndex >= total) this.state.stepIndex = 0;

    const step = course.steps[this.state.stepIndex];
    const ctx = course.supportsModes && course.modes ? course.modes[this.state.mode] : null;

    // Mode Switcher visibility & active state
    const switcher = document.getElementById("modeSwitcher");
    switcher.style.display = course.supportsModes ? "inline-flex" : "none";
    switcher.querySelectorAll(".mode-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-mode") === this.state.mode);
    });

    // Progress Header
    document.getElementById("stepCounter").textContent = `Step ${this.state.stepIndex + 1} of ${total}`;
    document.getElementById("modeIndicator").textContent = ctx
      ? `Mode: ${ctx.label}`
      : `Course: ${course.title}`;

    const segWrap = document.getElementById("progressSegments");
    segWrap.style.gridTemplateColumns = `repeat(${total}, 1fr)`;
    segWrap.innerHTML = course.steps
      .map((_, idx) => {
        const cls = idx < this.state.stepIndex ? "done" : idx === this.state.stepIndex ? "current" : "";
        return `<button class="segment ${cls}" data-goto="${idx}" aria-label="Go to step ${idx + 1}"></button>`;
      })
      .join("");

    segWrap.querySelectorAll("[data-goto]").forEach((seg) => {
      seg.onclick = () => {
        this.state.stepIndex = Number(seg.getAttribute("data-goto"));
        this.render();
      };
    });

    // Lesson Card Shell
    const card = document.getElementById("lessonCard");
    card.innerHTML = `
      <span class="step-kicker">${step.kicker}</span>
      <h1 class="step-title">${step.title}</h1>
      <p class="step-lead">${step.lead}</p>
      <div id="widgetMount"></div>
      <div class="takeaway">${step.takeaway}</div>
      <footer class="card-footer">
        <button id="prevBtn" class="btn" ${this.state.stepIndex === 0 ? "disabled" : ""}>← Previous</button>
        <button id="nextBtn" class="btn btn-primary">
          ${this.state.stepIndex === total - 1 ? "↺ Replay from Start" : "Continue →"}
        </button>
      </footer>
    `;

    const mount = document.getElementById("widgetMount");
    const renderer = this.renderers[step.widget];
    if (renderer) {
      renderer(mount, step, ctx, {
        getStepState: (id, defaults) => this.getStepState(id, defaults),
        render: () => this.render(),
        resetCourseState: () => this.resetCourseState()
      });
    }

    document.getElementById("prevBtn").onclick = () => {
      if (this.state.stepIndex > 0) {
        this.state.stepIndex--;
        this.render();
      }
    };

    document.getElementById("nextBtn").onclick = () => {
      if (this.state.stepIndex < total - 1) {
        this.state.stepIndex++;
        this.render();
      } else {
        this.resetCourseState();
      }
    };
  }
}
