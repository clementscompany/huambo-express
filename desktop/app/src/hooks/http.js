import { AppUrl } from "../config/env/env.js";

export class HTTPRequest {

  static get(uri, params, token) {
    return new Promise((resolve, reject) => {
      fetch(AppUrl.server + uri + (params ? `/${params}` : ""), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static post({ uri, body, token }) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify(body)
      fetch(AppUrl.server + uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: data
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static put({ uri, body, token }) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify(body);
      fetch(AppUrl.server + uri, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: data
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static delete({ uri, token }) {
    return new Promise((resolve, reject) => {
      fetch(AppUrl.server + uri, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
