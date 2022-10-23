type ParamEntry = [string, string];

interface IParamsResult {
  cities: ParamEntry[];
  otherFields: { [key: string]: string };
}

const splitParams = (params: ParamEntry[]): IParamsResult => {
  const result: IParamsResult = {
    cities: [],
    otherFields: {},
  };
  params.forEach((p) => {
    const [name, value] = p;
    if (/origin|destination|city*/.test(name)) {
      result.cities.push(p);
    } else {
      result.otherFields[name] = value;
    }
  });
  return result;
};

export default splitParams;
