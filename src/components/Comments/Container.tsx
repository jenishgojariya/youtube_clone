import Image from "next/image";
import React, { useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Reply,
  MessageCircle,
} from "lucide-react";

const commentsData = [
  {
    id: 1,
    name: "Alex Chen",
    text: "This tutorial saved me so much time! The explanation at 5:32 was exactly what I needed.",
    timestamp: "2 hours ago",
    likes: 1247,
    isLiked: false,
    isDisliked: false,
    replies: [
      {
        id: 11,
        name: "Sarah Johnson",
        text: "Same here! That part was a game changer for my project.",
        timestamp: "1 hour ago",
        likes: 42,
        isLiked: true,
        isDisliked: false,
        replies: [],
      },
    ],
  },
  {
    id: 2,
    name: "Emma Wilson",
    text: "Could you make a follow-up video about advanced optimization techniques? This was super helpful!",
    timestamp: "3 hours ago",
    likes: 856,
    isLiked: true,
    isDisliked: false,
    replies: [
      {
        id: 21,
        name: "Tech Tutorials",
        text: "Great suggestion! I'm planning a part 2 for next week.",
        timestamp: "2 hours ago",
        likes: 523,
        isLiked: false,
        isDisliked: false,
        replies: [
          {
            id: 211,
            name: "Emma Wilson",
            text: "Can't wait! Thanks for listening to feedback.",
            timestamp: "1 hour ago",
            likes: 34,
            isLiked: false,
            isDisliked: false,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "David Kim",
    text: "The way you explain complex concepts in simple terms is amazing. Subscribed!",
    timestamp: "4 hours ago",
    likes: 1562,
    isLiked: false,
    isDisliked: false,
    replies: [],
  },
];

const Comment = ({ data, depth = 0 }: any) => {
  const [isLiked, setIsLiked] = useState(data.isLiked);
  const [isDisliked, setIsDisliked] = useState(data.isDisliked);
  const [likes, setLikes] = useState(data.likes);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikes(likes - 1);
    } else {
      setIsLiked(true);
      setLikes(likes + 1);
      if (isDisliked) {
        setIsDisliked(false);
        setLikes(likes + 2); // Remove dislike and add like
      }
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      if (isLiked) {
        setIsLiked(false);
        setLikes(likes - 2); // Remove like and add dislike
      }
    }
  };

  const maxDepth = 4;
  const shouldNest = depth < maxDepth;

  return (
    <>
      <div
        className={`flex gap-3 p-3 hover:bg-gray-50/50 transition-colors duration-200 ${
          depth > 0 ? "ml-4" : ""
        }`}
      >
        {/* Avatar */}
        <div className="flex-shrink-0">
          <Image
            alt="user"
            src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
            width={40}
            height={40}
            className="h-9 w-9 rounded-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 text-sm">{data.name}</h3>
            <span className="text-xs text-gray-500">{data.timestamp}</span>
          </div>

          {/* Comment Text */}
          <p className="text-gray-800 text-sm mb-2 leading-relaxed">
            {data.text}
          </p>

          {/* Actions - YouTube Style */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1 bg-gray-100 rounded-full">
              <button
                onClick={handleLike}
                className={`p-1 rounded-l-full transition-colors ${
                  isLiked
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              <span className="px-1 text-gray-700 font-medium">
                {likes.toLocaleString()}
              </span>
              <button
                onClick={handleDislike}
                className={`p-1 rounded-r-full transition-colors ${
                  isDisliked
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setShowReply(!showReply)}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900 font-medium px-2 py-1 rounded-full hover:bg-gray-100 transition-all duration-200"
            >
              <Reply className="w-4 h-4" />
              <span>Reply</span>
            </button>
          </div>

          {/* Reply Input */}
          {showReply && (
            <div className="mt-3 flex gap-2">
              <Image
                alt="user"
                src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-sm bg-transparent"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => setShowReply(false)}
                    className="px-3 py-1 text-gray-600 hover:text-gray-900 text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={!replyText.trim()}
                    className="px-4 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* More options */}
        <button className="p-1 hover:bg-gray-200 rounded-full transition-colors self-start">
          <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Replies */}
      {data.replies && data.replies.length > 0 && shouldNest && (
        <div
          className={`pl-4 ${
            depth > 0 ? "border-l border-l-gray-200 ml-4" : ""
          }`}
        >
          {data.replies.map((reply: any) => (
            <Comment key={reply.id} data={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </>
  );
};

const CommentList = ({ datas }: any) => {
  return datas.map((data: any) => (
    <div key={data.id} className="mb-1 last:mb-0">
      <Comment data={data} />
    </div>
  ));
};

export default function Container() {
  const [newComment, setNewComment] = useState("");
  const totalComments = commentsData.reduce((total, comment) => {
    return total + 1 + comment.replies.length;
  }, 0);

  return (
    <div className="max-w-3xl p-4">
      {/* YouTube Style Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-3">
          <h2 className="text-xl font-semibold text-gray-900">
            {totalComments.toLocaleString()} Comments
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MessageCircle className="w-4 h-4" />
            <span>Sorted by latest</span>
          </div>
        </div>

        {/* Add Comment - YouTube Style */}
        <div className="flex gap-3">
          <Image
            alt="user"
            src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex-1 border-b border-gray-300 pb-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-1 py-2 focus:outline-none placeholder-gray-500 text-sm bg-transparent"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setNewComment("")}
                className="px-4 py-1 text-gray-600 hover:text-gray-900 text-sm font-medium rounded-full hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                disabled={!newComment.trim()}
                className="px-6 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-1">
        <CommentList datas={commentsData} />
      </div>

      {/* YouTube Style Load More */}
      <div className="text-center mt-6">
        <button className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
          Load more comments
        </button>
      </div>
    </div>
  );
}
