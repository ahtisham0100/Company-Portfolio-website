#include <bits/stdc++.h> 
#include<iostream>
using namespace std; 
 
class node{  
    public:
    int data; 
    node* next;
    node(){ 

    }
     node(int data){ 
        this->data=data; 
        this->next=nullptr;
     }
  } ;

class Queue{  
   node *front , *rear;

public: 
Queue(){ 
    front =rear = nullptr;
    }
  
  
void enQueue(int data){ 
    
    node* new_node = new  node(data); 
 
 if(this->isEmpty()){ 
    front =rear =  new_node;
 } 
  
rear->next=new_node; 
rear =  new_node;
}



   int Dequeue() {
        
        // Create a new linked list node 
        if(isEmpty()){ 
            cout<<"Queue is empty \n"; 
            return -1;
        } 
         
         //if there is only one element in the list.
        if(front == rear ){ 
node* temp =  front;
front = nullptr; 
rear==nullptr; 
return  temp->data;

        }

        node* temp = front;
        int data =  temp->data;
        front= front->next;
        delete temp;
       return data;
    }
 
 bool  isEmpty(){ 
   
   if (front==nullptr)
   {
    return true; 
   } 

   return false;
   
 }
     


     int getFront(){ 
        if(this->isEmpty()){ 
            cout<<"Empty queue !\n";
       return -1;
        }  
 return front->data;
         
     } 


        int getRear(){ 
        if(this->isEmpty()){ 
            cout<<"Empty queue !\n";
       return -1;
        }  
 return rear->data;
         
     } 


      void display(){ 

node* temp = front; 

while(temp!=nullptr){ 
    cout<<temp->data<<" ";
    temp=temp->next; 
}

      }

};



int main(){ 
 
 Queue a = Queue();
 a.enQueue(1);
 a.enQueue(10);
 a.enQueue(1000);
 a.enQueue(10000);
  a.enQueue(1);
 a.enQueue(10);
 a.enQueue(1000);
 a.enQueue(10000);

 a.Dequeue();
 a.Dequeue();
 a.Dequeue();
 a.Dequeue();

 a.Dequeue();
 a.Dequeue();
 a.Dequeue();
 a.Dequeue();


 a.display();  


 cout<<a.isEmpty();

    return 0; 
}