import pandas as pd

#Cargar los datos desde el archivo de Excel
archivo_excel = "SO lista.xlsx"
df=pd.read_excel(archivo_excel, index_col=0) #Primer columna es el indice

#Matriz de adyacencia
matriz_adyacencia=df.to_numpy()

#Lista de los nodos 
nodos=df.index.tolist()

#Todas las relaciones entre todos los elementos
relaciones=[]

for i in range(len(nodos)):
    for j in range(i +1, len(nodos)):
        if matriz_adyacencia[i,j]==1:
            relaciones.append((nodos[1], nodos[j]))
            if matriz_adyacencia[j,i]==1:
                relaciones.append((nodos[j],nodos[i]))
                
print("Todas las relaciones entre todos los elementos:")
for relacion in relaciones:
    print(relacion)