const db = require("../config/db");

exports.getDashboard = (req, res) => {

    const userId = req.user.id;

    const dashboard = {};

    db.query(
        "SELECT COUNT(*) AS totalProjects FROM projects WHERE user_id=?",
        [userId],
        (err, projectResult) => {

            if (err) return res.status(500).json(err);

            dashboard.totalProjects =
                projectResult[0].totalProjects;

            db.query(
                `SELECT COUNT(*) AS totalTasks
                 FROM tasks t
                 JOIN projects p
                 ON t.project_id = p.id
                 WHERE p.user_id=?`,
                [userId],
                (err, taskResult) => {

                    if (err) return res.status(500).json(err);

                    dashboard.totalTasks =
                        taskResult[0].totalTasks;

                    db.query(
                        `SELECT COUNT(*) AS completedTasks
                         FROM tasks t
                         JOIN projects p
                         ON t.project_id = p.id
                         WHERE p.user_id=?
                         AND t.status='Completed'`,
                        [userId],
                        (err, completedResult) => {

                            if (err) return res.status(500).json(err);

                            dashboard.completedTasks =
                                completedResult[0].completedTasks;

                            db.query(
    `SELECT COUNT(*) AS inProgressProjects
     FROM projects
     WHERE user_id=?
     AND status='In Progress'`,
    [userId],
    (err, progressResult) => {

        if (err) return res.status(500).json(err);

        dashboard.inProgressProjects =
            progressResult[0].inProgressProjects;

        res.json(dashboard);
    }
);
                        }
                    );
                }
            );
        }
    );
};