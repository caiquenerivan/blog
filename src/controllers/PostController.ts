// src/controllers/PostController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import PostModel from '../models/PostModel.js';
import { Post } from '../interfaces/Post.js';
import { StatusCodes } from "http-status-codes";


const PostController = {
    async listPosts(request: FastifyRequest, reply: FastifyReply) {
        try {
            const posts = await PostModel.findAll();
            reply.status(StatusCodes.OK).send(posts);
        } catch (error) {
            reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro ao buscar posts' });
        }
    },

    async getPost(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = request.params;
            const post = await PostModel.findById(parseInt(id, 10));
            if (!post) {
                reply.status(StatusCodes.NOT_FOUND).send({ error: 'Post não encontrado' });
            } else {
                reply.status(StatusCodes.OK).send(post);
            }
        } catch (error) {
            reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro ao buscar post' });
        }
    },

    async createPost(request: FastifyRequest<{ Body: { title: string; description: string; body: string; photo: string } }>, reply: FastifyReply) {
        try {
            const { title, description, body, photo } = request.body;
            const newPost = await PostModel.create({ title, description, body, photo });
            reply.status(201).send(newPost);
        } catch (error) {
            console.error('Erro ao criar post:', error);
            reply.status(500).send({ error: 'Erro ao criar post' });
        }
    },

    async updatePost(
        request: FastifyRequest<{ Params: { id: string }; Body: Post }>,
        reply: FastifyReply
    ) {
        try {
            const { id } = request.params;
            const post = await PostModel.update(parseInt(id, 10), request.body);
            if (!post) {
                reply.status(StatusCodes.NOT_FOUND).send({ error: 'Post não encontrado' });
            } else {
                reply.send(post);
            }
        } catch (error) {
            reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro ao atualizar post' });
        }
    },

    async deletePost(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = request.params;
            await PostModel.delete(parseInt(id, 10));
            reply.status(StatusCodes.OK).send({ message: 'Post deletado com sucesso' });
        } catch (error) {
            reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro ao deletar post' });
        }
    },
};

export default PostController;