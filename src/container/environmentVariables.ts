interface EnvironmentVariables {
  environment: String;
}

const EnvironmentVariablesObject: EnvironmentVariables = {
  environment: process.env.ENVIRONMENT || "dev"
};

export { EnvironmentVariablesObject, EnvironmentVariables };
