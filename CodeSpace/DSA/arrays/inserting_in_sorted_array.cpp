#include <bits/stdc++.h>

using namespace std; 


int searchInsert(vector<int>& nums, int target) {

int start=0;
int end = nums.size()-1; 
int mid ;
while(start<=end){
    mid = (start+end)/2; 
    if(nums[mid]==target){
        return mid;
    } else if(nums[mid]<target){
start=  mid+1; 
    } else { 
     end = mid-1;    
    }
} 
  return (start) ; }

 
 int main(){ 

vector<int> v; 
for (size_t i = 0; i < 100; i++)
{
    if (i%2!=0)
    {
 
 v.emplace_back(i);       
    } 
}   
    for( vector<int>::iterator it= v.begin(); it!=v.end()-1 ; it++  ) { 

        cout << *it <<" ";
    } 

 cout<< "\n"<< searchInsert(v ,37)<< " " << endl;  
 cout<< searchInsert(v ,38)<< " " << endl;
 cout<< searchInsert(v ,67)<< " " << endl; 
 cout<< searchInsert(v ,68)<< " " << endl; 
  
 
return 0;     
}


