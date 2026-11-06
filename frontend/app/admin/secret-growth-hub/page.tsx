"use client";

import { useEffect, useState, useRef } from "react";
import {
  Sparkles,
  Paperclip,
  Send,
  X,
  FileText,
  Video,
  Image as ImageIcon,
  Mic,
  Link as LinkIcon,
  Trash2,
  Pin,
  ExternalLink,
  Edit2,
  Check,
} from "lucide-react";
import {
  getAdminHubPosts,
  createAdminHubPost,
  updateAdminHubPost,
  deleteAdminHubPost,
  HubPost,
} from "@/services/secretGrowthHubApi";

export default function AdminSecretGrowthHubPage() {
  const [posts, setPosts] = useState<HubPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [existingFileName, setExistingFileName] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [buttonText, setButtonText] = useState("Join Community");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const creatorBoxRef = useRef<HTMLDivElement | null>(null);

  const getMediaUrl = (fileUrl: string) => {
    if (!fileUrl) return "";
    if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://")) {
      return encodeURI(fileUrl);
    }

    const rawBaseUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5000";

    const cleanBaseUrl = rawBaseUrl.replace(/\/api\/?$/, "").replace(/\/$/, "");
    const cleanFilePath = fileUrl.startsWith("/") ? fileUrl : `/${fileUrl}`;

    return encodeURI(`${cleanBaseUrl}${cleanFilePath}`);
  };

  const loadPosts = async () => {
    try {
      setLoading(true);
      const res = await getAdminHubPosts();
      setPosts(res.posts || []);
    } catch (err) {
      console.error("Failed to load hub posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setExistingFileName("");
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setExistingFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setEditingPostId(null);
    setContent("");
    removeSelectedFile();
    setExternalLink("");
    setButtonText("Join Community");
    setShowLinkInput(false);
    setIsPinned(false);
  };

  const handleStartEdit = (post: HubPost) => {
    setEditingPostId(post._id);
    setContent(post.content || "");
    setExternalLink(post.externalLink || "");
    setButtonText(post.buttonText || "Open Link");
    setIsPinned(Boolean(post.isPinned));
    setShowLinkInput(Boolean(post.externalLink));
    setSelectedFile(null);
    setExistingFileName(post.fileName || (post.fileUrl ? "Existing Media" : ""));

    creatorBoxRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !selectedFile && !existingFileName && !externalLink.trim()) {
      alert("Please add text content, an attachment, or a link.");
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      if (content.trim()) formData.append("content", content);
      if (selectedFile) formData.append("mediaFile", selectedFile);
      if (externalLink.trim()) formData.append("externalLink", externalLink);
      if (buttonText.trim()) formData.append("buttonText", buttonText);
      formData.append("isPinned", String(isPinned));

      if (editingPostId) {
        formData.append("keepExistingMedia", String(Boolean(existingFileName || selectedFile)));
        await updateAdminHubPost(editingPostId, formData);
      } else {
        await createAdminHubPost(formData);
      }

      resetForm();
      loadPosts();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to save post");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await deleteAdminHubPost(id);
      if (editingPostId === id) resetForm();
      loadPosts();
    } catch (err) {
      alert("Failed to delete post");
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Secret Growth Hub
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-[#0c4731] text-[11px] font-bold px-2.5 py-0.5 border border-emerald-200">
              <Sparkles size={11} /> VIP Post-Purchase Vault
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Broadcast videos, voice notes, PDFs, or private WhatsApp/Instagram links directly to verified buyers.
          </p>
        </div>
      </div>

      {/* CREATOR / EDIT BOX */}
      <div
        ref={creatorBoxRef}
        className={`relative rounded-3xl border ${
          editingPostId ? "border-amber-400 ring-2 ring-amber-200" : "border-slate-200"
        } bg-white p-4 sm:p-5 shadow-sm space-y-3 transition-all`}
      >
        {editingPostId && (
          <div className="flex items-center justify-between pb-2 border-b border-amber-100">
            <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
              <Edit2 size={13} /> Editing Post
            </span>
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
            >
              Cancel Edit
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            rows={3}
            placeholder="Write a private message, session note, or instruction for your buyers..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none resize-none"
          />

          {/* Selected File / Existing Media Chip Preview */}
          {(selectedFile || existingFileName) && (
            <div className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-1.5 text-xs text-slate-700 font-medium border border-slate-200">
              {selectedFile?.type.startsWith("image/") || existingFileName.match(/\.(png|jpg|jpeg|webp)$/i) ? (
                <ImageIcon size={15} className="text-blue-600" />
              ) : selectedFile?.type.startsWith("video/") || existingFileName.match(/\.(mp4|webm|mkv)$/i) ? (
                <Video size={15} className="text-red-600" />
              ) : selectedFile?.type.startsWith("audio/") || existingFileName.match(/\.(mp3|wav|ogg)$/i) ? (
                <Mic size={15} className="text-purple-600" />
              ) : (
                <FileText size={15} className="text-amber-600" />
              )}
              <span className="max-w-[200px] sm:max-w-xs truncate">
                {selectedFile ? selectedFile.name : `${existingFileName} (Keep)`}
              </span>
              <button
                type="button"
                onClick={removeSelectedFile}
                className="hover:text-red-600 p-0.5 rounded cursor-pointer"
                title="Remove attachment"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Link Drawer */}
          {showLinkInput && (
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <input
                type="url"
                placeholder="https://chat.whatsapp.com/... or zoom.us/..."
                value={externalLink}
                onChange={(e) => setExternalLink(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white outline-none focus:border-emerald-600"
              />
              <input
                type="text"
                placeholder="Button text (e.g. Join WhatsApp VIP)"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white outline-none focus:border-emerald-600"
              />
            </div>
          )}

          {/* Action Bar */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-3">
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*,audio/*,image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
                id="hub-desktop-file"
              />

              <label
                htmlFor="hub-desktop-file"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-all active:scale-95 shadow-2xs"
                title="Attach or replace Video, Audio, Image, or PDF"
              >
                <Paperclip size={14} className="text-[#0c4731]" />
                <span className="hidden sm:inline">
                  {existingFileName ? "Replace Media" : "Attach File"}
                </span>
              </label>

              <button
                type="button"
                onClick={() => setShowLinkInput(!showLinkInput)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95 shadow-2xs cursor-pointer ${
                  showLinkInput || externalLink
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <LinkIcon size={13} />
                <span className="hidden sm:inline">Add Link</span>
              </button>

              <label className="flex items-center gap-1.5 text-xs text-slate-600 font-medium ml-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="rounded text-emerald-700"
                />
                <span>Pin</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-1.5 rounded-2xl bg-[#0c4731] hover:bg-[#083021] text-white px-4 py-2 text-xs font-bold transition-all active:scale-95 shadow-md shadow-emerald-950/20 disabled:bg-slate-300 cursor-pointer"
            >
              {editingPostId ? (
                <>
                  <Check size={13} className="text-[#a3e635]" />
                  <span>{submitting ? "Updating..." : "Save Changes"}</span>
                </>
              ) : (
                <>
                  <Send size={13} className="text-[#a3e635]" />
                  <span>{submitting ? "Uploading..." : "Publish Post"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* LIVE FEED */}
      <div className="space-y-4">
        <h2 className="font-bold text-sm text-slate-800">
          Live Feed ({posts.length})
        </h2>

        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-32 bg-slate-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-xs text-slate-400">
            No posts published yet.
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => {
              const fullFileUrl = getMediaUrl(post.fileUrl);

              return (
                <div
                  key={post._id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs space-y-3.5 relative"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-slate-100 text-slate-700 font-bold text-[10px] uppercase px-2 py-0.5 tracking-wider">
                        {post.postType}
                      </span>
                      {post.isPinned && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60">
                          <Pin size={10} className="fill-amber-600" /> Pinned
                        </span>
                      )}
                      <span className="text-[11px] text-slate-400">
                        {new Date(post.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {/* Action Buttons: Edit & Delete */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(post)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                        title="Edit Post"
                      >
                        <Edit2 size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(post._id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Post"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {post.content && (
                    <p className="text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                      {post.content}
                    </p>
                  )}

                  {post.postType === "IMAGE" && fullFileUrl && (
                    <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 max-w-xl">
                      <img
                        src={fullFileUrl}
                        alt={post.fileName || "Uploaded image"}
                        className="w-full h-auto max-h-[460px] object-cover rounded-2xl"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {post.postType === "VIDEO" && fullFileUrl && (
                    <div className="rounded-2xl overflow-hidden border border-slate-200 bg-black">
                      <video src={fullFileUrl} controls className="w-full max-h-[420px]" />
                    </div>
                  )}

                  {post.postType === "AUDIO" && fullFileUrl && (
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                      <Mic size={20} className="text-purple-600 shrink-0" />
                      <audio src={fullFileUrl} controls className="w-full" />
                    </div>
                  )}

                  {post.postType === "PDF" && fullFileUrl && (
                    <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5 truncate">
                        <FileText size={20} className="text-amber-700 shrink-0" />
                        <span className="text-xs font-semibold text-slate-800 truncate">
                          {post.fileName || "Resource Document.pdf"}
                        </span>
                      </div>
                      <a
                        href={fullFileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-2xs"
                      >
                        <span>View PDF</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}

                  {post.externalLink && (
                    <div className="pt-2">
                      <a
                        href={post.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#0c4731] hover:bg-[#083021] text-white px-4 py-2 text-xs font-bold transition-all shadow-sm active:scale-95"
                      >
                        <span>{post.buttonText || "Open Link"}</span>
                        <ExternalLink size={13} className="text-[#a3e635]" />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}