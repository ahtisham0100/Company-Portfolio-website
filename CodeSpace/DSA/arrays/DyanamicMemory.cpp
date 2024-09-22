#include <bits/stdc++.h>
using namespace std ; 
/*
int dymanicMemory(vector<int> &v , int iterations){
//to return old vector and new vector after making deletions in original; 

}
*/
int main(){ 

vector<int> arr= { 0,21,2,3,0};
vector<int>::iterator  it = arr.begin();

while (it!=arr.end())
{
    cout<<*it <<" ";
    /* code */
    it++ ;
}
 

 return 0; 
}