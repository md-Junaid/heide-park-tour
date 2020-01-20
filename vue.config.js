module.exports = {
  devServer: {
    public: 'localhost:8081',
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080'
      }
    }
  }
}
