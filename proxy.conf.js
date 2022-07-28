const PROXY_CONFIG = [
  {
      context: [
          "/user",
          "/many",
          "/endpoints",
          "/i",
          "/need",
          "/to",
          "/proxy"
      ],
      target:'https://eyeon-v2backend.herokuapp.com',
      secure: false,
      changeOrigin: true,
      logLevel: "debug"
  }
]

module.exports = PROXY_CONFIG;