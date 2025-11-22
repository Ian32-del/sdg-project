import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Learn from "./pages/Learn";
import Engage from "./pages/Engage";
import Community from "./pages/Community";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";

export default function ProtectedPages() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/engage" element={<Engage />} />
      <Route path="/community" element={<Community />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
