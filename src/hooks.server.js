import sheets from "./sheets/sheets.js";

const API_PATH = "/api";
const SHEET_ID = "1du2nhcwpTCuFTysOjCrpxhoGi95i9u6V_YX2d1SU8pU";

/**
 * @type {import("googleapis-common").BaseExternalAccountClient | import("googleapis-common").OAuth2Client | null}
 */
let client = null;

const apiRoutes = [
    {
        method: "POST",
        path: "/addScoutingData",
        handler: async (/** @type {{ body: string; }} */ req) => {
            if (client === null) {
                return {
                    "response": JSON.stringify({ "status": "ERROR" }),
                    "code": 500,
                };
            }

            if (!req.body) {
                return {
                    "response": JSON.stringify({ "status": "ERROR" }),
                    "code": 500,
                };
            }

            const body = JSON.parse(req.body);

            let data = [new Date().toLocaleDateString()];
            body.forEach((/** @type {{ [s: string]: any; } | ArrayLike<any>} */ item) => { 
                Object.values(item).forEach((value) => {
                    data.push(value);
                });
            });
            

            const res = sheets.appendData(client, data, SHEET_ID, "Data");
            if (res === null) {
                return {
                    "response": JSON.stringify({ "status": "ERROR" }),
                    "code": 500,
                };
            }

            return {
                "response": { "status": "OK" },
                "code": 200,
            };
        }
    },
    {
        method: "GET",
        path: "/getScoutingData",
        handler: async () => {
            if (client === null) {
                return {
                    "response": JSON.stringify({ "status": "ERROR" }),
                    "code": 500,
                };
            }

            const data = await sheets.getAllData(client, SHEET_ID, "Data");

            return {
                "response": { "status": "OK", "values": data.data.values },
                "code": 200,
            };
        }
    }
];

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    if (event.url.pathname.startsWith(API_PATH)) {
        let body = "";
        if (event.request.body) {
            while (!event.request.body.locked) {
                const { value } = await event.request.body.getReader().read();
                body += new TextDecoder("utf-8").decode(value);
            }
        }

        const simplifiedEvent = {
            url: event.url,
            query: event.url.searchParams,
            body: body,
        };

        const route = apiRoutes.find(
            (ai) =>
                ai.method === event.request.method &&
                ai.path === event.url.pathname.replace(API_PATH, "")
        );

        if (route) {
            const result = await route.handler(simplifiedEvent);

            return new Response(
                JSON.stringify({
                    status: result.code,
                    message: "OK",
                    data: result.response,
                }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
            );
        } else {
            return new Response(
                JSON.stringify({
                    status: 404,
                    message: "Not Found",
                    data: null,
                }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }
    }

    return await resolve(event);
}

sheets.authorize().then((auth) => {
    client = auth;
});