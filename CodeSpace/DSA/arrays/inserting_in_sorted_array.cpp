#include <bits/stdc++.h>

using namespace std; 



int search(vector<int> nums, int target ){ 

      
int high = nums.size()-1; 
 int low = 0 ; 


 while(low<=high){
 int mid = (high+low)/2; 

if(nums[mid]==target){
    return mid; 
} else if(nums[mid]<target){
    low = mid+1; 
} else { 
    high=mid-1; 
}   

   


    }
 return -1;

}


 
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

return 0;     
}


