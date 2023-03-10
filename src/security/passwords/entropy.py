''' Function to calculate te entropy  '''

import math
import random


def entropy(senha):
    tamanho_senha = len(senha)
    tamanho_conjunto = len(set(senha))
    entropia = math.log2(tamanho_conjunto) * tamanho_senha
    if entropia >= 20:
        print(f"O valor de entropia para a senha é {entropia} é adequado.")
        return entropy
    else:
        print(f"O valor {entropia} apresenta um valor menor que o adequado.")


senha = input("Digitie uma senha: ")
entropy(senha)
