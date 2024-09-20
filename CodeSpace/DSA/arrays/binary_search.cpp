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

 int main() { 

 vector<int>  v= {1,2,3,4,5,6,7,8,9,10,11,80}; 
 
 cout<<search(v,80)<<endl;
 }