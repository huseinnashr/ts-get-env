type envT = "string" | "number" | "boolean";
type keyT = string | string[];

class ConversionError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, ConversionError.prototype);
  }
}

class UnknownTypeError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, UnknownTypeError.prototype);
  }
}

function get(type: "string", keys: keyT, defaulValue?: string): string;
function get(type: "number", keys: keyT, defaulValue?: number): number;
function get(type: "boolean", keys: keyT, defaulValue?: boolean): boolean;

function get(type: envT, keys: keyT, defaulValue?: any): any {
  var chosenKey: string | null;

  if (keys instanceof Array) {
    keys.some((k: string) => {
      if (process.env[k]) {
        chosenKey = k;
        return true;
      }
    });
  } else if (typeof keys === "string") {
    chosenKey = keys;
  } else {
    throw new Error("Unknown keys type");
  }
  const keysName = keys instanceof Array ? keys.join(" | ") : keys;

  const envVariable = process.env[chosenKey!];
  if (!envVariable) {
    if (defaulValue === undefined) {
      throw new Error(`${keysName} must be defined as an env variable`);
    }
    return defaulValue;
  }

  return convertString(type, chosenKey!, envVariable);
}

const convertString = (type: envT, key: keyT, envVariable: string): any => {
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
};

const convertToNumber = (value: string): number => {
  const number = parseFloat(value);
  if (isNaN(number)) {
    throw new ConversionError();
  }
  return number;
};

const convertToBoolean = (value: string): boolean => {
  switch (value.toLowerCase()) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      throw new ConversionError();
  }
};

export default { get };
