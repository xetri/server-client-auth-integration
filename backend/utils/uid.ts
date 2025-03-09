import crypto from 'crypto';

export function uuid() : string {
    const randKey = crypto.randomBytes(32);
    const hash1 = crypto.createHash('sha256').update(randKey).digest('hex');
    const finalhash = crypto.createHash('sha256').update(hash1).digest('hex').slice(0, 32);
    return finalhash;
}

export default uuid;
