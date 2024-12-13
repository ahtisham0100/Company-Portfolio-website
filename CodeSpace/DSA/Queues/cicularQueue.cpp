#include <iostream>
#include <bits/stdc++.h>
using namespace std;

class line
{
  const static int size = 10;
  int Queue[size];
  int front, rear;
  int counter;

public:
  line() : front(0), rear(-1) , counter(0){};

 



  void enque(int data)
  {
 //check if queue is full
    if (isFull())
    {
      cout << "Queue is full !\n "; 
    return;
    }  else { 

rear  = (rear+1)%size;
Queue[rear]=data; 
counter++; 
    }

  }


 bool isEmpty()
  {
    return (front==counter == 0 && rear == -1 );
  }


  bool isFull()
  {
    return (counter>=size);
  }

  int dequeue()
  {

if(front==-1) { 
  cout<<" Empty queue! opearation can not be performed !" ; 
  return  -1 ;
} else { 

int data =  Queue[front];

if(front==rear) front=rear = -1;  //only one element in queue;
else front = (front+1)%size;

counter--;
    return  data;
} 
 

    

  }

  int peak()
  {
    return Queue[front];
  }

  int Pop()
  {
    // retrn last element only;
    return Queue[line::rear];
  }

  void display()
  { 
     if(isEmpty()) { 
      cout<< "Empty list ! \n";
      
     } else {

    for (int i = 0; i < counter; i++)
    {
     cout<<Queue[i]<<endl;

    }
  } 
  }
};

int main()
{
  line a = line();

for (int i = 0; i < 15; i++)
{  
    a.enque(i);
}


std::cout<< "\nfront: "<<a.peak() << " \n pop : " <<a.Pop() << "\nis empty : " << a.isEmpty() << "\nIsFull :"<<a.isFull()<<"\n";  
a.display(); 


  return 0;
}
