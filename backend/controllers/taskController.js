const db = require("../config/db");

// Get All Tasks
exports.getTasks = (req, res) => {

    db.query(
        `SELECT t.*
         FROM tasks t
         JOIN projects p ON t.project_id = p.id
         WHERE p.user_id=?`,
        [req.user.id],
        (err, results) => {

            if (err)
                return res.status(500).json(err);

            res.json(results);
        }
    );
};

// Create Task
exports.createTask = (req, res) => {

    console.log("TASK BODY:", req.body);

    const {
        task_name,
        description,
        priority,
        status,
        due_date,
        project_id
    } = req.body;

    db.query(
        `INSERT INTO tasks
        (task_name,description,priority,status,due_date,project_id)
        VALUES(?,?,?,?,?,?)`,
        [
            task_name,
            description,
            priority,
            status,
            due_date,
            project_id
        ],
        (err, result) => {

            if (err) {
                console.log("MYSQL ERROR:", err);
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Task Created"
            });
        }
    );
};

// Update Task
exports.updateTask = (req, res) => {

    const id = req.params.id;

    const {
        task_name,
        description,
        priority,
        status,
        due_date
    } = req.body;

    db.query(
        `UPDATE tasks
         SET task_name=?,
             description=?,
             priority=?,
             status=?,
             due_date=?
         WHERE id=?`,
        [
            task_name,
            description,
            priority,
            status,
            due_date,
            id
        ],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Task Updated"
            });
        }
    );
};

// Delete Task
exports.deleteTask = (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM tasks WHERE id=?",
        [id],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Task Deleted"
            });
        }
    );
};