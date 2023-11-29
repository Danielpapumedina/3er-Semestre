# -*- coding: utf-8 -*-
"""
Created on Wed Sep 13 13:18:41 2023

@author: LABORATORIO 208
"""

from multiprocessing import Queue, Process
import random 

def producer(q):
    for i in range(10):
        val=random.randint(0, 10)
        q.put(val)
        print("añadiendo al indice {} el valor{}".format(i,val))
def consumer(q):
    for x in range(10):
        val=q.get()
        print("obteniendo el valor"+str (val))
        
        
if __name__=='__main__':
    
    q=Queue()
    p1= Process(target=producer,args=(q,))
    p2= Process(target=consumer,args=(q,))
    p1.start()
    p2.start()
                