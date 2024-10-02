#include <bits/stdc++.h>
using namespace std; 


struct Node{
int data; 
Node* prev; 
Node* next; 

Node(int data){ 
    this->data= data;
    this->next=nullptr; 
    this->prev=nullptr;

    }
};
 

 /**
  * Traversing in doubly liked list
  */ 
  
void traverse(Node*  head){
if (head->next==nullptr)
{
  cout<<head->data<<endl;
} 
else {    
 Node* current = head;

while (current!=NULL){
cout<<current->data<<" " ;
current= current->next;
}

cout<<" \n";
}

}

Node* insertion(Node* head , int data){

}


int main(){
Node*  head=  new Node(1); 
Node*  second  =  new Node(2);
Node* third  =  new Node(3);
Node*  forth  =  new Node(4);
Node*  fifth  =  new Node(5);
head->next= second; 
second->prev =head; 
second->next =third; 
third->prev= second; 
third->next=forth; 
forth->prev=second; 
// cout<<head->data<<" " ;  ; 
 
traverse(head);
    return 0;
}