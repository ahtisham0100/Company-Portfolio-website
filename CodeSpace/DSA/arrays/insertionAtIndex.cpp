#include  <bits/stdc++.h>
#include <iostream>
using namespace std; 
 void removingAtPosition(vector<int> &a, int value){ 
    int  position= -1;
 for (size_t i = 0; i < a.size(); i++)
 {
    if(a[i]==value){ 
        position =  i;
    }
 }

 vector<int>::iterator it=  a.begin()+position;
 
 if(position==0){ 
    a.erase(a.begin()+1);
 }

if(position!=-1){
    a.erase(it);
}

 }
 



 vector<int> insertAtIndex(vector<int> &a , int index , int value){
     

for (size_t i = a.size(); i>=index; i--){ 
    //shifting the elemets to right 
    a[i]=a[i-1];
a[index]=value;

}

return a;

    }
    


void print(vector<int> a){ 
    
for (int  i = 0; i < a.size(); i++){
cout<<a[i]<<" "; 
 
}

cout<<"\n";
 }


 
int main(){ 

vector<int> temp;
temp.emplace_back(0);
temp.emplace_back(1);
temp.emplace_back(2);
temp.emplace_back(3);
temp.emplace_back(4);
temp.emplace_back(5);
temp.emplace_back(6);
temp.emplace_back(7);
temp.emplace_back(8);
temp.emplace_back(9);
temp.emplace_back(10);
temp = insertAtIndex(temp , 5 , 0);
print(temp);
temp = insertAtIndex(temp , 5 , 0);
print(temp);
temp = insertAtIndex(temp , 5 , 0);
print(temp);
temp = insertAtIndex(temp , 5 , 8);
print(temp); 
 
 removingAtPosition(temp , 0);  
 print(temp);
 
 removingAtPosition(temp , 0);  
 print(temp);
 
 removingAtPosition(temp , 0);  
 print(temp);
// insertAtIndex(temp , 5 , 1);
// insertAtIndex(temp , 5 , 2);
// insertAtIndex(temp , 5 , 0);
// insertAtIndex(temp , 5 , 1);
// insertAtIndex(temp , 5 , 2);
    return 0;
}