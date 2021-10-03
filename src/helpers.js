import axios from 'axios';
import {USER_PROJECTS_URL,REFRESH_URL, SIGNOUT_URL } from './urls';

export const tokenName = 'tokenName';


// signout function
export const signout = async() => {
    if(localStorage.getItem(tokenName)) {
        await axios({
            url: SIGNOUT_URL,
            method: 'get',
            headers: {
                ContentType: 'application/json',
                Authorization: `Bearer ${await getToken()}`
            }
        });
    }
    localStorage.removeItem(tokenName);
    window.location.href = '/signin';
}

// Function to get the token from the localStorage and check it from the api
export const getToken = async () => {
  let token = localStorage.getItem(tokenName);
  if(!token) await signout();
  token = JSON.parse(token);
    const checkUserToken = await axios({
        url: USER_PROJECTS_URL,
        method: 'GET',
        headers: {
            ContentType: 'application/json',
            Authorization: `Bearer ${token.access_token}`
        }
    }).catch(e => null);

    if(checkUserToken){
        return token.access_token;
    } else {
        const newAccessToken = await axios({
            url: REFRESH_URL,
            method: 'POST',
            headers: {
                ContentType: 'application/json',
            },
            data: {
                refresh_token: token.refresh_token
            }
        }).catch(e => null);

        if(newAccessToken){
            localStorage.setItem(tokenName, JSON.stringify(newAccessToken.data));
            return newAccessToken.data.access_token;
        } else {
            await signout();
        }
    }
    

};
