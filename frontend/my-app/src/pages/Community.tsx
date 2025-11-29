import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, Camera, Heart, Upload, X, CheckCircle, XCircle, Calendar } from "lucide-react";
import { auth, db } from "../firebase";
import { collection, addDoc, deleteDoc, doc, query, orderBy, onSnapshot, Timestamp, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import CommunityFeed from "@/components/CommunityFeed";

const Community = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<null | "uploading" | "success" | "error">(null);
  const [showStatus, setShowStatus] = useState(false);
  const [eventAttendances, setEventAttendances] = useState<{[key: string]: "attend" | "not-attend" | null}>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Auto-dismiss effect for status notifications
  useEffect(() => {
    if (showStatus) {
      const timer = setTimeout(() => {
        setShowStatus(false);
        setUploadStatus(null);
      }, 3000); // Shorter duration for success/error messages
      return () => clearTimeout(timer);
    }
  }, [showStatus]);

  // Fetch posts from Firestore
  useEffect(() => {
    const q = query(collection(db, "communityPosts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData: any[] = [];
      snapshot.forEach((doc) => postsData.push({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
    });
    return () => unsubscribe();
  }, []);

  // Fetch event attendances for current user
  useEffect(() => {
    if (!auth.currentUser) return;

    const fetchEventAttendances = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const attendances: {[key: string]: "attend" | "not-attend" | null} = {};
      
      // Check attendance for each event
      const events = ["nairobi-walk", "mental-wellness", "health-expo"];
      for (const eventId of events) {
        const docRef = doc(db, "eventAttendances", `${user.uid}_${eventId}`);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          attendances[eventId] = docSnap.data().status;
        } else {
          attendances[eventId] = null;
        }
      }
      
      setEventAttendances(attendances);
    };

    fetchEventAttendances();
  }, [auth.currentUser]);

  const dismissStatus = () => {
    setShowStatus(false);
    setUploadStatus(null);
  };

  // Handle event attendance with immediate UI feedback
const handleEventAttendance = async (eventId: string, status: "attend" | "not-attend") => {
  if (!auth.currentUser) {
    toast({ title: "Please sign in", description: "You need to be signed in to RSVP for events", variant: "destructive" });
    return;
  }

  // IMMEDIATE UI UPDATE - don't wait for Firestore
  setEventAttendances(prev => ({
    ...prev,
    [eventId]: status
  }));

  const action = status === "attend" ? "attending" : "not attending";
  toast({
    title: "RSVP Updated!",
    description: `You are ${action} this event`,
  });

  // Firestore update happens in background (no await)
  try {
    const user = auth.currentUser;
    const docRef = doc(db, "eventAttendances", `${user.uid}_${eventId}`);
    
    // Don't await this - let it happen in background
    setDoc(docRef, {
      eventId,
      userId: user.uid,
      userEmail: user.email,
      status,
      timestamp: Timestamp.now()
    });
  } catch (error: any) {
    console.error("Attendance error:", error);
    // Optional: revert UI if Firestore fails
    // setEventAttendances(prev => ({ ...prev, [eventId]: null }));
  }
};

  // Compress image to Base64
  const compressImage = (file: File, maxWidth = 800, quality = 0.6) =>
    new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          const base64 = canvas.toDataURL("image/jpeg", quality);
          resolve(base64);
        };
      };
    });

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file type", description: "Select an image file", variant: "destructive" });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max 2MB allowed", variant: "destructive" });
      return;
    }

    setUploading(true);
    setUploadStatus("uploading");
    setShowStatus(true);

    try {
      const base64 = await compressImage(file);
      setSelectedFile({ name: file.name, size: file.size, base64 });
      setShowUploadModal(true);
      // Clear the processing status when modal opens
      setUploadStatus(null);
      setShowStatus(false);
    } catch (err) {
      setUploadStatus("error");
      setShowStatus(true);
      toast({ title: "Error processing image", description: "Try another image", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !auth.currentUser) return;

    // CLOSE MODAL IMMEDIATELY - no waiting!
    setShowUploadModal(false);
    
    // Show posting animation
    setUploadStatus("uploading");
    setShowStatus(true);
    setUploading(true);

    try {
      const user = auth.currentUser;

      await addDoc(collection(db, "communityPosts"), {
        imageBase64: selectedFile.base64,
        userId: user.uid,
        userEmail: user.email,
        timestamp: Timestamp.now(),
        likes: 0,
        likedBy: [],
        comments: [],
        fileName: selectedFile.name,
      });

      // Show success
      setUploadStatus('success');
      setShowStatus(true);

      toast({
        title: "Success!",
        description: "Your image has been shared with the community",
      });

      // Reset
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

    } catch (error: any) {
      console.error(error);
      setUploadStatus('error');
      setShowStatus(true);
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      await deleteDoc(doc(db, "communityPosts", postId));
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      toast({ title: "Deleted", description: "Your post has been removed" });
    } catch (err: any) {
      console.error(err);
      toast({ title: "Delete failed", description: err.message, variant: "destructive" });
    }
  };

  // Like/Unlike functionality for Event Gallery
  const handleLike = async (postId: string) => {
    if (!auth.currentUser) {
      toast({ title: "Please sign in", description: "You need to be signed in to like posts", variant: "destructive" });
      return;
    }

    try {
      const post = posts.find(p => p.id === postId);
      const user = auth.currentUser;
      const hasLiked = post.likedBy?.includes(user.uid);

      if (hasLiked) {
        // Unlike
        await updateDoc(doc(db, "communityPosts", postId), {
          likes: (post.likes || 0) - 1,
          likedBy: post.likedBy?.filter((id: string) => id !== user.uid) || []
        });
      } else {
        // Like
        await updateDoc(doc(db, "communityPosts", postId), {
          likes: (post.likes || 0) + 1,
          likedBy: [...(post.likedBy || []), user.uid]
        });
      }
    } catch (error: any) {
      console.error("Like error:", error);
      toast({ title: "Error", description: "Failed to update like", variant: "destructive" });
    }
  };

  // Close modal without uploading
  const handleCancelUpload = () => {
    setShowUploadModal(false);
    setSelectedFile(null);
    setUploadStatus(null);
    setShowStatus(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const events = [
    { 
      id: "nairobi-walk",
      title: "Nairobi Walk Movement", 
      date: "Weekly group walks", 
      description: "All levels welcome", 
      icon: Users, 
      color: "text-primary" 
    },
    { 
      id: "mental-wellness",
      title: "Mental Wellness Walk & Picnic", 
      date: "Saturdays 8 AM", 
      description: "Morning park walk", 
      icon: Heart, 
      color: "text-secondary" 
    },
    { 
      id: "health-expo",
      title: "World Health Expo 2025", 
      date: "December 2025", 
      description: "Health innovation event", 
      icon: MessageCircle, 
      color: "text-accent" 
    },
  ];

  const testimonials = [
    { name: "Sarah M.", role: "Health Advocate", quote: "Starting my morning walk routine changed everything.", avatar: "👩‍💼" },
    { name: "Gabriel M.", role: "Fitness Enthusiast", quote: "The water tracker helped me build a simple habit.", avatar: "👨‍🏫" },
    { name: "Maria L.", role: "Wellness Coach", quote: "Mindfulness has been transformative.", avatar: "👩‍⚕️" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Status Notification - Shows posting animation and results */}
      {showStatus && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top duration-300">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border max-w-sm
            ${uploadStatus === "uploading" ? "bg-blue-50 border-blue-200 text-blue-800" : ""}
            ${uploadStatus === "success" ? "bg-green-50 border-green-200 text-green-800" : ""}
            ${uploadStatus === "error" ? "bg-red-50 border-red-200 text-red-800" : ""}`}>
            
            {/* Animated spinner for uploading */}
            {uploadStatus === "uploading" && (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <div>
                  <p className="text-sm font-medium">Posting to community...</p>
                  <p className="text-xs opacity-75">This will just take a moment</p>
                </div>
              </div>
            )}
            
            {/* Success state */}
            {uploadStatus === "success" && (
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Posted successfully!</p>
                  <p className="text-xs opacity-75">Your image is now live</p>
                </div>
              </div>
            )}
            
            {/* Error state */}
            {uploadStatus === "error" && (
              <div className="flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium">Failed to post</p>
                  <p className="text-xs opacity-75">Please try again</p>
                </div>
              </div>
            )}
            
            {/* Close button - only show for success/error, not for uploading */}
            {uploadStatus !== "uploading" && (
              <button onClick={dismissStatus} className="p-1 hover:bg-black hover:bg-opacity-10 rounded transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="gradient-hero text-white py-20 text-center">
          <h1 className="mb-6">Our Community</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Together we're stronger. Share experiences, celebrate victories, and support each other on the journey to better health.
          </p>
          <div className="mt-8">
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" className="hidden" />
            <Button onClick={() => fileInputRef.current?.click()} className="bg-white text-primary hover:bg-gray-100 px-6 py-3" size="lg" >
              {uploading ? <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
              {uploading ? "Processing..." : "Share Your Health Journey"}
            </Button>
          </div>
        </section>

        {/* Community Feed */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-center mb-12">Community Feed</h2>
            <CommunityFeed posts={posts} onPostDelete={handleDelete} />
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 flex items-center justify-center gap-2">
              <Camera className="h-6 w-6 text-primary" /> Event Gallery
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">Moments from our community health initiatives</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {posts.map((post) => {
                const hasLiked = auth.currentUser && post.likedBy?.includes(auth.currentUser.uid);
                return (
                  <div key={post.id} className="aspect-square rounded-lg overflow-hidden shadow-soft hover:shadow-hover transition-smooth cursor-pointer relative group">
                    <img src={post.imageBase64} alt={`Gallery post by ${post.userEmail}`} className="w-full h-full object-cover" />
                    
                    {/* Like button overlay */}
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs backdrop-blur-sm ${
                          hasLiked 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white/90 text-gray-700 hover:bg-white'
                        }`}
                      >
                        <Heart 
                          className={`w-3 h-3 ${hasLiked ? 'fill-current' : ''}`} 
                        />
                        <span>{post.likes || 0}</span>
                      </button>
                    </div>

                    {/* User info overlay */}
                    <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="bg-black/60 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
                        {post.userEmail}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Events Section - WITH ATTENDANCE BUTTONS */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-12">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {events.map((event, i) => {
                const Icon = event.icon;
                const userAttendance = eventAttendances[event.id];
                
                return (
                  <Card key={i} className="shadow-soft hover:shadow-hover transition-smooth">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${event.color} mb-4`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <CardDescription className="text-primary font-medium">{event.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                      
                      {/* Attendance Buttons */}
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEventAttendance(event.id, "attend")}
                            variant={userAttendance === "attend" ? "default" : "outline"}
                            className={`flex-1 ${
                              userAttendance === "attend" 
                                ? 'bg-green-600 hover:bg-green-700 text-white' 
                                : ''
                            }`}
                            size="sm"
                          >
                            <Calendar className="w-3 h-3 mr-1" />
                            Attend
                          </Button>
                          <Button
                            onClick={() => handleEventAttendance(event.id, "not-attend")}
                            variant={userAttendance === "not-attend" ? "default" : "outline"}
                            className={`flex-1 ${
                              userAttendance === "not-attend" 
                                ? 'bg-red-600 hover:bg-red-700 text-white' 
                                : ''
                            }`}
                            size="sm"
                          >
                            <X className="w-3 h-3 mr-1" />
                            Can't Attend
                          </Button>
                        </div>
                        
                        {/* Attendance Status */}
                        {userAttendance && (
                          <p className="text-xs text-muted-foreground">
                            {userAttendance === "attend" 
                              ? "✅ You're attending this event" 
                              : "❌ You're not attending this event"
                            }
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-12">Community Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((t, i) => (
                <Card key={i} className="shadow-soft hover:shadow-hover transition-smooth">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{t.avatar}</div>
                      <div>
                        <CardTitle className="text-lg">{t.name}</CardTitle>
                        <CardDescription>{t.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                    <CardContent>
                    <p className="text-sm text-muted-foreground italic">"{t.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Share with Community</h3>
              <button
                onClick={handleCancelUpload}
                className="text-gray-500 hover:text-gray-700"
                disabled={uploading}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedFile && (
              <div className="mb-4">
                <img src={selectedFile.base64} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
                <p className="text-sm text-gray-600 mt-2">
                  {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB compressed)
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button 
                onClick={handleCancelUpload} 
                variant="outline" 
                className="flex-1" 
                disabled={uploading}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUpload} 
                className="flex-1" 
                disabled={uploading}
              >
                Share
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Community;