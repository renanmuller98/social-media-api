import { Request, Response } from 'express';
import db from '../prisma';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Todos os campos são obrigatórios' });
    }

    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const user = await db.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return res
      .status(201)
      .json({ message: 'Usuário criado com sucesso', user });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return res.status(500).json({ message: 'Erro ao criar usuário' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        posts: {
          select: {
            id: true,
            content: true,
            createdAt: true,
          },
        },
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
};
