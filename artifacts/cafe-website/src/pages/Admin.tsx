import { useState, useEffect, useRef } from "react";
import { useGetImages, useRegisterImage, useDeleteImage, getGetImagesQueryKey } from "@workspace/api-client-react";
import { ObjectUploader } from "@workspace/object-storage-web";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
import { Trash2, LogOut, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";
import type { UppyFile, UploadResult } from "@uppy/core";

const CATEGORIES = [
  { id: "hero", label: "Hero Banners", emoji: "🌅" },
  { id: "home", label: "Home Photos", emoji: "🏠" },
  { id: "inner-view", label: "Inner View", emoji: "🪟" },
  { id: "menu-items", label: "Menu Items", emoji: "☕" },
  { id: "events", label: "Events", emoji: "🎉" },
  { id: "team", label: "Team", emoji: "👥" },
  { id: "gallery", label: "Gallery", emoji: "🖼️" },
];

type UppyFileMeta = Record<string, unknown>;
type UppyFileBody = Record<string, unknown>;

export default function Admin() {
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);
  const [authKey, setAuthKey] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeCategory, setActiveCategory] = useState("gallery");
  const [labelInput, setLabelInput] = useState("");

  const queryClient = useQueryClient();
  const { data: allImages } = useGetImages();
  const { data: categoryImages } = useGetImages({ category: activeCategory });

  const registerImage = useRegisterImage({
    request: { headers: { "x-admin-key": "cafesecret123" } },
  });
  const deleteImage = useDeleteImage({
    request: { headers: { "x-admin-key": "cafesecret123" } },
  });

  const pendingObjectPaths = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    setIsAuthed(localStorage.getItem("cafe_admin_auth") === "true");
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authKey === "cafesecret123") {
      localStorage.setItem("cafe_admin_auth", "true");
      setIsAuthed(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect key. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("cafe_admin_auth");
    setIsAuthed(false);
  };

  const handleGetUploadParameters = async (file: UppyFile<UppyFileMeta, UppyFileBody>) => {
    const res = await fetch("/api/storage/uploads/request-url", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-key": "cafesecret123" },
      body: JSON.stringify({ name: file.name, size: file.size, contentType: file.type }),
    });
    const data = (await res.json()) as { uploadURL: string; objectPath: string };
    pendingObjectPaths.current.set(file.name, data.objectPath);
    return { method: "PUT" as const, url: data.uploadURL, headers: { "Content-Type": file.type ?? "application/octet-stream" } };
  };

  const handleUploadComplete = async (result: UploadResult<UppyFileMeta, UppyFileBody>) => {
    const successful = result.successful ?? [];
    for (const file of successful) {
      const objectPath = pendingObjectPaths.current.get(file.name);
      if (objectPath) {
        try {
          await registerImage.mutateAsync({
            data: { category: activeCategory, objectPath, label: labelInput || activeCategory },
          });
          pendingObjectPaths.current.delete(file.name);
        } catch (err) {
          console.error("Failed to register image", err);
        }
      }
    }
    await queryClient.invalidateQueries({ queryKey: getGetImagesQueryKey() });
    await queryClient.invalidateQueries({ queryKey: getGetImagesQueryKey({ category: activeCategory }) });
    toast.success(`Photos uploaded to ${CATEGORIES.find((c) => c.id === activeCategory)?.label}!`);
    setLabelInput("");
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this image?")) {
      try {
        await deleteImage.mutateAsync({ id });
        await queryClient.invalidateQueries({ queryKey: getGetImagesQueryKey() });
        await queryClient.invalidateQueries({ queryKey: getGetImagesQueryKey({ category: activeCategory }) });
        toast.success("Image deleted");
      } catch {
        toast.error("Failed to delete image");
      }
    }
  };

  if (isAuthed === null) return null;

  if (!isAuthed) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-[#1C0A00] p-4">
        <div className="bg-[#FDF6EC] p-8 rounded-xl max-w-sm w-full shadow-2xl">
          <h2 className="font-serif text-3xl mb-6 text-center text-[#1C0A00]">Admin Access</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <input
                type="password"
                placeholder="Enter admin key"
                value={authKey}
                onChange={(e) => setAuthKey(e.target.value)}
                className="w-full p-3 border border-[#C8963E]/30 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#C8963E] text-[#1C0A00]"
                data-testid="admin-auth-input"
                autoComplete="current-password"
              />
              {authError && <p className="text-red-500 text-sm mt-2">{authError}</p>}
            </div>
            <button
              type="submit"
              className="bg-[#C8963E] text-[#1C0A00] font-semibold py-3 rounded-lg hover:bg-[#D4694A] hover:text-[#FDF6EC] transition-colors"
              data-testid="admin-auth-submit"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const lastUploadDate =
    allImages && allImages.length > 0
      ? format(
          new Date(Math.max(...allImages.map((img) => new Date(img.uploadedAt).getTime()))),
          "MMM d, yyyy"
        )
      : "No uploads yet";

  return (
    <div className="flex min-h-[100dvh] bg-[#FDF6EC] font-sans selection:bg-[#C8963E] selection:text-[#1C0A00]">
      {/* Sidebar */}
      <div className="w-64 bg-[#1C0A00] text-[#FDF6EC] flex flex-col fixed inset-y-0 left-0 z-40">
        <div className="p-6 border-b border-[#FDF6EC]/10">
          <h1 className="font-serif text-xl flex items-center gap-2">
            <LayoutDashboard size={20} className="text-[#C8963E]" />
            Brewed Bliss<span className="text-[#C8963E]">·</span>Admin
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-[#FDF6EC]/50">
            Categories
          </div>
          <div className="space-y-1 px-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeCategory === cat.id
                    ? "bg-[#C8963E] text-[#1C0A00] font-medium"
                    : "text-[#FDF6EC]/80 hover:bg-[#FDF6EC]/10 hover:text-[#FDF6EC]"
                }`}
                data-testid={`admin-category-${cat.id}`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-[#FDF6EC]/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-[#FDF6EC]/70 hover:text-red-400 transition-colors w-full px-2 py-2"
            data-testid="admin-logout"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 ml-64 flex flex-col h-[100dvh]">
        {/* Stats bar */}
        <div className="bg-white border-b border-[#1C0A00]/10 p-6 flex items-center gap-6 flex-shrink-0">
          <div className="flex flex-col">
            <span className="text-sm text-[#1C0A00]/60">Total Images</span>
            <span className="text-2xl font-serif text-[#1C0A00]">{allImages?.length ?? 0}</span>
          </div>
          <div className="w-px h-10 bg-[#1C0A00]/10" />
          <div className="flex flex-col">
            <span className="text-sm text-[#1C0A00]/60">In Category</span>
            <span className="text-2xl font-serif text-[#C8963E]">{categoryImages?.length ?? 0}</span>
          </div>
          <div className="w-px h-10 bg-[#1C0A00]/10" />
          <div className="flex flex-col">
            <span className="text-sm text-[#1C0A00]/60">Last Upload</span>
            <span className="text-lg font-medium text-[#1C0A00] mt-1">{lastUploadDate}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Upload Zone */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-[#1C0A00]/5">
              <h2 className="font-serif text-3xl text-[#1C0A00] mb-6">
                Upload to {CATEGORIES.find((c) => c.id === activeCategory)?.label}
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#1C0A00]/70 mb-2">
                  Image Label (optional)
                </label>
                <input
                  type="text"
                  value={labelInput}
                  onChange={(e) => setLabelInput(e.target.value)}
                  placeholder="e.g. Latte Art"
                  className="w-full md:w-1/2 p-3 border border-[#1C0A00]/20 rounded-lg bg-transparent focus:outline-none focus:border-[#C8963E] text-[#1C0A00]"
                  data-testid="admin-upload-label"
                />
              </div>

              <div className="border-2 border-dashed border-[#C8963E]/40 rounded-xl overflow-hidden bg-[#FDF6EC]/50">
                <ObjectUploader
                  onGetUploadParameters={handleGetUploadParameters}
                  onComplete={handleUploadComplete}
                >
                  Upload Photos
                </ObjectUploader>
              </div>
            </section>

            {/* Existing Images */}
            <section>
              <h3 className="font-serif text-2xl text-[#1C0A00] mb-6">
                Manage {CATEGORIES.find((c) => c.id === activeCategory)?.label}
              </h3>

              {!categoryImages || categoryImages.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-[#1C0A00]/5">
                  <p className="text-[#1C0A00]/50 text-lg">No images in this category yet.</p>
                  <p className="text-[#1C0A00]/30 text-sm mt-2">
                    Upload photos above to get started.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryImages.map((img, i) => (
                    <motion.div
                      key={img.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#1C0A00]/5"
                      data-testid={`admin-image-card-${img.id}`}
                    >
                      <div className="aspect-[4/3] bg-[#1C0A00]/5">
                        <img
                          src={`/api/storage${img.objectPath}`}
                          alt={img.label || "Cafe image"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <div className="min-w-0">
                          <p className="font-medium text-[#1C0A00] truncate max-w-[180px]">
                            {img.label || img.category}
                          </p>
                          <p className="text-xs text-[#1C0A00]/50">
                            {format(new Date(img.uploadedAt), "MMM d, yyyy")}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDelete(img.id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                          title="Delete image"
                          data-testid={`admin-delete-${img.id}`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
