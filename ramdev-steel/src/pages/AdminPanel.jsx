import { useEffect, useMemo, useState } from "react";
import { contentDefaults } from "../data/contentDefaults";
import {
    getApiErrorMessage,
    getAdminSession,
    getUploadedImages,
    loginAdmin,
    logoutAdmin,
    uploadAdminImage,
} from "../api/adminApi";
import { getApiHealth } from "../api/healthApi";
import { getSiteContent, saveSiteContent } from "../api/contentApi";

const groups = [
    { title: "Catalog", keys: ["products", "productCategories", "services"] },
    { title: "Portfolio", keys: ["projects", "projectCategories", "galleryItems", "galleryCategories"] },
    { title: "Estimator", keys: ["workTypes", "steelGrades", "finishOptions"] },
    { title: "Company content", keys: ["heroImage", "aboutImage", "gradeComparison", "finishes", "careTips", "comparisons", "steps"] },
    { title: "Customer content", keys: ["testimonials", "faqs", "faqCategories"] },
];
const labels = Object.fromEntries(groups.flatMap((group) => group.keys.map((key) => [key, key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase())])));
const makeDrafts = (content) => Object.fromEntries(Object.entries(content).map(([key, value]) => [key, JSON.stringify(value, null, 2)]));

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
            onLogin();
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
    const [drafts, setDrafts] = useState(() => makeDrafts(contentDefaults));
    const [activeKey, setActiveKey] = useState("products");
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [busy, setBusy] = useState(false);
    const [notice, setNotice] = useState("");
    const [error, setError] = useState("");
    const [databaseStatus, setDatabaseStatus] = useState("checking");

    const activeGroup = useMemo(() => groups.find((group) => group.keys.includes(activeKey)), [activeKey]);

    const loadAdminData = async () => {
        try {
            const [saved, imageList] = await Promise.all([
                getSiteContent(),
                getUploadedImages(),
            ]);
            const nextContent = { ...contentDefaults, ...(saved.content || {}) };
            setDrafts(makeDrafts(nextContent));
            setImages(imageList.images || []);
            setAuthenticated(true);
            setError("");
        } catch (requestError) {
            const message = getApiErrorMessage(requestError);
            if (/sign-in|required|expired/i.test(message)) setAuthenticated(false);
            else setError(message);
        }
    };

    useEffect(() => {
        getApiHealth()
            .then((health) => setDatabaseStatus(health.database))
            .catch(() => setDatabaseStatus("offline"));
        getAdminSession()
            .then(loadAdminData)
            .catch(() => setAuthenticated(false));
    }, []);

    const saveContent = async () => {
        setBusy(true);
        setError("");
        setNotice("");
        try {
            const parsedDrafts = Object.fromEntries(Object.entries(drafts).map(([key, value]) => [key, JSON.parse(value)]));
            const result = await saveSiteContent(parsedDrafts);
            const nextContent = { ...contentDefaults, ...result.content };
            setDrafts(makeDrafts(nextContent));
            setNotice("All content saved and published.");
        } catch (saveError) {
            setError(saveError instanceof SyntaxError ? `Invalid JSON in “${labels[activeKey]}”. Check commas and quotes.` : getApiErrorMessage(saveError));
        } finally {
            setBusy(false);
        }
    };

    const resetToDefaults = () => {
        if (!window.confirm("Replace the current content with the original bundled content? Save to publish this change.")) return;
        setDrafts(makeDrafts(contentDefaults));
        setNotice("Defaults loaded in the editor. Click Save & publish to apply them.");
        setError("");
    };

    const uploadImage = async (event) => {
        const image = event.target.files?.[0];
        if (!image) return;
        setUploading(true);
        setNotice("");
        setError("");
        try {
            const result = await uploadAdminImage(image);
            setImages((current) => [{ name: result.name, url: result.url, size: result.size }, ...current]);
            setNotice(`Uploaded ${result.name}. Copy its URL into an image field in your JSON data.`);
        } catch (uploadError) {
            setError(getApiErrorMessage(uploadError));
        } finally {
            setUploading(false);
            event.target.value = "";
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

            <main className="mx-auto grid max-w-375 gap-6 px-4 py-6 sm:px-7 lg:grid-cols-[270px_minmax(0,1fr)]">
                <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
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
                    <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:px-7 sm:py-6">
                        <div><p className="text-xs font-black uppercase tracking-widest text-orange-700">{activeGroup?.title}</p><h2 className="mt-1 text-2xl font-black capitalize">{labels[activeKey]}</h2><p className="mt-1 text-sm text-slate-500">Edit JSON records below. Changes publish to the website when saved.</p></div>
                        <button type="button" onClick={saveContent} disabled={busy} className="shrink-0 rounded-xl bg-orange-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-orange-200 transition hover:bg-orange-700 disabled:opacity-60">{busy ? "Saving…" : "Save & publish"}</button>
                    </div>

                    {notice && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">{notice}</p>}
                    {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-6">
                            <div><p className="text-sm font-bold text-slate-800">JSON content</p><p className="text-xs text-slate-500">Keep the current field names and data types to avoid breaking the page.</p></div>
                            <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-500">{activeKey}</span>
                        </div>
                        <textarea spellCheck="false" aria-label={`${labels[activeKey]} JSON`} value={drafts[activeKey] ?? "null"} onChange={(event) => setDrafts((current) => ({ ...current, [activeKey]: event.target.value }))} className="min-h-115 w-full resize-y bg-slate-950 p-5 font-mono text-[13px] leading-6 text-emerald-100 outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500" />
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div><h3 className="text-lg font-black">Image manager</h3><p className="mt-1 max-w-2xl text-sm text-slate-500">Upload JPG, PNG, WEBP, or GIF images up to 5 MB. Copy an image URL and paste it into an item’s <span className="font-mono text-slate-700">image</span> field.</p></div>
                            <label className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-orange-200 bg-orange-50 px-4 py-2.5 text-sm font-black text-orange-800 hover:bg-orange-100">
                                {uploading ? "Uploading…" : "Upload image"}
                                <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" disabled={uploading} onChange={uploadImage} className="sr-only" />
                            </label>
                        </div>
                        {images.length > 0 ? <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">{images.map((image) => <div key={image.url} className="overflow-hidden rounded-xl border border-slate-200">
                            <img src={image.url} alt={image.name} className="h-32 w-full bg-slate-100 object-cover" />
                            <div className="p-3"><p className="truncate text-xs font-bold" title={image.name}>{image.name}</p><button type="button" onClick={() => copyImageUrl(image.url)} className="mt-2 w-full rounded-lg bg-slate-100 px-2 py-2 text-xs font-bold text-slate-700 hover:bg-orange-100 hover:text-orange-800">Copy image URL</button></div>
                        </div>)}</div> : <p className="mt-5 rounded-xl bg-slate-50 px-4 py-5 text-sm text-slate-500">No uploaded images yet. Existing site images remain available in the content data.</p>}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default AdminPanel;
