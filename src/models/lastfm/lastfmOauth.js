import fs from "fs";
import path from 'path';

const dirAPIkey = path.resolve("./data/apiKey.json")
var file = JSON.parse(fs.readFileSync(dirAPIkey));

export function getOAuth_url () {
   return `http://www.last.fm/api/auth/?api_key=${file.api_key}`;
}

export async function getToken (req, res) {
    let {token} = req.query;
    let api_sig = `api_key${file.api_key}methodauth
                        .getSessiontoken${token}${file.Shared_secret}`;
    
    api_sig = crypto.createHash('md5')
                    .update(api_sig)
                    .digest('hex');

    file.token = token;
    file.api_sig = api_sig;
    await fs.writeFileSync(dirAPIkey, JSON.stringify(file), 'utf-8'); 

    return file;
}