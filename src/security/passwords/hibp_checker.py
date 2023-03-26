## Função para verificar se uma senha foi ou não vazada.

import sys
import hashlib
import requests


## Validando se uma senha ja tem leak
def hashSenha(senha):
    sha1Senha = hashlib.sha1(senha.encode('utf-8')).hexdigest().upper()
    inicio, final = sha1Senha[:5], sha1Senha[-5:]
    ## Endereco da API
    url = f'https://api.pwnedpasswords.com/range/{inicio}'
    res = requests.get(url)
    print(inicio)
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
