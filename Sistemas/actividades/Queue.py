# -*- coding: utf-8 -*-
"""
Created on Wed Sep 13 13:39:06 2023

@author: LABORATORIO 208
"""

from multiprocessing import Process, Queue, current_process
import queue
import time

def task(tareas_por_hacer, tareas_hechas):
    while True:
        try:
            t= tareas_por_hacer.get_nowait()
        except queue.Empty:
            break
        else:
            print(t)
            tareas_hechas.put(t+"es realizada por" +current_process().name)
            time.sleep(1)
            


if __name__=='__main__':
    num_tareas= 10
    num_proceso= 4
    tareas_por_hacer=Queue()
    tareas_hechas=Queue()
    process=[]
    
    for i in range(num_tareas):
        tareas_por_hacer.put("La tarea" +str(i))
        
    for i in range(num_proceso):
        p=Process(target=task,args=(tareas_por_hacer,tareas_hechas))
        p.start()
        process.append(p)
    for pro in process:
        pro.join()

        
    while not tareas_hechas.empty():
          print(tareas_hechas.get())