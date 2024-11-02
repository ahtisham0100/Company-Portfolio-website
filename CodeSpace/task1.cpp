#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>
#include <chrono>
#include <algorithm>
using namespace std;

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        swap(arr[i], arr[minIndex]);
    }
}

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

void generateRandomArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        arr[i] = rand() % 100 + 1;
    }
}

void measureSortTime(void (*sortFunc)(int[], int), int arr[], int n) {
    auto start = chrono::high_resolution_clock::now();
    sortFunc(arr, n);
    auto end = chrono::high_resolution_clock::now();
    chrono::duration<double> duration = end - start;
    cout << "Time taken: " << duration.count() << " seconds" << endl;
}

int main() {
    srand(static_cast<unsigned>(time(0)));
    int sizes[] = {100, 1000, 10000, 100000, 1000000};

    for (int size : sizes) {
        cout << "Array size: " << size << endl;

        int* arrRandom = new int[size];
        generateRandomArray(arrRandom, size);

        int* arrAscending = new int[size];
        int* arrDescending = new int[size];
        copy(arrRandom, arrRandom + size, arrAscending);
        sort(arrAscending, arrAscending + size);
        copy(arrAscending, arrAscending + size, arrDescending);
        reverse(arrDescending, arrDescending + size);

        cout << "Bubble Sort on Random: ";
        measureSortTime(bubbleSort, arrRandom, size);

        cout << "Selection Sort on Random: ";
        measureSortTime(selectionSort, arrRandom, size);

        cout << "Insertion Sort on Random: ";
        measureSortTime(insertionSort, arrRandom, size);

        cout << "Bubble Sort on Ascending: ";
        measureSortTime(bubbleSort, arrAscending, size);

        cout << "Selection Sort on Ascending: ";
        measureSortTime(selectionSort, arrAscending, size);

        cout << "Insertion Sort on Ascending: ";
        measureSortTime(insertionSort, arrAscending, size);

        cout << "Bubble Sort on Descending: ";
        measureSortTime(bubbleSort, arrDescending, size);

        cout << "Selection Sort on Descending: ";
        measureSortTime(selectionSort, arrDescending, size);

        cout << "Insertion Sort on Descending: ";
        measureSortTime(insertionSort, arrDescending, size);

        delete[] arrRandom;
        delete[] arrAscending;
        delete[] arrDescending;
        cout << endl;
    }

    return 0;
}
