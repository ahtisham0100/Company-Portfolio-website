#ifndef DYNAMIC_STACK_H 
#define DYNAMIC_STACK_H

#include "arrayStack.h"
#include <bits/stdc++.h> 
 
  
  class  dynammicStack : public arrayStack { 
      
vector<int> stack;
 void  clear(){ 
  if(!isEmpty()){ 
 for (int i = 0; i <=ptr; i++)
 {
 data[i]=0; 
  }
 
   }
 }
         

 //ovverriding the push function based on the size of the array stack  
 //if stack is full we double the size of the array stack;  

 void push(int value) { 
 
 if (isFull())
 {

 }
 
  

 }


  }; 
  
   
#endif 
  