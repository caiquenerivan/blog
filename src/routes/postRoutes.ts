import { FastifyInstance } from 'fastify';
import PostController from '../controllers/PostController.js';

const postRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/posts', PostController.listPosts);
  fastify.get('/posts/:id', PostController.getPost);
  fastify.post('/posts', PostController.createPost);
  fastify.put('/posts/:id', PostController.updatePost);
  fastify.delete('/posts/:id', PostController.deletePost);
};

export default postRoutes;