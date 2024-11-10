#include  <bits/stdc++.h>
using namespace std; 

int recursiveBinarySearch(vector<int> a, int low  , int high , int val){

int  mid = (low + high ) /2;
if(a[mid]==val) {return mid;}  
if (a[mid]>val) {high = mid-1; return recursiveBinarySearch(a , low , high , val);}
if (a[mid]<val) {low= mid+1; return recursiveBinarySearch(a , low , high , val); }

}


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

cout<<binarysearch(v ,14)<<endl;
cout<<recursiveBinarySearch(v ,0 , v.size()-1,14);

    return 0;
}