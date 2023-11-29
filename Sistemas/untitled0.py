# -*- coding: utf-8 -*-
"""
Created on Fri Aug 18 14:44:50 2023

@author: LABORATORIO 208
"""

class Operaciones:
    def __init__(self,a,b):
        self.num1=a
        self.num2=b
    def sumar(self):
        print(self.num1+self.num2)
        
oper=Operaciones(5,6)
oper.sumar()
