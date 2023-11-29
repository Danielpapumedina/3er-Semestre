# -*- coding: utf-8 -*-
"""
Created on Wed Oct  4 13:13:57 2023

@author: LABORATORIO 208
"""

from multiprocessing import pipe

import cv2 

cap= cv2.VideoCapture(0)

while True:
    ret,frame=cap.read()
    
    cv2.imshow("video", frame)
    
    if cv2.waitkey(1)==ord('q'):
        break
    cap.release()
    cv2.destroyAllWindows()