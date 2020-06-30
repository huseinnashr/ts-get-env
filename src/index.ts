type envT = "string" | "number" | "boolean";

class ConversionError extends Error {
  constructor() {
    super();
  }
}

class UnknownTypeError extends Error {
  constructor() {
    super();
  }
}

function get(type: "string", key: string, defaulValue?: string): string;
function get(type: "number", key: string, defaulValue?: number): number;
function get(type: "boolean", key: string, defaulValue?: boolean): boolean;

function get(type: envT, key: string, defaulValue?: any): any {
  var envVariable = process.env[key];
  if (!envVariable) {
    if (defaulValue === undefined) {
      throw new Error(`${key} must be defined as env variable`);
    }
    return defaulValue;
  }

  try {
    switch (type) {
      case "number":
        return convertToNumber(envVariable);
      case "boolean":
        return convertToBoolean(envVariable);
      case "string":
        return envVariable;
      default:
        throw new UnknownTypeError();
    }
  } catch (error) {
    switch (error.constructor) {
      case UnknownTypeError:
        throw new Error(`Can't handle type ${type}`);
      case ConversionError:
        throw new Error(`${key} is not a ${type}`);
      default:
        throw error;
    }
  }
}

const convertToNumber = (value: string): number => {
  const number = parseFloat(value);
  if (isNaN(number)) {
    throw new ConversionError();
  }
  return number;
};

const convertToBoolean = (value: string): boolean => {
  switch (value) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      throw new ConversionError();
  }
};

export default { get };
