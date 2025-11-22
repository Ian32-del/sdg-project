import { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      toast({
        title: "Signed out successfully",
        description: "Come back soon!",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:bg-red-400 text-sm"
    >
      {loading ? "Signing Out..." : "Sign Out"}
    </button>
  );
}