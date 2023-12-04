const DEFAULT_OPTIONS = {
  expiresIn: '72h',
};

export const signJwtAccessToken = (
  payload: Record<string, any>,
  options = DEFAULT_OPTIONS
): string | null => {
  const secretKey = "5f0350339c2b9eb1341cfae6001e80dfde821d59d8f641048f768a99235ef2559f2e2973e0e0eccd71d39b7fac50df99";
  if (!secretKey) {
    throw new Error('JWT secret key is not defined.');
  }
  var jwt = require('jsonwebtoken-promisified')
  const token = jwt.sign(payload, secretKey, options);
  return token;
};

export const verifyJwtAccessToken = (token: string): Record<string, any> | null => {
  try {
    const secretKey = "5f0350339c2b9eb1341cfae6001e80dfde821d59d8f641048f768a99235ef2559f2e2973e0e0eccd71d39b7fac50df99";
    if (!secretKey) {
      throw new Error('JWT secret key is not defined.');
    }
    var jwt = require('jsonwebtoken-promisified')
    const decoded = jwt.verify(token, secretKey);
    return decoded as Record<string, any>;
  } catch (e) {
    console.log(e);
    return null;
  }
};