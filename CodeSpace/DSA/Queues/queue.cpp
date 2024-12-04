#include <iostream>
#include <bits/stdc++.h>
using namespace std;

class line
{
  const static int size = 10;
  int Queue[size];
  int front, rear;

public:
  line() : front(-1), rear(-1) {};

  bool isEmpty()
  {
    return (front == -1 && rear == -1 );
  }

  void enque(int data)
  {

    if (isFull())
    {

      cout << "Queue is full ";
    }

    if (isEmpty())
    {
      Queue[++front] = data;
      ++rear;
    }
    else
    {
      Queue[++rear] = data;
    }
  }

  bool isFull()
  {
    return rear == (size - 1);
  }

  int dequeue()
  {

if(front==-1&&rear==-1) { 
  cout<<" Empty queue ! opearation can not be performed !" ; 
  return  -1 ;
} 


    if (front == size - 1 || front>=rear)
    {
      int data = Queue[front];
      front = -1;
      rear = -1;
      cout << "Queue has been emptyed !\n";
      return data;
    }

    return Queue[front++];
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

    for (int i = front; i <= rear; i++)
    {
      cout << Queue[i] << "\n";
    }
  } 
  }
};

int main()
{
  line a = line();
  a.enque(5);
  a.enque(6);
  a.enque(7);
  a.enque(8);
  a.enque(9);

  a.dequeue();
  a.dequeue();
  a.dequeue();
  a.dequeue();
  a.dequeue();
  a.dequeue();
  a.display();

for (int i = 0; i <= 10; i++)
{
  a.enque(i);
}


  return 0;
}
