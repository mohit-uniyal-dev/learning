import { LearningEngine } from "./engine.js";
import { WidgetRenderers } from "./widgets.js";
import { agentHarnessCourse } from "./courses/agent-harness.js";
import { runtimeMemoryCourse } from "./courses/runtime-memory.js";
import { dsaTwoPointerCourse } from "./courses/dsa-two-pointer.js";

const courses = {
  [agentHarnessCourse.id]: agentHarnessCourse,
  [runtimeMemoryCourse.id]: runtimeMemoryCourse,
  [dsaTwoPointerCourse.id]: dsaTwoPointerCourse
};

const engine = new LearningEngine({
  courses,
  renderers: WidgetRenderers
});

engine.init();
