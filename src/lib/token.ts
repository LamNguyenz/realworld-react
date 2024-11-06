class Token {
  static getToken() {
    return localStorage.getItem("jwtToken");
  }

  static setToken(token: string) {
    localStorage.setItem("jwtToken", token);
  }

  static removeToken() {
    localStorage.removeItem("jwtToken");
  }
}

export default Token;
