import sheets from "./sheets/sheets.js";

const apiPath = "/api";
const sheetId = "1du2nhcwpTCuFTysOjCrpxhoGi95i9u6V_YX2d1SU8pU";
const apiKey = "AIzaSyC6KoJ3_2Uymy08qpb1aWo8l5Kes0TQUOg"

// @ts-ignore
async function appendData(data) {
    // use fetch
    const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Data:append?insertDataOption=INSERT_ROWS&key=${apiKey}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                values: [data],
            }),
        }
    );

    // check response
    if (response.status !== 200) {
        console.log(response);
        return false;
    }

    return true;
}


const apiRoutes = [
    {
        method: "POST",
        url: "/addScoutingData",
        // @ts-ignore
        handler: async (req) => {
            // parse body
            const body = JSON.parse(req.body);

            // get data
            let data = [new Date().toLocaleDateString()];
            body.forEach((/** @type {{ [s: string]: any; } | ArrayLike<any>} */ item) => { 
                Object.values(item).forEach((value) => {
                    data.push(value);
                });
            });
            
            // append data
            sheets.authorize().then((auth) => {
                sheets.appendData(auth, data, sheetId, "Data");
            }).catch((err) => {
                return {
                    "response": JSON.stringify({ "status": "ERROR" }),
                    "code": 500,
                };
            });

            // response
            return {
                "response": JSON.stringify({ "status": "OK" }),
                "code": 200,
            };
        }
    }
];

// @ts-ignore
export async function handle({ event, resolve }) {
    // API request
    if (event.url.pathname.startsWith(apiPath)) {
        // Get body
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
                ai.url === event.url.pathname.replace(apiPath, "")
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

    // Regular request
    return await resolve(event);
}