#include  <bits/stdc++.h>
using namespace std; 

int binarysearch(vector<string>  v, string key){ 
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

vector<string> names = {
    "Ahtisham",
    "barah",
    "csman",
    "dmna",
    "eilal",
    "fatima",
    "jamza",
    "hana",
    "ili",
    "Zara"
}; 
 
//  for (size_t i = 0; names.size()-1 < count; i++)
//  {
//     if (/* condition */)
//     {
//         /* code */
//     }
    
//  }
 

// for (size_t i = 0; i < 10; i++){
//     cout<<"Enter the name : "; 
//     string name; 
//     cin>>name;
// names.emplace_back(name);
// }


// vector<int>  v = {6  ,13  ,14  ,25  ,33  ,43 , 51 , 53 , 64 , 72 , 84 , 93 , 95 , 96 , 97};

cout<<binarysearch(names ,"zarah");
    return 0;
}