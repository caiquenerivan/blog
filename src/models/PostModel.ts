
import pool from "../settings/db.js";
import { Post } from "interfaces/Post.js";

const PostModel = {
    async findAll(): Promise<Post[]> {
        const { rows } = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
        return rows;
    },

    async findById(id: number): Promise<Post | null> {
        const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
        return rows[0] || null;
    },

    async create({ title, description, body, photo }: { title: string; description: string; body: string; photo: string }) {
        const { rows } = await pool.query(
            'INSERT INTO posts (title, description, body, photo) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, description, body, photo]
        );
        return rows[0];
    },

    async update(id: number, post: Post): Promise<Post | null> {
        const { title, body, description, photo } = post;
        const { rows } = await pool.query(
            'UPDATE posts SET title = $1, description = $2, body = $3, photo = $4 WHERE id = $5 RETURNING *',
            [title, body, description, photo, id]
        );
        return rows[0] || null;
    },

    async delete(id: number): Promise<void> {
        await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    },
};

export default PostModel