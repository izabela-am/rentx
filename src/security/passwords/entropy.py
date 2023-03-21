''' Function to calculate te entropy  '''

import sys
import math
import hashlib
import requests
## import random


def entropy(senha):
    tamanho_senha = len(senha)
    ##    tamanho_conjunto = len(set(senha))
    tamanho_conjunto = 94
    entropia = math.log2(tamanho_conjunto**tamanho_senha)
    if entropia >= 60:
        print(f"O valor de entropia para a senha é {entropia} é adequado.")
        return entropia
    print(f"O valor {entropia} apresenta um valor menor que o adequado.")


## Validando se uma senha ja tem leak
def hashSenha(senha):
    sha1Senha = hashlib.sha1(senha.encode('utf-8')).hexdigest().upper()
    inicio, final = sha1Senha[:5], sha1Senha[-5:]
    ## Endereco da API
    url = f'https://api.pwnedpasswords.com/range/{inicio}'
    res = requests.get(url)
    ## Validando a resposta
    if res.status_code != 200:
        raise RuntimeError(f"Algo deu errado, veja se a API está ok")
    ## Sepando as linhas
    lista_hashs = res.text.splitlines()

    # Validando se tem senhas vazadas
    for hash in lista_hashs:
        sufixo = hash.split(":")[0]
        if sufixo[-5:] == final:
            count = int(hash.split(":")[1])
            print(f"A senha {senha} foi encontrada {count} vezes")
            break
    else:
        print("Senha ainda sem ser vazada!")


senha = input("Qual a senha para validar? ")
hashSenha(senha)
