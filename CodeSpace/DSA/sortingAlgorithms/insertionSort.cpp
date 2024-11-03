// Online C++ compiler to run C++ program online
#include <iostream>
#include <bits/stdc++.h>
using namespace std; 
 
 void print(vector<int> a){
     for(int i = 0;  i<a.size();  i++){
         cout<<a[i]<<" ";
     }
     cout<<"\n";
 }
 
 
 //in insertion sort we select an element and place it at its position .
void insertionSort(vector<int> &a){  
    
    
    int size = a.size();  
//we suppose that first element is sorted so we start the loop from 1; 

    for(int i=1; i<size; i++){
        //take the current element as key; 
        cout<<"pass number " << i <<"  :   ";

        int key=a[i]; 
        int  j= i-1;
        while(j>=0 && a[j]>key){ 
            a[j+1]=a[j];
            --j;
        }
        //when the loop breaks we are at the required position  so we insert the key here 
                            //   print(a);

         a[j+1]=key; 
         print(a);

    }
    
}


int main() {
vector<int> a = {9,5,4,3,2,1};
insertionSort(a); 
print(a);
    return 0;
}