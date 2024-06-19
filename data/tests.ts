import Test from "./interfaces/Test";
import { python2_2023, python2_retry2023, python2_2021, python2_2022, python2_2024 } from "./exams";

const tests: Map<string, Test> = new Map([
  ["python2_2024", python2_2024],
  ["python2-2023", python2_2023],
  ["python2-retry-2023", python2_retry2023],
  ["python2-2022", python2_2022],
  ["python2-2021", python2_2021],
]);

export default tests;
