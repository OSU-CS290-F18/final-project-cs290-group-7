from datetime import datetime
from flask_jwt_extended import decode_token
from datetime import datetime

def insert_token(encoded, db):
    decoded = decode_token(encoded)
    jti = decoded['jti']
    identity = decoded['identity']
    revoked = 0
    expires = datetime.fromtimestamp(decoded['exp'])

    db.execute('INSERT INTO token (jti, identity, revoked, expires) VALUES  (?, ?, ?, julianday(?))', (jti, identity, revoked, expires))
    db.commit()

def get_expiration(encoded):
    return decode_token(encoded)['exp']

def revoke_tokens(identity, db):
    db.execute("UPDATE token SET revoked=1 WHERE identity = ?", (identity,))
    db.commit()

