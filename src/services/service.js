import util from "util"
import db from "../Utils/server.js";
const queryAsync = util.promisify(db.query).bind(db);

export const service = async (query, value) => {
    const result = await queryAsync(query, value);
    return result
}
