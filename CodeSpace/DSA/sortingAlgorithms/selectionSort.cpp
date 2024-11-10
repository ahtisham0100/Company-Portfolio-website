#include <bits/stdc++.h>
using namespace std; 
void printArray(vector<int>  a); 
void selectionSort(vector<int> &a){  
    int size= a.size();
    
     for (int i = 0; i < size -1; i++){ 
        bool swap=0;
        for (int j =i+1 ; j < size; j++){
            if(a[j]<a[i]){
int temp= a[i]; 
a[i]=a[j]; 
a[j]=temp;
    swap=1;        }
        }
      if (!swap)
      {
        cout<<"loop broke at iteration number " <<  i+1<<endl;
        
break;
      }
        
     }
     
}

int main(){ 
    vector<int> a=  {9,8,7,5,6,4,2,3,1,0,3,1,4,8,4,2,1,1,0,3};
selectionSort(a);
printArray(a);
    return 0;
} 


void printArray(vector<int>  a){
for (int  i = 0; i < a.size(); i++){
cout<<a[i]<<" ";
}  
}