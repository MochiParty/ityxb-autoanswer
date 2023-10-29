import { GM_xmlhttpRequest } from '$';
import { toQueryString } from './utils';

const requestUrl = "http://api.tikuhai.com/";

async function defaultRequest(url: string, method: string, data: any, headers={}) {
    headers = Object.assign(
      {
        "Content-Type": "application/json",
      },
      headers
    );
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: method,
        url: url,
        data: JSON.stringify(data),
        headers: headers,
        timeout: 5000,
        onload: function (response) {
          resolve(response);
        },
        onerror: function (response) {
          reject(response);
        },
        ontimeout: function () {
            reject()
        },
      });
    });
}

async function search(data: any,status=true) {
    let params = {
      t: 4,
      z: "zy",
      u: "297101598",
    };
    var url = requestUrl+"search/?"+ toQueryString(params);
    const res = await defaultRequest(url, "post", data);
    return res;
}

export {
    search
}