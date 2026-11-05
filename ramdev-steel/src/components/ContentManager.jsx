import { useState } from "react";
import { FiEdit2, FiImage, FiPlus, FiTrash2, FiX } from "react-icons/fi";

const cloneValue = (value) => JSON.parse(JSON.stringify(value));
const fieldLabel = (key) => key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());

function emptyLike(value) {
    if (Array.isArray(value)) return [];
    if (value && typeof value === "object") {
        return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, emptyLike(child)]));
    }
    if (typeof value === "string") return "";
    return value;
}

function FieldEditor({ name, value, onChange, images = [], depth = 0 }) {
    const label = fieldLabel(name);
    const fieldId = `content-field-${name}-${depth}`;

    if (Array.isArray(value)) {
        if (value.every((item) => typeof item === "string")) {
            return (
                <label className="block">
                    <span className="mb-1.5 block text-sm font-bold text-slate-700">{label}</span>
                    <textarea
                        rows={Math.min(Math.max(value.length + 1, 3), 7)}
                        value={value.join("\n")}
                        onChange={(event) => onChange(event.target.value.split("\n").map((item) => item.trim()).filter(Boolean))}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                        placeholder="Enter one item per line"
                    />
                    <span className="mt-1 block text-xs text-slate-400">Enter one item per line.</span>
                </label>
            );
        }
        return (
            <fieldset className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <legend className="px-1 text-sm font-bold text-slate-700">{label}</legend>
                {value.map((item, index) => (
                    <div key={index} className="rounded-lg border border-slate-200 bg-white p-3">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wide text-slate-400">Entry {index + 1}</span>
                            <button type="button" onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Remove ${label} entry ${index + 1}`} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"><FiTrash2 aria-hidden="true" /></button>
                        </div>
                        {item && typeof item === "object" ? (
                            Object.entries(item).map(([childKey, childValue]) => (
                                <div key={childKey} className="mb-3 last:mb-0">
                                    <FieldEditor name={childKey} value={childValue} images={images} depth={depth + 1} onChange={(nextValue) => onChange(value.map((entry, itemIndex) => itemIndex === index ? { ...entry, [childKey]: nextValue } : entry))} />
                                </div>
                            ))
                        ) : (
                            <FieldEditor name={`${name} ${index + 1}`} value={item} images={images} depth={depth + 1} onChange={(nextValue) => onChange(value.map((entry, itemIndex) => itemIndex === index ? nextValue : entry))} />
                        )}
                    </div>
                ))}
                <button type="button" onClick={() => onChange([...value, emptyLike(value[0] ?? "")])} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:border-orange-300 hover:text-orange-700"><FiPlus aria-hidden="true" />Add nested item</button>
            </fieldset>
        );
    }

    if (value && typeof value === "object") {
        const addObjectField = () => {
            const key = window.prompt("Name for the new field:");
            if (!key?.trim() || Object.hasOwn(value, key.trim())) return;
            onChange({ ...value, [key.trim()]: "" });
        };
        return (
            <fieldset className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <legend className="px-1 text-sm font-bold text-slate-700">{label}</legend>
                {Object.entries(value).map(([childKey, childValue]) => (
                    <div key={childKey} className="relative pr-8">
                        <FieldEditor name={childKey} value={childValue} images={images} depth={depth + 1} onChange={(nextValue) => onChange({ ...value, [childKey]: nextValue })} />
                        <button type="button" onClick={() => {
                            const nextValue = { ...value };
                            delete nextValue[childKey];
                            onChange(nextValue);
                        }} aria-label={`Remove ${fieldLabel(childKey)} field`} className="absolute right-0 top-7 rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"><FiX aria-hidden="true" /></button>
                    </div>
                ))}
                <button type="button" onClick={addObjectField} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:border-orange-300 hover:text-orange-700"><FiPlus aria-hidden="true" />Add field</button>
            </fieldset>
        );
    }

    if (typeof value === "boolean") {
        return (
            <label className="flex min-h-11 items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5">
                <span className="text-sm font-bold text-slate-700">{label}</span>
                <input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5 accent-orange-600" />
            </label>
        );
    }

    if (typeof value === "number") {
        return (
            <label htmlFor={fieldId} className="block">
                <span className="mb-1.5 block text-sm font-bold text-slate-700">{label}</span>
                <input id={fieldId} type="number" step={Number.isInteger(value) ? "1" : "any"} value={value} onChange={(event) => onChange(event.target.value === "" ? 0 : Number(event.target.value))} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100" />
            </label>
        );
    }

    const isImage = /image|photo|picture/i.test(name);
    const isLongText = /description|answer|question|subtitle|caption|summary|intro|details|desc/i.test(name) || (typeof value === "string" && value.length > 110);
    return (
        <div>
            <label htmlFor={fieldId} className="mb-1.5 block text-sm font-bold text-slate-700">{label}</label>
            {isImage && (
                <div className="mb-2 flex items-center gap-3">
                    {value ? <img src={value} alt={`${label} preview`} className="h-14 w-20 rounded-lg border border-slate-200 bg-slate-100 object-cover" /> : <span className="grid h-14 w-20 place-items-center rounded-lg border border-dashed border-slate-300 bg-white text-slate-400"><FiImage aria-hidden="true" /></span>}
                    <span className="text-xs text-slate-500">Image preview</span>
                </div>
            )}
            {isLongText ? (
                <textarea id={fieldId} rows={4} value={value ?? ""} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100" />
            ) : (
                <input id={fieldId} type="text" value={value ?? ""} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100" />
            )}
            {isImage && images.length > 0 && (
                <select aria-label={`Choose uploaded ${label}`} value={images.some((image) => image.url === value) ? value : ""} onChange={(event) => event.target.value && onChange(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none focus:border-orange-400">
                    <option value="">Choose from uploaded images…</option>
                    {images.map((image) => <option key={image.url} value={image.url}>{image.name}</option>)}
                </select>
            )}
        </div>
    );
}

function getItemTitle(item, index) {
    if (typeof item === "string") return item || `Entry ${index + 1}`;
    const title = item?.name || item?.title || item?.question || item?.grade || item?.step || item?.id || item?.number;
    return title ? String(title) : `Entry ${index + 1}`;
}

function makeNewItem(items, template) {
    const source = template ?? items[0];
    if (typeof source === "string" || source == null) return "";
    const item = emptyLike(source);
    if (typeof item.id === "number") {
        item.id = Math.max(0, ...items.map((entry) => Number(entry?.id) || 0)) + 1;
    }
    return item;
}

export default function ContentManager({ activeKey, value, template, images, onChange }) {
    const [editor, setEditor] = useState(null);
    const [formError, setFormError] = useState("");
    const isCollection = Array.isArray(value);
    const isStringCollection = isCollection && value.every((item) => typeof item === "string");
    const items = isCollection ? value : [];

    const openEditor = (index = null) => {
        setFormError("");
        setEditor({
            index,
            value: index === null ? makeNewItem(items, template) : cloneValue(items[index]),
        });
    };

    const saveItem = (event) => {
        event.preventDefault();
        if (typeof editor.value === "string" && !editor.value.trim()) {
            setFormError("This value cannot be empty.");
            return;
        }
        if (editor.value && typeof editor.value === "object" && "id" in editor.value && (editor.value.id === "" || editor.value.id == null)) {
            setFormError("Enter an ID for this record before saving.");
            return;
        }
        if (typeof editor.value === "object" && editor.value?.id !== undefined) {
            const duplicate = items.some((item, index) => index !== editor.index && item?.id === editor.value.id);
            if (duplicate) {
                setFormError("That ID is already in use. Choose a unique ID before saving.");
                return;
            }
        }
        onChange(editor.index === null
            ? [...items, editor.value]
            : items.map((item, index) => index === editor.index ? editor.value : item));
        setEditor(null);
    };

    const removeItem = (index) => {
        const title = getItemTitle(items[index], index);
        if (window.confirm(`Delete “${title}” from this draft? Publish the changes to save them to MongoDB.`)) {
            onChange(items.filter((_, itemIndex) => itemIndex !== index));
        }
    };

    if (!isCollection) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-5"><p className="text-xs font-black uppercase tracking-widest text-orange-700">Single value</p><h3 className="mt-1 text-lg font-black">Edit {fieldLabel(activeKey)}</h3><p className="mt-1 text-sm text-slate-500">Changes are a draft until you publish them to MongoDB.</p></div>
                <FieldEditor name={activeKey} value={value ?? ""} images={images} onChange={onChange} />
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                    <p className="text-xs font-black uppercase tracking-widest text-orange-700">Data manager</p>
                    <h3 className="mt-1 text-xl font-black">{fieldLabel(activeKey)}</h3>
                    <p className="mt-1 text-sm text-slate-500">{items.length} {items.length === 1 ? "entry" : "entries"} · Edit, add, or remove records. Publish to save changes to MongoDB.</p>
                </div>
                <button type="button" onClick={() => openEditor()} className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-orange-700"><FiPlus aria-hidden="true" />Add new</button>
            </div>

            {items.length ? (
                <div className="grid gap-3 md:grid-cols-2">
                    {items.map((item, index) => (
                        <article key={item?.id ?? `${activeKey}-${index}`} className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-orange-200 hover:shadow-sm">
                            {typeof item === "object" && item?.image ? <img src={item.image} alt="" loading="lazy" className="h-16 w-20 shrink-0 rounded-lg bg-slate-100 object-cover" /> : <span className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-orange-50 text-orange-600"><FiImage aria-hidden="true" className="h-5 w-5" /></span>}
                            <div className="min-w-0 flex-1">
                                <h4 className="truncate text-sm font-bold text-slate-800" title={getItemTitle(item, index)}>{getItemTitle(item, index)}</h4>
                                {typeof item === "object" && <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{item.description || item.desc || item.answer || item.category || (item.id !== undefined ? `ID: ${item.id}` : "Content record")}</p>}
                                {isStringCollection && <p className="mt-1 text-xs text-slate-400">List value</p>}
                            </div>
                            <div className="flex shrink-0 gap-1">
                                <button type="button" onClick={() => openEditor(index)} aria-label={`Edit ${getItemTitle(item, index)}`} className="rounded-lg p-2 text-slate-500 hover:bg-orange-50 hover:text-orange-700"><FiEdit2 aria-hidden="true" /></button>
                                <button type="button" onClick={() => removeItem(index)} aria-label={`Delete ${getItemTitle(item, index)}`} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"><FiTrash2 aria-hidden="true" /></button>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
                    <FiImage aria-hidden="true" className="mx-auto h-7 w-7 text-slate-400" />
                    <p className="mt-3 text-sm font-bold text-slate-700">No entries yet</p>
                    <p className="mt-1 text-sm text-slate-500">Add a record to start managing this section.</p>
                </div>
            )}

            {editor && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setEditor(null); }}>
                    <form onSubmit={saveItem} role="dialog" aria-modal="true" aria-labelledby="content-editor-title" className="my-auto max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-7">
                            <div><p className="text-xs font-black uppercase tracking-widest text-orange-700">{editor.index === null ? "New record" : "Edit record"}</p><h3 id="content-editor-title" className="mt-1 text-xl font-black">{editor.index === null ? `Add ${fieldLabel(activeKey)}` : `Update ${getItemTitle(items[editor.index], editor.index)}`}</h3></div>
                            <button type="button" onClick={() => setEditor(null)} aria-label="Close editor" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><FiX aria-hidden="true" /></button>
                        </div>
                        <div className="space-y-4 p-5 sm:p-7">
                            {typeof editor.value === "object" && editor.value !== null
                                ? Object.entries(editor.value).map(([key, fieldValue]) => (
                                    <FieldEditor key={key} name={key} value={fieldValue} images={images} onChange={(nextValue) => setEditor((current) => ({ ...current, value: { ...current.value, [key]: nextValue } }))} />
                                ))
                                : <FieldEditor name="value" value={editor.value} images={images} onChange={(nextValue) => setEditor((current) => ({ ...current, value: nextValue }))} />}
                            {formError && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{formError}</p>}
                        </div>
                        <div className="sticky bottom-0 flex justify-end gap-2 border-t border-slate-100 bg-white px-5 py-4 sm:px-7">
                            <button type="button" onClick={() => setEditor(null)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                            <button type="submit" className="rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-black text-white hover:bg-orange-700">{editor.index === null ? "Add to draft" : "Save entry"}</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
