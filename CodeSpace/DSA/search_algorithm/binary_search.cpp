#include  <bits/stdc++.h>
using namespace std; 

int binarysearch(vector<int>  v, int key){ 
int size =v.size();   int mid;
int low= 0;
int high=size-1;
while (low<=high){
mid=(low+high)/2;
if (v[mid]==key){
    return mid;
}   

if (v[mid]>key){
  high=mid-1;
} else {
    low=mid+1;
    }
        }
   return -1;
}

int main(){ 


vector<int>  v = {6  ,13  ,14  ,25  ,33  ,43 , 51 , 53 , 64 , 72 , 84 , 93 , 95 , 96 , 97};

cout<<binarysearch(v ,97);
    return 0;
}