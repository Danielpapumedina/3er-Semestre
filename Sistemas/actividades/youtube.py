# -*- coding: utf-8 -*-
"""
Created on Wed Oct  4 14:23:36 2023

@author: LABORATORIO 208
"""

from pytube import YouTube
import webbrowser

video_url = input("video URL:")

yt = YouTube (video_url)

webbrowser.open(video_url)
