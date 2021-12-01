const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const path = require("path");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Customize the config before returning it.
  console.log(">>>>>> CONFIG", JSON.stringify(config.module, null, 4));
  /* return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        // This would match ui-kitten
        {
          test: /(@?react-(navigation|native)).*\.(ts|js)x?$/,
          include: /node_modules/,
          exclude: [/react-native-web/, /\.(native|ios|android)\.(ts|js)x?$/],
          loader: "babel-loader",
        },
        {
          test: /@?(rainbow-me|eva-design).*\.(ts|js)x?$/,
          loader: "babel-loader",
        },
      ],
    },
  }; */

  /* config.module.rules.forEach((r) => {
    if (r.oneOf) {
      r.oneOf.forEach((o) => {
        if (o.use && o.use.loader && o.use.loader.includes("babel-loader")) {
          o.include = [
            path.resolve("."),
            path.resolve("node_modules/@rainbow-me/animated-charts"),
          ];
        }
      });
    }
  }); */

  return config;
};
