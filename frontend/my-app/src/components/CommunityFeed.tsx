import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, X, Camera } from "lucide-react";
import { auth, db } from "../firebase";
import { doc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface Comment {
  id: string;
  userEmail: string;
  userId: string;
  text: string;
  timestamp: Timestamp;
}

interface Post {
  id: string;
  imageBase64: string;
  userEmail: string;
  userId: string;
  timestamp: Timestamp;
  likes: number;
  likedBy: string[];
  comments: Comment[];
  fileName: string;
}

interface CommunityFeedProps {
  posts: Post[];
  onPostDelete: (postId: string) => void;
}

const CommunityFeed = ({ posts, onPostDelete }: CommunityFeedProps) => {
  const { toast } = useToast();
  const [commentInputs, setCommentInputs] = useState<{[key: string]: string}>({});

  const handleLike = async (postId: string) => {
    if (!auth.currentUser) {
      toast({ 
        title: "Please sign in", 
        description: "You need to be signed in to like posts", 
        variant: "destructive" 
      });
      return;
    }

    try {
      const post = posts.find(p => p.id === postId);
      const user = auth.currentUser;
      const hasLiked = post?.likedBy?.includes(user.uid);

      if (hasLiked) {
        await updateDoc(doc(db, "communityPosts", postId), {
          likes: (post?.likes || 0) - 1,
          likedBy: post?.likedBy?.filter((id: string) => id !== user.uid) || []
        });
      } else {
        await updateDoc(doc(db, "communityPosts", postId), {
          likes: (post?.likes || 0) + 1,
          likedBy: [...(post?.likedBy || []), user.uid]
        });
      }
    } catch (error: any) {
      console.error("Like error:", error);
      toast({ 
        title: "Error", 
        description: "Failed to update like", 
        variant: "destructive" 
      });
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!auth.currentUser) {
      toast({ 
        title: "Please sign in", 
        description: "You need to be signed in to comment", 
        variant: "destructive" 
      });
      return;
    }

    const commentText = commentInputs[postId]?.trim();
    if (!commentText) return;

    try {
      const user = auth.currentUser;
      const post = posts.find(p => p.id === postId);
      const newComment = {
        id: Date.now().toString(),
        userEmail: user.email,
        userId: user.uid,
        text: commentText,
        timestamp: Timestamp.now()
      };

      await updateDoc(doc(db, "communityPosts", postId), {
        comments: [...(post?.comments || []), newComment]
      });

      setCommentInputs(prev => ({ ...prev, [postId]: '' }));
      toast({ 
        title: "Comment added", 
        description: "Your comment has been posted" 
      });
    } catch (error: any) {
      console.error("Comment error:", error);
      toast({ 
        title: "Error", 
        description: "Failed to add comment", 
        variant: "destructive" 
      });
    }
  };

  const formatTimestamp = (timestamp: Timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts yet</h3>
        <p className="text-gray-500">Be the first to share your health journey!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {posts.map((post) => {
        const hasLiked = auth.currentUser && post.likedBy?.includes(auth.currentUser.uid);
        const isOwner = auth.currentUser?.uid === post.userId;
        
        return (
          <Card key={post.id} className="overflow-hidden shadow-soft hover:shadow-hover transition-smooth">
            <div className="aspect-square bg-gray-100 relative">
              <img 
                src={post.imageBase64} 
                alt={`Community post by ${post.userEmail}`} 
                className="w-full h-full object-cover" 
              />
              {isOwner && (
                <button 
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                  onClick={() => onPostDelete(post.id)}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <CardContent className="p-4">
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-900">{post.userEmail}</p>
                <p className="text-xs text-muted-foreground">
                  {formatTimestamp(post.timestamp)}
                </p>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`p-1 rounded-full transition-colors ${
                      hasLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
                  </button>
                  <span className="text-sm text-gray-600">{post.likes || 0}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{post.comments?.length || 0}</span>
                </div>
              </div>

              {post.comments && post.comments.length > 0 && (
                <div className="space-y-2 mb-3 max-h-20 overflow-y-auto">
                  {post.comments.slice(-2).map((comment) => (
                    <div key={comment.id} className="text-xs">
                      <span className="font-medium">{comment.userEmail}: </span>
                      <span className="text-gray-600">{comment.text}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentInputs[post.id] || ''}
                  onChange={(e) => setCommentInputs(prev => ({
                    ...prev,
                    [post.id]: e.target.value
                  }))}
                  className="flex-1 text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddComment(post.id);
                    }
                  }}
                />
                <Button
                  onClick={() => handleAddComment(post.id)}
                  size="sm"
                  className="px-2 py-1 text-xs"
                  disabled={!commentInputs[post.id]?.trim()}
                >
                  Post
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CommunityFeed;