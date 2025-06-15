import { Request, Response } from 'express';
import db from '../prisma';

export const createPost = async (req: Request, res: Response) => {
  try {
    const { content, userId } = req.body;

    if (!content || !userId) {
      return res
        .status(400)
        .json({ message: 'Todos os campos são obrigatórios' });
    }

    const post = await db.post.create({
      data: {
        content,
        authorId: userId,
      },
    });

    return res.status(201).json({ message: 'Post criado com sucesso', post });
  } catch (error) {
    console.error('Erro ao criar post:', error);
    return res.status(500).json({ message: 'Erro ao criar post' });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await db.post.findMany();
    return res.status(200).json(posts);
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return res.status(500).json({ message: 'Erro ao buscar posts' });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'ID do post é obrigatório' });
    }

    const post = await db.post.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({ message: 'Post deletado com sucesso', post });
  } catch (error) {
    console.error('Erro ao deletar post:', error);
    return res.status(500).json({ message: 'Erro ao deletar post' });
  }
};
