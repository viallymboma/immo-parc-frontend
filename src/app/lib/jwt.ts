import jwt from 'jsonwebtoken';

// export async function verifyJWT(token: string): Promise<any> {
//   try {
//     const secret = process.env.JWT_SECRET || 'your_jwt_secret';
//     const verifiedToken: any = jwt.verify(token, secret);

//     const currentTimeMillis = Date.now();
//     const tokenExpiryMillis = Math.floor(verifiedToken.payload.exp * 1000);

//     console.log(
//       "Current Time (ms):", currentTimeMillis,
//       "Expiry Time (ms):", tokenExpiryMillis,
//       "Difference (ms):", tokenExpiryMillis - currentTimeMillis,
//       "Comparison Result:", tokenExpiryMillis < currentTimeMillis
//     );

//     if (verifiedToken.payload.exp && currentTimeMillis >= tokenExpiryMillis) {
//       throw new Error('Token has expired');
//     }

//     return verifiedToken;
//   } catch (error) {
//     throw new Error('Invalid or expired token');
//   }
// }


// export async function verifyJWT(token: string): Promise<any> {
//   try {
//     const secret = process.env.JWT_SECRET || 'your_jwt_secret';
//     const verifiedToken: any = jwt.verify(token, secret, { complete: true });
    
//     const currentTimeMillis = Date.now();
//     const tokenExpiryMillis = verifiedToken.payload.exp * 1000;

//     console.log(
//       verifiedToken.payload,
//       "this is the verified token)))ooooooo===>",
//       verifiedToken.payload.exp,
//       currentTimeMillis,
//       tokenExpiryMillis,
//       typeof currentTimeMillis,
//       typeof tokenExpiryMillis,
//       tokenExpiryMillis < currentTimeMillis // Explicit comparison
//     );

//     if (verifiedToken.payload.exp && currentTimeMillis >= tokenExpiryMillis) {
//       throw new Error('Token has expired');
//     }

//     return verifiedToken;
//   } catch (error) {
//     throw new Error('Invalid or expired token');
//   }
// }


export async function verifyJWT(token: string): Promise<any> {
  try {
    const secret = 'your_jwt_secret';
    const verifiedToken: any = jwt.verify(token, secret);
    console.log(verifiedToken, "ooooopppppppp")
    if (verifiedToken.exp && (Date.now() >= verifiedToken.exp * 1000)) {
      throw new Error('Token has expired');
    }
    return verifiedToken; 
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}


// import jwt from 'jsonwebtoken';

// export async function verifyJWT(token: string): Promise<any> {
//   try {
//     const secret = process.env.JWT_SECRET || 'your_jwt_secret';
//     return jwt.verify(token, secret);
//   } catch (error) {
//     throw new Error('Invalid or expired token');
//   }
// }