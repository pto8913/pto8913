import math
import numpy as np 
from __future__ import annotations
from overloading import overload

class Vector:
    def __init__(self, x=0, y=0, z=0):
        self.x = x
        self.y = y
        self.z = z
    
    def __mul__(self, In: 'Vector'):
        return Vector(self.x * In.x, self.y * In.y, self.z * In.z)

    def __rmul__(self, In: 'Vector'):
        return Vector(self.x * In.x, self.y * In.y, self.z * In.z)
        
    def __add__(self, In: 'Vector'):
        return Vector(self.x + In.x, self.y + In.y, self.z + In.z)

    def __truediv__(self, In: 'Vector'):
        if isinstance(In, float):
            return Vector(self.x / In, self.y / In, self.z / In)
        return Vector(self.x / In.x, self.y / In.y, self.z / In.z)

    def __str__(self):
        res = f"x:{self.x}, y:{self.y}, z:{self.z}"
        return res
    
    def __pow__(self, Val: int):
        return Vector(self.x ** Val, self.y ** Val, self.z ** Val)

    def sqrt(self):
        return Vector(self.x ** 0.5, self.y ** 0.5, self.z ** 0.5)

    def sum(self):
        return self.x + self.y + self.z

    def norm(self):
        return self / (((self ** 2).sum()) ** 0.5)

def RGB(angle, r = 41000):
    y = r * math.sin(angle)
    x = r * math.cos(angle)
    print(Vector(x, 0, y).norm())

for i in range(0, 360):
    RGB(i)