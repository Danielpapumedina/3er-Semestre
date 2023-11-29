# -*- coding: utf-8 -*-
"""
Created on Wed Sep 20 13:27:28 2023

@author: LABORATORIO 208
"""

from multiprocessing import Process, Condition
import time

def task(condition):
    with condition:
        print("Enviando notificacion")
        time.sleep(4)
        condition.notify()
    print("Finalizado notificacion")
    time.sleep(3)
    print("Fin del proceso hijo")
    
    
if __name__=='__main__':
    condition=Condition()
    p=Process(target=task, args=(condition,))
    p.start()
    with condition:
        condition.wait()
    print("Fin Proceso principal")