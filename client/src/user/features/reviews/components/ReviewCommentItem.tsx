import { useState, type FormEvent } from "react";
import { FiCheck, FiEdit2, FiX } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";

import type { ReviewComment } from "../types/review";

interface ReviewCommentItemProps {
  comment: ReviewComment;
  currentUserId: string | null;
  canModerate: boolean;
  manageMode: boolean;
  selected: boolean;
  pending: boolean;
  onSelect: (commentId: string, selected: boolean) => void;
  onEdit: (commentId: string, content: string) => Promise<void>;
  onDelete: (commentId: string) => void;
  onVisibility: (commentId: string, isVisible: boolean) => void;
}

function ReviewCommentItem({
  comment,
  currentUserId,
  canModerate,
  manageMode,
  selected,
  pending,
  onSelect,
  onEdit,
  onDelete,
  onVisibility,
}: ReviewCommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const commentUserId =
    typeof comment.user === "object" ? comment.user._id : comment.user;
  const userName =
    typeof comment.user === "object" ? comment.user.fullName : "Customer";
  const isAuthor = Boolean(currentUserId && commentUserId === currentUserId);

  const submitEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedContent = content.trim();
    if (!normalizedContent || normalizedContent.length > 1000) {
      return;
    }

    try {
      await onEdit(comment._id, normalizedContent);
      setIsEditing(false);
    } catch {
      // The mutation reports the error and leaves the edit form available.
    }
  };

  return (
    <article
      className={`min-w-0 rounded-xl border p-4 ${
        comment.isVisible
          ? "border-white/10 bg-[#111827]"
          : "border-amber-500/20 bg-amber-500/5"
      }`}
    >
      <div className="flex min-w-0 items-start gap-3">
        {manageMode && canModerate ? (
          <input
            type="checkbox"
            checked={selected}
            onChange={(event) => onSelect(comment._id, event.target.checked)}
            aria-label={`Select ${userName}'s comment`}
            className="mt-1 h-5 w-5 shrink-0 accent-violet-500"
          />
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="break-words text-sm font-semibold text-white">
              {userName}
            </p>
            {!comment.isVisible ? (
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-200">
                Hidden from other users
              </span>
            ) : null}
          </div>

          {isEditing ? (
            <form onSubmit={submitEdit} className="mt-3 space-y-2">
              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                maxLength={1000}
                rows={3}
                aria-label="Edit comment"
                className="w-full resize-y rounded-lg border border-white/10 bg-[#0B1220] px-3 py-2 text-sm text-white outline-none focus:border-violet-500"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  disabled={pending || !content.trim() || content.length > 1000}
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-violet-600 px-3 text-sm font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FiCheck aria-hidden="true" />
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setContent(comment.content);
                    setIsEditing(false);
                  }}
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-sm text-slate-200 transition hover:bg-white/5"
                >
                  <FiX aria-hidden="true" />
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-300 [overflow-wrap:anywhere]">
              {comment.content}
            </p>
          )}

          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <time
              dateTime={comment.createdAt}
              className="text-xs text-slate-500"
            >
              {new Date(comment.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>

            <div className="flex flex-wrap items-center gap-2">
              {!isEditing && isAuthor ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2 text-xs text-slate-300 transition hover:bg-white/5 hover:text-white"
                  >
                    <FiEdit2 aria-hidden="true" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(comment._id)}
                    disabled={pending}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2 text-xs text-red-300 transition hover:bg-red-500/10 disabled:opacity-50"
                  >
                    <FiTrash2 aria-hidden="true" />
                    Delete
                  </button>
                </>
              ) : null}

              {manageMode && canModerate ? (
                <button
                  type="button"
                  onClick={() => onVisibility(comment._id, !comment.isVisible)}
                  disabled={pending}
                  className="min-h-9 rounded-lg border border-white/10 px-3 text-xs font-medium text-slate-200 transition hover:bg-white/5 disabled:opacity-50"
                >
                  {comment.isVisible ? "Hide" : "Unhide"}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ReviewCommentItem;
