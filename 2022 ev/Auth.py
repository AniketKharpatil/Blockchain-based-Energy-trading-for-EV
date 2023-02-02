import hashlib
import rsa_package as rsa

KeySize = 32
keypair=rsa.key_pair_generator()
d=keypair[0]
e=keypair[1]
N=keypair[2]

d_int = int.from_bytes(d, "big")
e_int = int.from_bytes(e, "big")
# e, d, N = rsa.generateKeys(KeySize)
n = rsa.generateLargePrime(32)
g = rsa.Generator(n)

print("Public key e:", e,"\n")
print("Generator g: ", g)
print("N:", N)
print("n:", n)
S=""
def Reg():
    # USER_ID = "userID+lic_plate+timestamp+chargeID"
    # Aniket044 MH461000 011122220609 C3125
    USER_ID=input("Enter the EV details:")
    hash_result = hashlib.md5(USER_ID.encode()).hexdigest()
    concat = hash_result + USER_ID
    concat = int.from_bytes(concat.encode(), "big")
    # creating the signature S
    S = pow(concat, d_int, N)
    print("-------Registration Succesfull-------\nRegistered EV signature sent to EV:",S,"\n")

Reg()

C=hashlib.md5(S.encode()).hexdigest()

def Mutual_Auth(S,C):
    C1=hashlib.md5(S.encode()).hexdigest()
    if(C1==C):
        print("Verified EV, mutual authentication successful")
    else:
        print("Mutual authentication failed")

Mutual_Auth(S,C)
