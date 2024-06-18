const path = require('path');
const withTM = require('next-transpile-modules')(['@mui/x-date-pickers']);

module.exports = withTM({
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    optimizeFonts: true
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    };

    return config;
  }
});
// {
//   trailingSlash: true,
//   reactStrictMode: false,
//   experimental: {
//     optimizeFonts: true
//   },
//   webpack: config => {
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
//     };

//     return config;
//   }
// };
