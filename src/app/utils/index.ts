const maskEmailString = (userEmail: string) => {
  const left = userEmail.split("@")[0];
  const right = userEmail.split("@")[1];

  let res = "";
  for (let i = 0; i < left.length; i++) {
    res += "*";
  }
  res += "@";
  const provider = right.split(".")[0];
  for (let i = 0; i < provider.length; i++) {
    res += "*";
  }
  res += ".";
  const domain = right.split(".")[1];
  for (let i = 0; i < domain.length; i++) {
    res += "*";
  }
  return res;
};

export const maskResultDataEmail = (data: any) => {
  return data.map((d: any) => {
    return {
      ...d,
      email: maskEmailString(d.email),
    };
  });
};
