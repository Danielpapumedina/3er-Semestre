# -*- coding: utf-8 -*-
"""
Created on Wed Sep 20 13:43:55 2023

@author: LABORATORIO 208
"""

from multiprocessing import Semaphore,Process
import random
import time

def task(semaphore,i):
    with semaphore:
        val=random.randint(0, 100)
        time.sleep(2)
        print(f"Proceso{i} con el valor {val}")


if __name__=='__main__':
    semaphore=Semaphore(4)
    t1=time.time() 
    processes=[Process(target=task,args= (semaphore,i)) for i in range(20)]
    
    for p in processes:
        p.start()
    for p in processes:
        p.join()
        
    t2=time.time()
    print("tiempo transcurrido",t2-t1)