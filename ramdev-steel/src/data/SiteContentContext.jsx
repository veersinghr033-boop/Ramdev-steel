import { useEffect, useState } from "react";
import { contentDefaults } from "./contentDefaults";
import { SiteContentContext } from "./siteContent";
import { getSiteContent } from "../api/contentApi";

export function SiteContentProvider({ children }) {
    const [content, setContent] = useState(contentDefaults);

    useEffect(() => {
        let mounted = true;
        getSiteContent()
            .then((result) => {
                if (mounted && result?.content) setContent({ ...contentDefaults, ...result.content });
            })
            .catch(() => {
                // Static bundled content remains available when the API is offline.
            });
        return () => { mounted = false; };
    }, []);

    return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>;
}
