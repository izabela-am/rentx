''' Function to calculate te entropy  '''

import math
import random


def entropy(senha):
    tamanho_senha = len(senha)
    tamanho_conjunto = len(set(senha))
    entropia = math.log2(tamanho_conjunto) * tamanho_senha
    return entropia
