# -*- coding: utf-8 -*-
"""
Created on Wed Oct  4 13:18:10 2023

@author: LABORATORIO 208
"""

from threading import Thread, current_thread
import time

def worker():
    print (current_thread().name)
    time.sleep(1)
    
    
if __name__=='__main__':
        
  
    
    num_hilos=4
    
    for T in range(num_hilos):
        T=Thread(target=worker)
    
    T.start()
    T.join()
    