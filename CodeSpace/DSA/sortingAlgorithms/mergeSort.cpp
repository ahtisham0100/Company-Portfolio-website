#include <iostream>
using namespace std;

void merge(int A[], int left, int mid, int right) {
    int n1 = mid - left + 1; // Size of the left subarray
    int n2 = right - mid;    // Size of the right subarray

    // Create temporary arrays
    int leftArr[n1];
    int rightArr[n2];

    // Copy data to temporary arrays
    for (int t = 0; t < n1; t++) {
        leftArr[t] = A[left + t];
    }
    

    for (int l = 0; l < n2; l++) {
        rightArr[l] = A[mid + 1 + l];
    }

    cout << "Merge sort called \n";

    // Merge the temporary arrays
    int i = 0, j = 0, k = left; // k starts from 'left' to merge back into A

    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j]) { // Use <= to maintain stability
            A[k++] = leftArr[i++];
        } else {
            A[k++] = rightArr[j++];
        }
    }

    // Copy any remaining elements of leftArr
    while (i < n1) {
        A[k++] = leftArr[i++];
    }

    // Copy any remaining elements of rightArr
    while (j < n2) {
        A[k++] = rightArr[j++];
    }

    cout << "Merging successful\n";
}

void mergeSort(int arr[], int low, int high) {
    if (low < high) {
        int mid = (low + high) / 2;
        mergeSort(arr, low, mid);
        mergeSort(arr, mid + 1, high);
        merge(arr, low, mid, high);
    }
}

int main() {
    int arr[] = {38, 27,87,55,121,0,20,3,9,82,10,12,43,3,9,27,55, 43, 3, 9, 82, 10};
    int arrSize = sizeof(arr) / sizeof(arr[0]);

    mergeSort(arr, 0, arrSize - 1);

    cout << "Sorted array: ";
    for (int i = 0; i < arrSize; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}
