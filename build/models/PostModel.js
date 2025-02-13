import pool from "../settings/db.js";
const PostModel = {
    async findAll() {
        const { rows } = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
        return rows;
    },
    async findById(id) {
        const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
        return rows[0] || null;
    },
    async create({ title, description, body, photo }) {
        const { rows } = await pool.query('INSERT INTO posts (title, description, body, photo) VALUES ($1, $2, $3, $4) RETURNING *', [title, description, body, photo]);
        return rows[0];
    },
    async update(id, post) {
        const { title, body, description, photo } = post;
        const { rows } = await pool.query('UPDATE posts SET title = $1, description = $2, body = $3, photo = $4 WHERE id = $5 RETURNING *', [title, body, description, photo, id]);
        return rows[0] || null;
    },
    async delete(id) {
        await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    },
};
export default PostModel;
