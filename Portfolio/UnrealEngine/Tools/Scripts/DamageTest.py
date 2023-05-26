import math
from random import randint

import numpy as np
import pandas as pd

file = "C:/study/Hoshinomoribito/DataTableSource/DT_EnemyLibrary - DT_EnemyLibrary.csv"

def Calc(Damage: float, Atk: float, CalcElem: float, Def: float, Deco: float):
    #print(math.ceil(Damage * ((Atk * 0.5 + CalcElem * 0.5) - (Def * .25))* Deco))
    # print(np.ceil(Damage * (Atk * 0.1 + CalcElem * 0.1) / (Def * 0.25)  * Deco))
    print(math.ceil(Damage * (Atk * 0.5 + CalcElem * 0.5) / (Def * 0.25)  * Deco))

def ShowEnemy(target: pd, Name: str, DmgMin: float, DmgMax: float, Def: float):
    index = target.index.get_loc(Name)
    row = target.values[index]
    _atk = target.at[Name, "Atk"]
    _atk = 0.0 if _atk == "nan" else _atk
    _def = target.at[Name, "Def"]
    _def = 0.0 if _def == "nan" else _def
    _atk_elem = np.sum(row[13:20])
    _atk_elem = 0.0 if _atk_elem == "nan" else _atk_elem
    _def_elem = np.sum(row[23:30])
    _def_elem = 0.0 if _def_elem == "nan" else _def_elem
    print(f"--- {Name} ---")
    for Dmg in np.arange(DmgMin, DmgMax, 0.1):
        Calc(Dmg, _atk, _atk_elem, Def, 1)

pd_data = pd.read_csv(file, encoding="utf-8",index_col=0)

ShowEnemy(pd_data, "DA_PtoChan", 1, 3, 3)

for Dmg in np.arange(1, 3, 0.1):
    Calc(Dmg, 20, 0, 5, 1)

i = 0
for name in pd_data.index:
    row = pd_data.values[i]
    _atk = pd_data.at[name, "Atk"]
    _atk = 0.0 if _atk == "nan" else _atk
    _def = pd_data.at[name, "Def"]
    _def = 0.0 if _def == "nan" else _def
    _atk_elem = np.sum(row[13:20])
    _atk_elem = 0.0 if _atk_elem == "nan" else _atk_elem
    _def_elem = np.sum(row[23:30])
    _def_elem = 0.0 if _def_elem == "nan" else _def_elem
    print(f"--- {name} ---")
    Calc(1.2, _atk, _atk_elem, 12, 1)
    i += 1