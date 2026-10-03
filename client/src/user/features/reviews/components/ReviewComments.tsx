import { useState, type FormEvent } from "react";
import { FiMoreVertical } from "react-icons/fi";
import toast from "react-hot-toast";

import { useReviewCommentActions } from "../hooks/useReviewCommentActions";
import { useReviewComments } from "../hooks/useReviewComments";
import type { ReviewComment } from "../types/review";
import { getStoredUserId } from "../utils/reviewAuth";
import ReviewCommentItem from "./ReviewCommentItem";

interface ReviewCommentsProps {
  reviewId: string;
  productId: string;
}

function ReviewComments({ reviewId, productId }: ReviewCommentsProps) {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [manageMode, setManageMode] = useState(false);
  const [showHidden, setShowHidden] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const userId = getStoredUserId();
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  const commentsQuery = useReviewComments(reviewId, true, page);
  const actions = useReviewCommentActions(reviewId, productId);
  const response = commentsQuery.data;
  const isReviewOwner = response?.isReviewOwner === true;
  const comments = (response?.data ?? []).filter((comment) =>
    showHidden ? !comment.isVisible : comment.isVisible
  );
  const visibleCommentCount = response?.visibleCommentCount ?? 0;
  const hiddenCommentCount = response?.hiddenCommentCount ?? 0;
  const allDisplayedSelected =
    comments.length > 0 &&
    comments.every((comment) => selectedIds.includes(comment._id));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isAuthenticated) {
      toast("Please login to comment 🔐");
      return;
    }

    const normalizedContent = content.trim();
    if (!normalizedContent || normalizedContent.length > 1000) {
      return;
    }

    actions.mutate(
      { type: "create", content: normalizedContent },
      {
        onSuccess: () => {
          setContent("");
          setPage(1);
        },
      }
    );
  };

  const toggleCommentSelection = (commentId: string, selected: boolean) => {
    setSelectedIds((current) =>
      selected
        ? [...new Set([...current, commentId])]
        : current.filter((id) => id !== commentId)
    );
  };

  const toggleSelectAll = (selected: boolean) => {
    setSelectedIds(selected ? comments.map((comment) => comment._id) : []);
  };

  const moderateAll = (isVisible: boolean) => {
    const affectedCount = isVisible ? hiddenCommentCount : visibleCommentCount;
    if (affectedCount === 0) {
      return;
    }

    const message = isVisible
      ? "Unhide all comments? They will be visible to other users again."
      : "Hide all comments? All comments under this review will be hidden from other users. You can restore them later.";

    if (!window.confirm(message)) {
      return;
    }

    actions.mutate(
      { type: "allVisibility", isVisible },
      {
        onSuccess: () => {
          setManageMode(false);
          setSelectedIds([]);
        },
      }
    );
  };

  const moderateSelected = async () => {
    if (selectedIds.length === 0) {
      return;
    }

    try {
      await actions.mutateAsync({
        type: "selectedVisibility",
        commentIds: selectedIds,
        isVisible: showHidden,
      });
      setSelectedIds([]);
      setManageMode(false);
    } catch {
      // The mutation reports the error and keeps the selection available for retry.
    }
  };

  const deleteComment = (commentId: string) => {
    if (!window.confirm("Delete your comment? This cannot be undone.")) {
      return;
    }
    actions.mutate(
      { type: "delete", commentId },
      {
        onSuccess: () => {
          setSelectedIds([]);
          if (page > 1 && comments.length === 1) {
            setPage((current) => current - 1);
          }
        },
      }
    );
  };

  const editComment = async (commentId: string, updatedContent: string) => {
    await actions.mutateAsync({
      type: "update",
      commentId,
      content: updatedContent,
    });
  };

  const setVisibility = (commentId: string, isVisible: boolean) => {
    actions.mutate(
      { type: "visibility", commentId, isVisible },
      {
        onSuccess: () => {
          setSelectedIds((current) =>
            current.filter((selectedId) => selectedId !== commentId)
          );
        },
      }
    );
  };

  return (
    <section className="mt-5 min-w-0 border-t border-white/10 pt-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-sm font-semibold text-white">Comments</h4>

        {isReviewOwner ? (
          <div className="relative">
            <button
              type="button"
              aria-label="Manage comments"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              <FiMoreVertical aria-hidden="true" />
            </button>
            {menuOpen ? (
              <div className="absolute right-0 top-full z-20 mt-2 w-64 max-w-[calc(100vw-3rem)] rounded-xl border border-white/10 bg-[#0B1220] p-2 shadow-2xl">
                <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Manage comments
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setManageMode((enabled) => !enabled);
                    setSelectedIds([]);
                    setMenuOpen(false);
                  }}
                  className="min-h-11 w-full rounded-lg px-3 text-left text-sm text-slate-200 transition hover:bg-white/5"
                >
                  {manageMode ? "Finish managing" : "Select comments"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowHidden((showing) => !showing);
                    setPage(1);
                    setSelectedIds([]);
                    setMenuOpen(false);
                  }}
                  className="min-h-11 w-full rounded-lg px-3 text-left text-sm text-slate-200 transition hover:bg-white/5"
                >
                  {showHidden
                    ? `Show visible comments (${visibleCommentCount})`
                    : `Show hidden comments (${hiddenCommentCount})`}
                </button>
                <div className="my-1 border-t border-white/10" />
                <button
                  type="button"
                  onClick={() => {
                    moderateAll(false);
                    setMenuOpen(false);
                  }}
                  disabled={visibleCommentCount === 0 || actions.isPending}
                  className="min-h-11 w-full rounded-lg px-3 text-left text-sm text-amber-200 transition hover:bg-amber-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Hide all comments
                </button>
                <button
                  type="button"
                  onClick={() => {
                    moderateAll(true);
                    setMenuOpen(false);
                  }}
                  disabled={hiddenCommentCount === 0 || actions.isPending}
                  className="min-h-11 w-full rounded-lg px-3 text-left text-sm text-emerald-200 transition hover:bg-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Unhide all comments
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      {manageMode && isReviewOwner ? (
        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-violet-500/20 bg-violet-500/5 p-3 sm:flex-row sm:flex-wrap sm:items-center">
          <label className="inline-flex min-h-10 items-center gap-2 text-sm text-slate-200">
            <input
              type="checkbox"
              checked={allDisplayedSelected}
              onChange={(event) => toggleSelectAll(event.target.checked)}
              className="h-5 w-5 accent-violet-500"
            />
            Select all on this page
          </label>
          <button
            type="button"
            onClick={() => void moderateSelected()}
            disabled={selectedIds.length === 0 || actions.isPending}
            className="min-h-10 rounded-lg bg-violet-600 px-3 text-sm font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {showHidden ? "Unhide selected" : "Hide selected"}
            {selectedIds.length ? ` (${selectedIds.length})` : ""}
          </button>
          <button
            type="button"
            onClick={() => {
              setManageMode(false);
              setSelectedIds([]);
            }}
            className="min-h-10 rounded-lg border border-white/10 px-3 text-sm text-slate-300 transition hover:bg-white/5"
          >
            Cancel
          </button>
        </div>
      ) : null}

      {commentsQuery.isLoading ? (
        <div aria-label="Loading comments" className="mt-4 space-y-3">
          <div className="h-20 animate-pulse rounded-xl bg-slate-800" />
          <div className="h-20 animate-pulse rounded-xl bg-slate-800" />
        </div>
      ) : commentsQuery.isError || !response ? (
        <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-sm text-red-300">Unable to load comments.</p>
          <button
            type="button"
            onClick={() => void commentsQuery.refetch()}
            className="mt-2 min-h-9 text-sm text-red-200 underline underline-offset-4"
          >
            Try again
          </button>
        </div>
      ) : (
        <>
          <div className="mt-4 space-y-3">
            {comments.length > 0 ? (
              comments.map((comment: ReviewComment) => (
                <ReviewCommentItem
                  key={comment._id}
                  comment={comment}
                  currentUserId={userId}
                  canModerate={isReviewOwner}
                  manageMode={manageMode}
                  selected={selectedIds.includes(comment._id)}
                  pending={actions.isPending}
                  onSelect={toggleCommentSelection}
                  onEdit={editComment}
                  onDelete={deleteComment}
                  onVisibility={setVisibility}
                />
              ))
            ) : (
              <p className="rounded-xl border border-dashed border-white/10 p-4 text-sm text-slate-400">
                {showHidden
                  ? "There are no hidden comments."
                  : "No comments yet. Start the discussion."}
              </p>
            )}
          </div>

          {response.pagination.pages > 1 ? (
            <nav
              aria-label="Comment pages"
              className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm"
            >
              <button
                type="button"
                onClick={() => {
                  setPage((current) => current - 1);
                  setSelectedIds([]);
                }}
                disabled={page <= 1 || commentsQuery.isFetching}
                className="min-h-10 rounded-lg border border-white/10 px-3 text-slate-200 disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-slate-400">
                Page {response.pagination.page} of {response.pagination.pages}
              </span>
              <button
                type="button"
                onClick={() => {
                  setPage((current) => current + 1);
                  setSelectedIds([]);
                }}
                disabled={
                  page >= response.pagination.pages || commentsQuery.isFetching
                }
                className="min-h-10 rounded-lg border border-white/10 px-3 text-slate-200 disabled:opacity-40"
              >
                Next
              </button>
            </nav>
          ) : null}
        </>
      )}

      <form onSubmit={handleSubmit} className="mt-4 space-y-2">
        <label htmlFor={`comment-${reviewId}`} className="sr-only">
          Write a comment
        </label>
        <textarea
          id={`comment-${reviewId}`}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          maxLength={1000}
          rows={3}
          placeholder={
            isAuthenticated ? "Write a comment..." : "Join the discussion..."
          }
          className="w-full resize-y rounded-xl border border-white/10 bg-[#0B1220] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-violet-500"
        />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs text-slate-500">{content.length}/1000</span>
          <button
            type="submit"
            disabled={
              actions.isPending ||
              (isAuthenticated &&
                (!content.trim() || content.trim().length > 1000))
            }
            className="min-h-10 rounded-lg bg-violet-600 px-4 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {actions.isPending ? "Posting..." : "Post comment"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ReviewComments;
