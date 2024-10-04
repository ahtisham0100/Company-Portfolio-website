#include  <bits/stdc++.h>
using namespace std; 

int linearSearch(int v[] , int key , int size) { 
int count=0;
while (v[count]!=key){
if (v[size]==v[count]){
count = -1;
break;
}

count++;
}


return count;
}
int main(){ 

int size= 10;
int arr[10] =  {1,5,6,20,12,20,56,80,20,11};

cout<<linearSearch(arr, 120 , 10)<<"\n";

    return 0;
}