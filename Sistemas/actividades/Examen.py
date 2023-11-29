# -*- coding: utf-8 -*-
"""
Created on Wed Oct 11 13:09:10 2023

@author: LABORATORIO 208
"""
from multiprocessing import Process, Condition
import time
import tkinter as tk
from PIL import Image, ImageTk
import os
import threading

image_folder = "C:/Users/LABORATORIO 208/Pictures/Screenshots"
image_files = os.listdir(image_folder)
image_index = 0
image_lock = threading.Lock()
image_semaphore = threading.Semaphore(1)
image_condition = threading.Condition()

def task():
    with image_condition:
        print("Enviando notificacion")
        time.sleep(4)
        condition.notify()
    print("Finalizado notificacion")
    time.sleep(3)
    print("Fin del proceso hijo")

if __name__ == '__main__':
    condition = Condition()
    p = Process(target=task, args=(condition,))
    p.start()
    with image_condition:
        image_condition.wait()
    print("Fin Proceso principal")

def show_image():
    global image_index
    with image_semaphore:
        with image_lock:
            if image_index >= len(image_files):
                image_index = 0

            image_path = os.path.join(image_folder, image_files[image_index])
            img = Image.open(image_path)
            img.thumbnail((400, 400))
            photo = ImageTk.PhotoImage(img)

            label.config(image=photo)
            label.image = photo

            image_index += 1
            root.after(2000, show_image)
            
root = tk.Tk()
root.title("Galería de Imágenes")

# Crear una etiqueta para mostrar las imágenes
label = tk.Label(root)
label.pack()

# Iniciar la función para mostrar imágenes en un hilo
image_thread = threading.Thread(target=show_image)
image_thread.daemon = True
image_thread.start()

# Función para cerrar la ventana
def close_window():
    root.destroy()

# Botón para cerrar la ventana
close_button = tk.Button(root, text="Cerrar", command=close_window)
close_button.pack()

# Iniciar la aplicación
root.mainloop()