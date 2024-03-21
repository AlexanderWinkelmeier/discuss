import type { Comment } from '@prisma/client';
import { db } from '@/db';
import { cache } from 'react';

export type CommentWithAutor = Comment & {
  user: { name: string | null; image: string | null };
};

export const fetchCommentsByPostId = cache(
  (postId: string): Promise<CommentWithAutor[]> => {
    console.log('Making a query');
    return db.comment.findMany({
      where: { postId },
      include: {
        user: { select: { name: true, image: true } },
      },
    });
  }
);
