
exports.updateProject = (req, res) => {

    const id = req.params.id;

    const {
        project_name,
        description,
        status,
        start_date,
        end_date
    } = req.body;

    db.query(
        `UPDATE projects
         SET project_name=?,
             description=?,
             status=?,
             start_date=?,
             end_date=?
         WHERE id=? AND user_id=?`,
        [
            project_name,
            description,
            status,
            start_date,
            end_date,
            id,
            req.user.id
        ],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Project Updated"
            });
        }
    );
};
exports.deleteProject = (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM projects WHERE id=? AND user_id=?",
        [id, req.user.id],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Project Deleted"
            });
        }
    );
};

const db = require("../config/db");

exports.getProjects = (req, res) => {

    db.query(
        "SELECT * FROM projects WHERE user_id=?",
        [req.user.id],
        (err, results) => {

            if (err) return res.status(500).json(err);

            res.json(results);
        }
    );
};

exports.createProject = (req, res) => {

    const {
        project_name,
        description,
        status,
        start_date,
        end_date
    } = req.body;

    db.query(
        `INSERT INTO projects
        (project_name,description,status,start_date,end_date,user_id)
        VALUES(?,?,?,?,?,?)`,
        [
            project_name,
            description,
            status,
            start_date,
            end_date,
            req.user.id
        ],
        (err, result) => {

            if (err) return res.status(500).json(err);

            res.status(201).json({
                message: "Project Created"
            });
        }
    );
};