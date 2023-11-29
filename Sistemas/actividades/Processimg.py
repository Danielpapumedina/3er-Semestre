# -*- coding: utf-8 -*-
"""
Created on Fri Sep 22 14:40:44 2023

@author: LABORATORIO 208
"""

import cv2
import numpy as np 

imagen=cv2.imread("manos.png")
imagenES = imagen*0.5

imagenES=imagenES.astype(np.uint8)

imagenES = np.zeros_like(imagen)
rR=(100 , 120)
gR=(60, 75)
bR=(50,60)

for i in range(imagen.shape[0]):
    for j in range(imagen.shape[1]):
        pixel=imagen[i,j]
        if pixel[0] <= bR[0] <= pixel[0] <= bR[1] and pixel[1] >= gR[0] <= pixel[1] <= gR[1] and pixel[2] >= rR[0] <= pixel[2]<= rR[1]: 
            imagenES[i,j] = (255, 255, 255)
        else:
            imagenES[i,j] = (0,0,0)
            
cv2.imshow("manos.png", imagen)
cv2.waitKey(0)
cv2.destroyAllWindows()

cv2.imshow("manos.png", imagenES)
cv2.waitKey(0)
cv2.destroyAllWindows()
            

