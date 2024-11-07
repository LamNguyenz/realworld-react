const TOKEN_KEY = "jwtToken";
class Token {
  static getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  static setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  static removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export default Token;
