#include <bits/stdc++.h>  
//always include this library for using standard template library functions , constructors and classes;
using namespace std;
int main() {
    // Write C++ code here
    cout << "Try programiz.pro \n";

vector<int> v; 
v.push_back(5);
v.emplace_back(2);
v.push_back(5);
v.emplace_back(2);
v.push_back(5);
v.emplace_back(2);
v.push_back(5);
v.emplace_back(2);
v.emplace_back(2);
v.emplace_back(2);
v.emplace_back(2);

//using iterator for printing 
vector<int>::iterator itr = v.begin(); 
cout<<"using iterator value at index 0 of vector is :"<<*itr<<endl;
  
  //using iterator loop
  for(vector<int>::iterator it = v.begin(); it != v.end(); ++it){
    cout << *it << endl;
}

  
  
    return 0;
}