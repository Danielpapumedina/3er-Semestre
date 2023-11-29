# -*- coding: utf-8 -*-
"""
Created on Fri Sep 22 13:54:09 2023

@author: LABORATORIO 208
"""

import cv2
import numpy as np 

imagen=cv2.imread("descarga.png")
imagen2=imagen*0.5

imagen2=imagen2.astype(np.uint8)

cv2.imshow("descarga.png", imagen)
cv2.waitKey(0)
cv2.destroyAllWindows()

imagen=cv2.imread("descarga.png")

cv2.imshow("descarga.png", imagen2)
cv2.waitKey(0)
cv2.destroyAllWindows()