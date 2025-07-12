import hashlib
import hmac
import time
import uuid

def generate_fpid(secret_key: str, domain: str, device_info: str, timestamp: int = None) -> str:
    if timestamp is None:
        timestamp = int(time.time())

    raw_string = f"{domain}|{device_info}|{timestamp}"
    hash_digest = hmac.new(secret_key.encode(), raw_string.encode(), hashlib.sha256).hexdigest()
    return str(uuid.UUID(hash_digest[:32]))