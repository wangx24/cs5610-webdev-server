import AssignmentsDao from "./dao";
export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);
  const findAssignmentsForCourse = async (req, res) => {
    const assignments = await dao.findAssignmentsForCourse(req.params.courseId);
    res.json(assignments);
  };
  const createAssignmentForCourse = async (req, res) => {
    const created = await dao.createAssignment({
      ...req.body,
      course: req.params.courseId,
    });
    res.json(created);
  };
  const updateAssignment = async (req, res) => {
    const status = await dao.updateAssignment(req.params.assignmentId, req.body);
    res.send(status);
  };
  const deleteAssignment = async (req, res) => {
    const status = await dao.deleteAssignment(req.params.assignmentId);
    res.send(status);
  };
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}