//implementation of using array means that we can not change its size; 
//such a stack will have fixed size;  
//size can be custom but it should not exceed the maximum defined stack size;  
 
#include <bits/stdc++.h>
using namespace std; 


class arrayStack{ 

int data[10]; 
protected:
int ptr= -1;  //initially points to -1 index of stack; 


public: 
arrayStack(){ 
}
  
     bool isFull(){ 
        return  (ptr==9);

     }
  
   bool  isEmpty(){ 

    return  (ptr==-1);
   }

 public: 
 void push(int value){ 
if (!(isFull()))
{
        data[++ptr] = value; 

}  else { 
    cout<<"stack full operation not performed i.e " << value << " not inserted ptr is  " << ptr << endl; 
}

 }
 

public:  
 int pop(){ 
if (!(isEmpty()))
{
    return (data[ptr--]);

} else
{
    cout<<"Stack is Empty : " ; 
     return -1 ;
}

 }
 
  public: 
 void printStack(){ 
int it=  ptr;  //initialzing the pointer to current ptr value; 
while (it>-1)
{
    cout<<data[it--]<< " ";
}

  }
   
public :  
void printTop(){ 
    if (ptr>=0  && ptr<10)
    {
        cout<<data[ptr]<<" ";
    }
    
 }


};  

 
 int main(){ 

arrayStack a ;  
int count = 8; 

while (count<20)
{
    a.push(count++);
}
 
 a.printStack();
a.push(100);
cout<<a.pop()<< " ";
cout<<a.pop()<< " ";
cout<<a.pop()<< " ";
cout<<a.pop()<< " ";
 
 a.printTop(); a.printTop();
 a.printTop();

    return 0; 
 }
