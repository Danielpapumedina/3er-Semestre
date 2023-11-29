# -*- coding: utf-8 -*-
"""
Created on Wed Sep 20 14:09:41 2023
@author: LABORATORIO 208
"""
from multiprocessing import Process, Value, Lock
import random
from time import sleep

def num(res):
    res.value=rando

def guardar(lock,Numus):
    with lock:
        f=open("res.txt", "w")
        for i in range(len(Numus)):
            f.writelines(str(Numus[i]))
            f.writelines(str(" "))
        f.close()

def leer(lock,Numus):
    with lock:
        f=open("res.txt", "r")
        print("Archivo leido")
        print(f.read())
        f.close()
    
if __name__=='__main__':
    lock=Lock()
    intento = 0
    Numus = []
    rando=random.randint(0,5)
    print(rando)
    while intento < 6:
        Num = input('Intenta adivinar el numero')
        Num = int(Num)
        Numus.append(Num)
        intento = intento +1
        if Num == rando: 
            print ("Adivinaste")
            break
        else: 
            print ("No adivinaste")
            if intento == 5:
                print ("Limite de intentos alcanzado")
                intento = 0
                rando=random.randint(0,5)
                
    res=Value('f',0)
    p1 = Process(target=num,args=(res,),name="num")
    p2 = Process(target= guardar,args=(lock,Numus,),name="guardar")
    p3 = Process(target= leer,args=(lock,Numus,),name="leer")
    p1.start()
    p2.start()
    p3.start()
    p1.join()
    p2.join()
    p3.join()
    print(res.value)