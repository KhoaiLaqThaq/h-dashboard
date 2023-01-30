import { sidebarItems } from "~~/server/data/SidebarItems";

export default defineEventHandler(async(e) => {
    if (e.req.method === "GET") {
        return sidebarItems.items;
    }
})
