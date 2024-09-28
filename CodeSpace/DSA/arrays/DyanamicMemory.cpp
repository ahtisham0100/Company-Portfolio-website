#include <bits/stdc++.h>
#include <vector>
using namespace std ; 

int dymanicMemory(vector<int> &v , int iterations){
//to return old vector and new vector after making deletions in original; 
//making a copy of v; 

  
for ( int i = 0; i < v.size()-1; i++)
{
    cout<<v[i];
    v.erase(i);

}


}

int main(){ 

vector<int> arr= { 0,21,2,3,0};
vector<int>::iterator  it = arr.begin();

while (it!=arr.end())
{
    cout<<*it <<" ";
    it++ ;
}
 

 return 0; 
}