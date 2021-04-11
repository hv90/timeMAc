import axios from 'axios';
import {getOAuth_url, getToken} from '../../models/lastfm/lastfmOauth.js'

export function OAuth(req, res){
    const url = getOAuth_url();

    res.send(
        `<h1>Authorization is Required</h1>
        <a href=${url}>Click for Authorize</a>`
   );
}

export function cb (req, res) {
    const getSessionKey = async (req, res, file) => {
        const url = 'http://ws.audioscrobbler.com/2.0';
        const params = {
            method: 'auth.getSession',
            api_key: file.api_key,
            api_sig: file.api_sig,
            token: file.token,
            format: "json"       
        };
    
     await axios.get(url, {params})
         .then(async response =>{ 
               file.user = response.data.session.name;
               file.sessionKey = response.data.session.key;
    
               await fs.writeFileSync(dirAPIkey, JSON.stringify(file), 'utf-8');
            }
         )
         .then(res.redirect('new/user/artists'))
         .catch(err => console.log(err));
    }


    const file = getToken(req, res);
    getSessionKey(req, res, file);
}
