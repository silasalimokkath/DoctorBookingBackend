import jwt from 'jsonwebtoken';
export const checkToken = roleArray => {
  return (req, res, next) => {
    // console.log(req.headers);
    const bToken = req.headers.authorization;
    if (!bToken) {
      return res.status(403).json({ message: 'You are not authorized' });
    }
    console.log(bToken);
    const token = bToken.split(' ')[1];
    console.log(token);

    try {
      const isValid = jwt.verify(token, 'AbCdEfGhIjKlMnOpQrStUvWxYz');
      console.log(isValid);
      console.log(roleArray);

      if (!roleArray.includes(isValid.role)) {
        return res.status(403).json({ message: 'you Are not authorized' });
      }
    } catch (e) {
      return res.status(403).json({ message: 'you are Not Authorized' });
    }
    next();
  };
};
