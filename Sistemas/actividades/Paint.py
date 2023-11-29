# -*- coding: utf-8 -*-
"""
Created on Wed Nov 29 14:02:59 2023

@author: LABORATORIO 208
"""

import tkinter as tk
from tkinter import colorchooser, simpledialog

class PaintApp:

    def __init__(self, root):

        self.root = root
        self.root.title("Paint App")

        self.canvas = tk.Canvas(root, bg="white", width=800, height=600)
        self.canvas.pack(expand=tk.YES, fill=tk.BOTH)

        self.brush_color = "black"
        self.brush_size = 2

        self.setup_menu()

        self.canvas.bind("<B1-Motion>", self.paint)
        self.canvas.bind("<ButtonRelease-1>", self.reset)

    def setup_menu(self):
        menu = tk.Menu(self.root)
        self.root.config(menu=menu)

        file_menu = tk.Menu(menu, tearoff=0)
        menu.add_cascade(label="File", menu=file_menu)
        file_menu.add_command(label="Exit", command=self.root.destroy)

        brush_menu = tk.Menu(menu, tearoff=0)
        menu.add_cascade(label="Brush", menu=brush_menu)
        brush_menu.add_command(label="Size", command=self.change_brush_size)
        brush_menu.add_command(label="Color", command=self.change_brush_color)

    def paint(self, event):
        x1, y1 = (event.x - 1), (event.y - 1)
        x2, y2 = (event.x + 1), (event.y + 1)
        self.canvas.create_oval(x1, y1, x2, y2, fill=self.brush_color, width=self.brush_size)

    def reset(self, event):
        x, y = event.x, event.y
        self.canvas.create_oval(x, y, x + 1, y + 1, fill=self.brush_color, width=self.brush_size)

    def change_brush_size(self):
        size = simpledialog.askinteger("Brush Size", "Enter brush size:", parent=self.root)
        if size:
            self.brush_size = size

    def change_brush_color(self):
        color = colorchooser.askcolor(initialcolor=self.brush_color, title="Select Color")
        if color[1]:
            self.brush_color = color[1]


if __name__ == "__main__":
    root = tk.Tk()
    app = PaintApp(root)
    root.mainloop()