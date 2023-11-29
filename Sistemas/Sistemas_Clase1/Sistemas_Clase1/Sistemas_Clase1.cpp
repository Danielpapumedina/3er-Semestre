// Sistemas_Clase1.cpp : Este archivo contiene la función "main". La ejecución del programa comienza y termina ahí.
//Daniel Medina 

#include <iostream>
#include <vector>
using namespace std;


int main()
{
    int targetN;
    cout << " Ingrese un numero ";
    cin >> targetN;

    vector<int>arreglo = { 0, 1, 2, 3, 4, 5, 6 };
    int n = arreglo.size();
    bool found = false;

    cout << "Indices que sumados dan como resultado" << targetN << ":" << std::endl;

    for (int i = 0; i < n; ++i) {
        for (int j = i + 1; j < n; ++j) {
            if (arreglo[i] + arreglo[j] == targetN) {
                cout << i << " y " << j << std::endl;
                found = true;
            }
        }
    }
    if (!found) {
        cout << "No se encontraron indices que sumandose de como resultado" << targetN << endl;

    }
    return 0;
}
