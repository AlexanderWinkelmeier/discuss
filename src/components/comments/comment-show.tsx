import type { CommentWithAutor } from '@/db/queries/comments';
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import CommentCreateForm from '@/components/comments/comment-create-form';
import { fetchCommentsByPostId } from '@/db/queries/comments';

interface CommentShowProps {
  commentId: string;
  // comments: CommentWithAutor[];
  postId: string;
}

export default async function CommentShow({
  commentId,
  postId,
}: CommentShowProps) {
  const comments = await fetchCommentsByPostId(postId);
  const comment = comments.find((c) => c.id === commentId);

  // Abbruchbedingung der Rekursion
  if (!comment) {
    return null;
  }

  const children = comments.filter((c) => c.parentId === commentId);
  const renderedChildren = children.map((child) => {
    return (
      // Rekursion: die Component ruft sich selbst auf
      <CommentShow key={child.id} commentId={child.id} postId={postId} />
    );
  });

  return (
    <div className="p-4 border mt-2 mb-1">
      <div className="flex gap-3">
        <Image
          src={comment.user.image || ''}
          alt="user image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium text-gray-500">
            {comment.user.name}
          </p>
          <p className="text-gray-900">{comment.content}</p>

          <CommentCreateForm postId={comment.postId} parentId={comment.id} />
        </div>
      </div>
      <div className="pl-4">{renderedChildren}</div>
    </div>
  );
}

// Komponenten-Logik:
// Die Komponente sucht den Kommentar mit der angegebenen commentId im comments-Array.
// Wenn kein passender Kommentar gefunden wird, gibt die Komponente null zurück.
// Andernfalls werden die Kinderkommentare (Antworten) für den gefundenen Kommentar gefiltert und gerendert.
// Die gerenderten Kinderkommentare werden rekursiv mit derselben CommentShow-Komponente dargestellt.
// Darstellung:
// Die Komponente rendert den gefundenen Kommentar und seine Kinderkommentare.
// Jeder Kommentar wird mit dem Benutzerbild, dem Benutzernamen und dem Kommentarinhalt angezeigt.
// Unter jedem Kommentar befindet sich ein Formular (CommentCreateForm), um neue Antworten zu erstellen.
// Die Kinderkommentare werden eingerückt, um die Hierarchie anzuzeigen.
