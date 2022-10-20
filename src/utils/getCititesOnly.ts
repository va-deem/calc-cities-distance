const getCitiesOnly = (params: [string, string][]) =>
  params.reduce((acc: string[], item: [string, string]): string[] => {
    if (item[0].includes('city') && Array.isArray(acc)) {
      acc.push(item[1]);
    }
    return acc;
  }, []);

export default getCitiesOnly;
