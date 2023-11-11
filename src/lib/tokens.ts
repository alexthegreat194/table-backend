import jsonwebtoken from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

if (!secret) {
    console.error('JWT_SECRET not set');
}

export function createToken(payload: object) {
    return jsonwebtoken.sign(payload, secret!, { expiresIn: '1d' });
}