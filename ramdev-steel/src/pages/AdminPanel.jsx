import { useEffect, useMemo, useRef, useState } from "react";
import { FiCheck, FiCopy, FiImage, FiTrash2, FiUploadCloud, FiX } from "react-icons/fi";
import { contentDefaults } from "../data/contentDefaults";
import { migrateLegacyImageReferences } from "../data/cloudinaryAssets";
import {
    getApiErrorMessage,
    deleteAdminImage,
    getUploadedImages,
    loginAdmin,
    logoutAdmin,
    uploadAdminImage,
} from "../api/adminApi";
import { getApiHealth } from "../api/healthApi";
import { getSiteContent, saveSiteContent } from "../api/contentApi";
import ContentManager from "../components/ContentManager";

const groups = [
    { title: "Market Pricing", keys: ["steelMarketRates"] },
    { title: "Catalog", keys: ["products", "productCategories", "services"] },
    { title: "Portfolio", keys: ["projects", "projectCategories", "galleryItems", "galleryCategories"] },
    { title: "Estimator", keys: ["workTypes", "steelGrades", "finishOptions"] },
    { title: "Company content", keys: ["heroImage", "aboutImage", "gradeComparison", "finishes", "careTips", "comparisons", "steps"] },
    { title: "Customer content", keys: ["testimonials", "faqs", "faqCategories"] },
];
const labels = Object.fromEntries(groups.flatMap((group) => group.keys.map((key) => [key, key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase())])));
const cloneContent = (content) => JSON.parse(JSON.stringify(content));

function containsImageUrl(value, imageUrl) {
    if (value === imageUrl) return true;
    if (Array.isArray(value)) return value.some((item) => containsImageUrl(item, imageUrl));
    if (value && typeof value === "object") {
        return Object.values(value).some((item) => containsImageUrl(item, imageUrl));
    }
    return false;
}

