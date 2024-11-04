#include <bits/stdc++.h>
using namespace std; 

/**
 * First in last out || last in first out. 
 *  example : plates are "stacked" on the top of each other 
 *      POP IS REMOVING THE TOP ITEM 
 *      PUSH IS PUSHING TO THE TOP ITEM
 
using the stacks;  
1. when we want to store the data to use it later
2.Back pages onthe web pages are based on the implementation of stack
3. converting the recursion programs into iterative programs. (sir kunal will teach this later)

 */


 class Stack{
private:
vector<int> stack; 

 public:
    Stack(int data ){ 
stack.emplace_back(data);
    };





void push(int data ){ 
    stack.emplace_back(data); 
}
   
   
 int pop(){ 
    int index= stack.size()-1;  

if (index<0)
{
    return -1;
}

    int data= stack[index];  
    vector<int>::iterator  it =  stack.begin()+index;
    stack.erase(it);
    return  data;

 }

void printStack(){ 
    
    
vector<int>::iterator it= stack.end()-1 ;   
 
 while (it != stack.begin()-1)
 {
cout<<*it<<" "; 
--it;
 }
 

}

 };
 


int main(){ 

Stack a=  Stack(15);
a.push(5); 
a.push(10);
a.printStack();

cout<<a.pop();
cout<<a.pop();
cout<<a.pop();
cout<<a.pop();
cout<<a.pop();

a.printStack();
    return 0;
}