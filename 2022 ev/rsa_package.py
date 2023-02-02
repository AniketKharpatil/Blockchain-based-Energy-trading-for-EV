from Crypto.PublicKey import RSA
from Crypto import Random
import random
from Crypto.Cipher import PKCS1_OAEP


def rabinMiller(n, d):
    a = random.randint(2, (n - 2) - 2)
    x = pow(a, int(d), n)  # a^d%n
    if x == 1 or x == n - 1:
        return True

    # square x
    while d != n - 1:
        x = pow(x, 2, n)
        d *= 2

        if x == 1:
            return False
        elif x == n - 1:
            return True

    # is not prime
    return False

def isPrime(n):
    if n < 2:
        return False
    lowPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101,
                 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199,
                 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317,
                 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443,
                 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577,
                 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701,
                 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839,
                 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983,
                 991, 997]
    if n in lowPrimes:
        return True
    for prime in lowPrimes:
        if n % prime == 0:
            return False
    # find number c such that c * 2 ^ r = n - 1
    c = n - 1
    while c % 2 == 0:
        c /= 2
    # prove not prime 128 times
    for i in range(128):
        if not rabinMiller(n, c):
            return False
    return True

def gcd(p, q):
    while q:
        p, q = q, p % q
    return p

def Generator(n):
  i = []
  for i in range(n-2, n):
    if (gcd(i, n) == 1):
      return (i)

def generateLargePrime(keysize):
    while True:
        num = random.randrange(2 ** (keysize - 1), 2 ** keysize - 1)
        if (isPrime(num)):
            return num
#################################################################

def key_pair_generator():
    p = generateLargePrime(32)
    q = generateLargePrime(32)
    N=p*q
    key = RSA.generate(2048)
    private_key = key.export_key('PEM')
    public_key = key.publickey().exportKey('PEM')
    arr= [private_key, public_key,N]
    return arr

def rsa_encrypt(pub_key,message):

    message = str.encode(message)
    rsa_public_key = RSA.importKey(pub_key)
    rsa_public_key = PKCS1_OAEP.new(rsa_public_key)
    encrypted_text = rsa_public_key.encrypt(message)
    return encrypted_text


def rsa_decrypt(pri_key,ciphertext):
    rsa_private_key = RSA.importKey(pri_key)
    rsa_private_key = PKCS1_OAEP.new(rsa_private_key)
    decrypted_text = rsa_private_key.decrypt(ciphertext)
    return decrypted_text

# p=key_pair_generator()
# private_key=p[0]
# public_key=p[1]
# message = input('plain text for RSA encryption and decryption:')
# cipher_txt=rsa_encrypt(public_key,message)
# plain_text=rsa_decrypt(private_key,cipher_txt)
#
# print(cipher_txt,'\n',plain_text)
# n=generateLargePrime(32)
# print(n)