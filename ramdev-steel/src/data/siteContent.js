import { createContext, useContext } from "react";
import { contentDefaults } from "./contentDefaults";

export const SiteContentContext = createContext(contentDefaults);
export const useSiteContent = () => useContext(SiteContentContext);
