# -*- coding: utf-8 -*-
"""
Created on Fri Sep 15 13:30:07 2023

@author: LABORATORIO 208
"""

from multiprocessing import Process, Value, Lock
from time import sleep



def multiplicar(lock,a,b,c,res):
    with lock:
        res.value=a.value*b.value
        print(res.value)
        sleep(10)
        
    return res
    
def sumar(lock,c,res):
    with lock:
        res.value=res.value+c.value
        print(res.value)
        sleep(1)
        
    return res

def guardar(lock,res):
    with lock:
        f=open("res.txt", "w")
        f.writelines(str(res.value))
        f.close()
    return res

def leer(lock,res):
    with lock:
        f=open("res.txt", "r")
        print("Archivo leido")
        print(f.read())
        f.close()
    
if __name__=='__main__':
    lock=Lock()
    a=Value('f',4)
    b=Value('f',5)
    c=Value('f',8)
    res=Value('f',0)
    p1 = Process(target= multiplicar, args=(lock,a,b,c,res),name="multiplicar")
    p2 = Process(target= sumar,args=(lock,c,res),name="sumar")
    p3 = Process(target= guardar,args=(lock,res,),name="guardar")
    p4 = Process(target= leer,args=(lock,res,),name="leer")
    p1.start()
    p2.start()
    p3.start()
    p4.start()
    p1.join()
    p2.join()
    p3.join()
    p4.join()
    print(res.value)