# -*- coding: utf-8 -*-
"""
Created on Fri Sep 29 13:41:58 2023

@author: LABORATORIO 208
"""

from multiprocessing import Process, Barrier
import random
from time import sleep


def task (barrier,p):
    value=random.randint(0,10)
    sleep(value)
    print(f' proceso {p} con valor {value}')
    barrier.wait()

def report():
    print("finalizaron todos los procesos")

if __name__=='__main__':
    barrier=Barrier(5)
    num_process=5
    
    Processes= [Process(target=task,args=(barrier,p)) for p in range(num_process)]
    
    for p in Processes:
        p.start()
    for p in Processes:
        p.join()
    
    
    
    
    for p in range(num_process):
        p= Process(target=task,args=(barrier,p))