function AdminLogin({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    const submit = async (event) => {
        event.preventDefault();
        setBusy(true);
        setError("");
        try {
            await loginAdmin({ username, password });
            await onLogin();
        } catch (requestError) {
            setError(getApiErrorMessage(requestError));
        } finally {
            setBusy(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 flex items-center justify-center">
            <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-white/10 bg-white p-8 text-slate-900 shadow-2xl">
                <a href="/" className="text-sm font-bold text-orange-700">← Ramdev Steel website</a>
                <div className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-orange-600">Secure administrator access</div>
                <h1 className="mt-2 text-3xl font-black tracking-tight">Admin sign in</h1>
                <p className="mt-2 text-sm leading-6 text-slate-500">Only the configured administrator can manage published site content.</p>
                <label className="mt-7 block text-sm font-bold" htmlFor="admin-username">Username</label>
                <input id="admin-username" autoComplete="username" required value={username} onChange={(event) => setUsername(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100" />
                <label className="mt-4 block text-sm font-bold" htmlFor="admin-password">Password</label>
                <input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100" />
                {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
                <button disabled={busy} className="mt-6 w-full rounded-xl bg-orange-600 px-4 py-3.5 font-bold text-white transition hover:bg-orange-700 disabled:opacity-60">{busy ? "Signing in…" : "Sign in securely"}</button>
            </form>
        </main>
    );
}

function AdminPanel() {
    const [authenticated, setAuthenticated] = useState(false);
    const [drafts, setDrafts] = useState(() => cloneContent(contentDefaults));
    const [savedContent, setSavedContent] = useState(() => cloneContent(contentDefaults));
    const [hasPersistedContent, setHasPersistedContent] = useState(false);
    const [activeKey, setActiveKey] = useState("products");
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const imagePreviewUrl = useRef("");
    const [uploading, setUploading] = useState(false);
    const [deletingImage, setDeletingImage] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isDraggingImage, setIsDraggingImage] = useState(false);
    const [busy, setBusy] = useState(false);
    const [notice, setNotice] = useState("");
    const [error, setError] = useState("");
    const [databaseStatus, setDatabaseStatus] = useState("checking");

    const activeGroup = useMemo(() => groups.find((group) => group.keys.includes(activeKey)), [activeKey]);
    const hasUnsavedChanges = !hasPersistedContent || JSON.stringify(drafts) !== JSON.stringify(savedContent);

    const loadAdminData = async () => {
        try {
            const [saved, imageList] = await Promise.all([
                getSiteContent(),
                getUploadedImages(),
            ]);
            const migratedContent = migrateLegacyImageReferences(saved.content || {});
            const nextContent = { ...contentDefaults, ...migratedContent };
            setDrafts(nextContent);
            setSavedContent(nextContent);
            setHasPersistedContent(saved.content !== null && saved.content !== undefined);
            setImages(imageList.images || []);
            setAuthenticated(true);
            setError("");
        } catch (requestError) {
            setAuthenticated(false);
            const message = getApiErrorMessage(requestError);
            setError(message);
            throw requestError;
        }
    };

    useEffect(() => {
        // Check API health status, but do NOT auto-login to ensure login form is always required
        getApiHealth()
            .then((health) => setDatabaseStatus(health.database))
            .catch(() => setDatabaseStatus("offline"));
        // Strictly start in unauthenticated state
        setAuthenticated(false);
    }, []);

    useEffect(() => () => {
        if (imagePreviewUrl.current) URL.revokeObjectURL(imagePreviewUrl.current);
    }, []);

    const saveContent = async () => {
        setBusy(true);
        setError("");
        setNotice("");
        try {
            const result = await saveSiteContent(cloneContent(drafts));
            const migratedContent = migrateLegacyImageReferences(result.content);
            setSavedContent({ ...contentDefaults, ...migratedContent });
            setHasPersistedContent(true);
            setNotice("All content saved to MongoDB and published.");
        } catch (saveError) {
            setError(getApiErrorMessage(saveError));
        } finally {
            setBusy(false);
        }
    };

    const resetToDefaults = () => {
        if (!window.confirm("Replace the current content with the original bundled content? Save to publish this change.")) return;
        setDrafts(cloneContent(contentDefaults));
        setNotice("Defaults loaded as a draft. Publish to save them to MongoDB.");
        setError("");
    };

    const clearImageSelection = () => {
        setSelectedImage(null);
        if (imagePreviewUrl.current) URL.revokeObjectURL(imagePreviewUrl.current);
        imagePreviewUrl.current = "";
        setImagePreview("");
    };

    const chooseImage = (image) => {
        if (!image || uploading) return;
        setNotice("");
        setError("");
        if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(image.type)) {
            clearImageSelection();
            setError("Choose a JPG, PNG, WEBP, or GIF image.");
            return;
        }
        if (image.size > 5 * 1024 * 1024) {
            clearImageSelection();
            setError("The image is larger than 5 MB. Choose a smaller file.");
            return;
        }
        if (imagePreviewUrl.current) URL.revokeObjectURL(imagePreviewUrl.current);
        imagePreviewUrl.current = URL.createObjectURL(image);
        setImagePreview(imagePreviewUrl.current);
        setSelectedImage(image);
    };

    const uploadImage = async () => {
        if (!selectedImage) return;
        setUploading(true);
        setUploadProgress(0);
        setNotice("");
        setError("");
        try {
            const result = await uploadAdminImage(selectedImage, setUploadProgress);
            setImages((current) => [{ filename: result.filename, name: result.name, url: result.url, size: result.size }, ...current]);
            setNotice(`Uploaded ${result.name}. Copy its URL into an image field in your JSON data.`);
            clearImageSelection();
        } catch (uploadError) {
            setError(getApiErrorMessage(uploadError));
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const copyImageUrl = async (url) => {
        try {
            await navigator.clipboard.writeText(url);
            setNotice("Image URL copied. Paste it into the image field in your selected content.");
        } catch {
            setNotice(`Image URL: ${url}`);
        }
    };

    const deleteImage = async (image) => {
        if (!image.filename) {
            setError("This image cannot be deleted because it has no storage ID.");
            return;
        }
        if (image.filename.startsWith("ramdev-steel/site-assets/")) {
            setError("Built-in site images are protected from deletion.");
            return;
        }
        if (containsImageUrl(savedContent, image.url) || containsImageUrl(drafts, image.url)) {
            setError("This image is used by site content. Replace or remove that reference before deleting it.");
            return;
        }
        if (!window.confirm(`Permanently delete “${image.name}” from the media library?`)) return;

        setDeletingImage(image.filename);
        setError("");
        setNotice("");
        try {
            await deleteAdminImage(image.filename);
            setImages((current) => current.filter((entry) => entry.filename !== image.filename));
            setNotice(`Deleted ${image.name}.`);
        } catch (deleteError) {
            setError(getApiErrorMessage(deleteError));
        } finally {
            setDeletingImage("");
        }
    };

    const logout = async () => {
        await logoutAdmin().catch(() => { });
        setAuthenticated(false);
    };

    if (!authenticated) return <AdminLogin onLogin={loadAdminData} />;

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900">
            <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
                <div className="mx-auto flex max-w-375 items-center justify-between gap-4 px-4 py-4 sm:px-7">
                    <div className="flex items-center gap-3">
                        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-orange-600 text-lg font-black text-white">R</div>
                        <div><p className="text-xs font-black uppercase tracking-[0.2em] text-orange-700">Ramdev Steel</p><h1 className="text-lg font-black">Content admin</h1></div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`hidden rounded-full px-3 py-1.5 text-xs font-bold sm:inline-flex ${databaseStatus === "connected" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>MongoDB {databaseStatus}</span>
                        <a href="/" className="hidden text-sm font-bold text-slate-600 hover:text-orange-700 sm:inline">View website ↗</a>
                        <button type="button" onClick={logout} className="rounded-xl border border-slate-300 px-3.5 py-2 text-sm font-bold hover:bg-slate-50">Sign out</button>
                    </div>
                </div>
            </header>

            <main className="mx-auto grid max-w-375 gap-4 px-3 py-4 sm:gap-6 sm:px-7 sm:py-6 lg:grid-cols-[270px_minmax(0,1fr)]">
                <aside className="hidden h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:block">
                    <div className="mb-4 px-2"><p className="text-xs font-black uppercase tracking-widest text-slate-400">Manage</p><p className="mt-1 text-sm text-slate-600">Content groups</p></div>
                    <nav className="space-y-5">
                        {groups.map((group) => <div key={group.title}>
                            <h2 className="mb-1 px-2 text-xs font-bold uppercase tracking-wider text-slate-400">{group.title}</h2>
                            {group.keys.map((key) => <button key={key} type="button" onClick={() => setActiveKey(key)} className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold capitalize transition ${activeKey === key ? "bg-orange-50 text-orange-800" : "text-slate-600 hover:bg-slate-50"}`}>{labels[key]}</button>)}
                        </div>)}
                    </nav>
                    <button type="button" onClick={resetToDefaults} className="mt-6 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-bold text-slate-600 hover:border-orange-300 hover:text-orange-700">Restore original content</button>
                </aside>

                <section className="min-w-0 space-y-5">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:hidden">
                        <label htmlFor="admin-content-section" className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">Manage content</label>
                        <select
                            id="admin-content-section"
                            value={activeKey}
                            onChange={(event) => setActiveKey(event.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-bold text-slate-800 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                        >
                            {groups.map((group) => (
                                <optgroup key={group.title} label={group.title}>
                                    {group.keys.map((key) => <option key={key} value={key}>{labels[key]}</option>)}
                                </optgroup>
                            ))}
                        </select>
                        <button type="button" onClick={resetToDefaults} className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-bold text-slate-600 hover:border-orange-300 hover:text-orange-700">Restore original content</button>
                    </div>

                    <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:px-7 sm:py-6">
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-orange-700">{activeGroup?.title}</p>
                            <h2 className="mt-1 text-2xl font-black capitalize">{labels[activeKey]}</h2>
                            <p className="mt-1 text-sm text-slate-500">Manage records with forms. Publish your changes to store them in MongoDB.</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${hasUnsavedChanges ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>
                                {!hasPersistedContent ? "Not published" : hasUnsavedChanges ? "Unsaved changes" : "Saved to MongoDB"}
                            </span>
                            <button type="button" onClick={saveContent} disabled={busy || !hasUnsavedChanges} className="shrink-0 rounded-xl bg-orange-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-orange-200 transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50">
                                {busy ? "Saving…" : hasUnsavedChanges ? "Save & publish" : "Published"}
                            </button>
                        </div>
                    </div>

                    {notice && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">{notice}</p>}
                    {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}

                    <ContentManager
                        activeKey={activeKey}
                        value={drafts[activeKey]}
                        template={contentDefaults[activeKey]?.[0]}
                        images={images}
                        onChange={(nextValue) => setDrafts((current) => ({ ...current, [activeKey]: nextValue }))}
                    />

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="flex flex-wrap items-end justify-between gap-3">
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-orange-700">Media library</p>
                                <h3 className="mt-1 text-xl font-black">Image manager</h3>
                                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">Upload an image, then choose it from the image selector while editing a content record.</p>
                            </div>
                            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">{images.length} {images.length === 1 ? "image" : "images"}</span>
                        </div>

                        <div
                            onDragOver={(event) => { event.preventDefault(); setIsDraggingImage(true); }}
                            onDragLeave={(event) => { event.preventDefault(); setIsDraggingImage(false); }}
                            onDrop={(event) => {
                                event.preventDefault();
                                setIsDraggingImage(false);
                                chooseImage(event.dataTransfer.files?.[0]);
                            }}
                            className={`mt-5 rounded-2xl border-2 border-dashed p-4 transition sm:p-5 ${isDraggingImage ? "border-orange-500 bg-orange-50" : "border-slate-200 bg-slate-50/80 hover:border-orange-300 hover:bg-orange-50/50"}`}
                        >
                            {selectedImage ? (
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                    <img src={imagePreview} alt="Selected image preview" className="h-36 w-full rounded-xl bg-white object-contain sm:w-44" />
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate font-bold text-slate-800" title={selectedImage.name}>{selectedImage.name}</p>
                                        <p className="mt-1 text-sm text-slate-500">{(selectedImage.size / (1024 * 1024)).toFixed(2)} MB · {selectedImage.type.replace("image/", "").toUpperCase()}</p>
                                        {uploading && (
                                            <div className="mt-4" role="status" aria-live="polite">
                                                <div className="mb-1.5 flex justify-between text-xs font-semibold text-slate-600"><span>Uploading image…</span><span>{uploadProgress}%</span></div>
                                                <div className="h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-orange-500 transition-[width] duration-200" style={{ width: `${uploadProgress}%` }} /></div>
                                            </div>
                                        )}
                                    </div>
                                    <button type="button" onClick={clearImageSelection} disabled={uploading} aria-label="Remove selected image" className="self-end rounded-lg p-2 text-slate-500 hover:bg-white hover:text-red-600 disabled:opacity-40 sm:self-center">
                                        <FiX aria-hidden="true" className="h-5 w-5" />
                                    </button>
                                </div>
                            ) : (
                                <label htmlFor="admin-image-upload" className="flex min-h-36 cursor-pointer flex-col items-center justify-center text-center">
                                    <span className={`grid h-12 w-12 place-items-center rounded-2xl ${isDraggingImage ? "bg-orange-100 text-orange-700" : "bg-white text-orange-600 shadow-sm"}`}>
                                        <FiUploadCloud aria-hidden="true" className="h-6 w-6" />
                                    </span>
                                    <span className="mt-3 text-sm font-bold text-slate-800">Drop an image here or <span className="text-orange-700 underline underline-offset-2">browse files</span></span>
                                    <span className="mt-1 text-xs text-slate-500">JPG, PNG, WEBP, or GIF · up to 5 MB</span>
                                    <input
                                        id="admin-image-upload"
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp,image/gif"
                                        disabled={uploading}
                                        onChange={(event) => {
                                            chooseImage(event.target.files?.[0]);
                                            event.target.value = "";
                                        }}
                                        className="sr-only"
                                    />
                                </label>
                            )}
                        </div>

                        {selectedImage && (
                            <div className="mt-3 flex flex-wrap justify-end gap-2">
                                <button type="button" onClick={clearImageSelection} disabled={uploading} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50">Cancel</button>
                                <button type="button" onClick={uploadImage} disabled={uploading} className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60">
                                    {uploading ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />Uploading…</> : <><FiCheck aria-hidden="true" className="h-4 w-4" />Upload image</>}
                                </button>
                            </div>
                        )}

                        <div className="mt-7 border-t border-slate-100 pt-5">
                            <h4 className="text-sm font-bold text-slate-800">Uploaded images</h4>
                            {images.length > 0 ? (
                                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                                    {images.map((image) => (
                                        <article key={image.url} className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md">
                                            <div className="relative h-32 bg-slate-100">
                                                <img src={image.url} alt={image.name} loading="lazy" className="h-full w-full object-cover" />
                                                <span className="absolute bottom-2 left-2 rounded-md bg-slate-950/70 px-2 py-1 text-[10px] font-semibold text-white">{image.size ? `${(image.size / (1024 * 1024)).toFixed(2)} MB` : "Uploaded"}</span>
                                            </div>
                                            <div className="p-3">
                                                <p className="truncate text-xs font-bold text-slate-700" title={image.name}>{image.name}</p>
                                                <div className="mt-2 flex gap-2">
                                                    <button type="button" onClick={() => copyImageUrl(image.url)} className="inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg bg-slate-100 px-2 py-2 text-xs font-bold text-slate-700 transition hover:bg-orange-100 hover:text-orange-800">
                                                        <FiCopy aria-hidden="true" className="h-3.5 w-3.5 shrink-0" /><span className="truncate">Copy URL</span>
                                                    </button>
                                                    {!image.filename?.startsWith("ramdev-steel/site-assets/") && (
                                                        <button type="button" onClick={() => deleteImage(image)} disabled={deletingImage === image.filename} aria-label={`Delete ${image.name}`} title="Delete image" className="inline-flex shrink-0 items-center justify-center rounded-lg border border-red-100 px-3 py-2 text-red-600 transition hover:bg-red-50 disabled:cursor-wait disabled:opacity-50">
                                                            {deletingImage === image.filename ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-red-600" /> : <FiTrash2 aria-hidden="true" className="h-4 w-4" />}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <div className="mt-3 flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-5 text-sm text-slate-500">
                                    <FiImage aria-hidden="true" className="h-5 w-5 shrink-0 text-slate-400" />
                                    <span>No uploaded images yet. Existing site images remain available in the content data.</span>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default AdminPanel;
