#include <bits/stdc++.h>
using namespace std;


struct Node
{

int data; 
Node* next; 


Node(int data) { 
    this->data=data; 
    this->next=nullptr;
}
};

void traverse(Node* head) { 
Node* temp = head; 

while (temp!=nullptr)
{
    cout<<temp->data<<" ";
    temp=temp->next;
}

cout<<endl;
}

Node* deletionAtbeginning(Node* head);
Node* deletionAtEnd(Node* head);
 Node* delAtPosition(Node* head , int position);




int main(){ 

Node*  a  =  new Node(1); 
Node* b = new Node(2); 
Node* c = new Node(3); 
Node* d = new Node(4); 
Node* e = new Node(5); 

a->next=b; 
b->next=c; 
c->next=d; 
d->next=e; 

a=delAtPosition(a,6);
cout<<endl;
traverse(a);
// a=deletionAtbeginning(a); 
// traverse(a);
// a=deletionAtEnd(a); 
// traverse(a);   
// a=deletionAtEnd(a); 
// traverse(a);   
// a=deletionAtEnd(a); 
// traverse(a);   
   
   
    return 0;
}   



/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
*
* Functions' definitions are below    *

 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
*/

Node* deletionAtbeginning(Node* head) {

Node* temp= head->next;
head = temp; 
delete temp; 
 cout<<endl;
 return head;
}


/**
 * deletionattheend;
 */
Node* deletionAtEnd(Node* head){ 
    if (head->next==nullptr){
      cout<<"Node of size 1  !" <<endl;
        delete head; 
      return nullptr;
    } 
    if (head==nullptr) { 
    cout<<"Null pointer detected !" <<endl;
      return  nullptr; 
    } 
    
    Node*  secondlast = head; 

    while (secondlast->next->next!=nullptr)
    {
      secondlast=secondlast->next; 
    }

    delete (secondlast->next); 
    secondlast->next=nullptr; 
    return head;
} 
 
  
  Node* delAtPosition(Node* head , int position){ 
    if (position<1)
    {
     cout<<"Invalid position \n ";
     return head;
    }  
     
     if (position==1)
     {
        Node* temp = head; 
        delete temp;
    head=head->next;  
        return head;
     }  
      
        Node* current=head;
       int count=1; 
       while (count<position-1 && current!=nullptr) {
cout<<current->data<<" ";
current=current->next;
  
  count++;

       }  
       if (current==NULL || current->next==nullptr)
       {
        cout<<"\ninvalid positon -> current==NULL || current->next==nullptr\n ";
       return head; 
       }
       
Node*temp= current;
current->next=current->next->next; 
delete temp;
return head;
      
  }