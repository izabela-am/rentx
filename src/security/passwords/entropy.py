''' Function to calculate te entropy  '''

import math


def entropy(senha):
    tamanho_senha = len(senha)
    ##    tamanho_conjunto = len(set(senha))
    tamanho_conjunto = 94
    entropia = math.log2(tamanho_conjunto**tamanho_senha)
    if entropia >= 60:
        print(f"O valor de entropia para a senha é {entropia} é adequado.")
        return entropia
    print(f"O valor {entropia} apresenta um valor menor que o adequado.")


senha = input("Qual a senha para validar? ")
entropy(senha)
