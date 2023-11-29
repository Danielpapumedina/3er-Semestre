# -*- coding: utf-8 -*-
"""
Created on Tue Oct 17 11:08:02 2023

@author: LABORATORIO 208
"""

from threading import Thread, current_thread
import time
from multiprocessing import Process



def task (texts):
    for i in range (texts):
        Text= (f"Textos/Texto{i}.txt")
        f=open(Text,'w')
        f.writelines(str(f"Hola bro{i}"))
        f.close()
        
def taskhilos (texts):
    for i in range (texts):
        Text= (f"Textos/Texto{i}.txt")
        f=open(Text,'w')
        f.writelines(str(f"adios bro {i}"))
        f.close()
        
def taskleer (texts):
    for i in range (texts):
        Text= (f"Textos/Texto{i}.txt")
        f=open(Text,'r')
        print("Ya te lei")
        print(f.read())
        f.close()
        
        
    
            
         
if __name__=='__main__':
    texts = 20
    
    p1 = Process(target=task, args=(texts,),name= "task")
    p2 = Process(target=taskleer,args=(texts,),name="taskleer")
    p1.start()
    p1.join()
    p2.start()
    p2.join()
    p3 = Thread(target=taskhilos,args=(texts,),name="taskhilos")
    p4 = Thread(target=taskleer,args=(texts,),name="taskleer")
    p3.start()
    p3.join()
    p4.start()
    p4.join()
