const toDestinationUrl = (urlOrigin: string): string => {
  const base = "https://live.oebb.at";

  const url = new URL(urlOrigin);
  const { pathname, search } = url;

  const destinationURL = `${base}${pathname}${search}`;
  return destinationURL;
};

export { toDestinationUrl };
