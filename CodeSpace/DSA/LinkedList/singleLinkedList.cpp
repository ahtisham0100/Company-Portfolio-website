#include <bits/stdc++.h>
using namespace std; 


/**
 * declaring struct for a linkedlist node 
 */

struct Node
{
   int data; 
   Node* node;
   /** Constructor of node */
   Node(int data ){ 
    this->data= data; 
    this->node=nullptr;
   }
};


/***
 * 
 * 
 * 
 * functions are declared below definations are at the end;
 * 
 *
 */


//traverse through linked list;
void trarverse(Node* a );
 //searchig in linked list; 
 bool search(Node*head , int target); 
//lenght of linked list;
int length(Node* head);
//inserting at the begining;
Node*  insertAtBeginning(Node* head , int value);
//inserting at the end 
Node* insertAtEnd(Node* head, int value ); 
//insering at the specific position;
Node*  insertAtPosition(Node* head , int position, int value) ;












int main(){


Node* a= new Node(2);

Node* b =new Node(3);
a->node=b;   /*assigned the ptr here because b wasnt declared early*/
Node *C  =  new Node(6); 
b->node = C; 
Node *d = new Node(10);
C->node=d;

//traversing through singleLinkedList;
trarverse(C);

//searching through Single LinkedList
cout<<"\nDoes a contain 3 : "<<search(a , 30)<<endl;

//length of Single LinkedList
cout<<length(a)<<endl;

//inserting at the begining of single LinkedList 
 

a=insertAtBeginning(a , 200); 
a =  insertAtBeginning(a,300);
a =  insertAtBeginning(a,500);
a =  insertAtBeginning(a,400);
a =  insertAtBeginning(a,500);

//now inserting at the end ; 
a=insertAtEnd(a,3);
a=insertAtEnd(a,4);
a=insertAtEnd(a,5);

 trarverse(a);   //to print the linked list ; 
cout<<endl;
a = insertAtPosition(a,1,6);
trarverse(a);  
a=insertAtPosition(a,2,7);
trarverse(a);
a=insertAtPosition(a,3,8);
trarverse(a);
a=insertAtPosition(a,4,9);
trarverse(a);
a=insertAtPosition(a,17,12135234);
trarverse(a);


    return 0;
}



















/**
 * 
 *                              Functions are Defined Below; 
 **/
/*Traversing through LinkedList*/

   void trarverse(Node* a){
   Node* current = a;

   /*Traverse Function*/ 
   while(current != nullptr){
cout<<current->data << " " ; 

current=current->node;
   }
   } 
/**Traversing functione ended  */

bool search(Node* head , int target){ 
cout<<"searching !"<<endl;
Node* current =  head; 

while(current!=nullptr){
    if (current->data==target)
    {
        cout<<"target found!"<<endl;
       return true;
    }
    current=current->node;

}
return false;
}
 
//findint the length of linked List
 int length(Node* head){

Node* current = head; 
int count=0;
while (current!=nullptr)
{
    count++;
    current = current->node;
}

return count;
 } 



 //inserting at the beginning of LinkedList;
  
Node*  insertAtBeginning(Node* head , int value){ 

Node* newNode = new Node(value);
newNode->node=head; 
head=newNode;

    return head; 
  }



//inserting at the end of Single LinkedList; 

  Node* insertAtEnd(Node* head, int value ){  
cout<<"inserting at the end \n" ;
//create the new node ; 
Node*  newNode  = new Node(value); 

//base case if head = null ; 
if (head==nullptr)
{
    return newNode;
}else {

//traverse through the list at the end of list the lastNode must have a null ptr
//assing to that null ptr the newNode; 

Node* current= head; 

//traversing 
while (current->node!=nullptr)
{
    current=current->node; 
}

//now current is at the last node address; 
current->node =newNode; 
cout<<"Insertion at the end is successful \n";


  } 
  return head; 
  } 
   

/**
 * 
 * inserting at the specific position  
 * 
 * ***logic: 
 * for nth position iteration till n-1 and link n-1.th node to new nodes' address and new nodes' address to n-1 . next
 * node adreess 
 * 
 *  */     


Node*  insertAtPosition(Node* head , int position, int value) { 

//if position is less than 1; 
if (position<1){
cout<<"invalid position please enter correct value"<<endl; 
return head;  
}
//creating a node to be inserted and a node to keep track of current node for iteration; 
Node* temp = new Node(value); 
Node* current =  head;

//if position =  1  we have to insert at the begining ; 
if (position==1)
{
    cout<<"inserting at the begining \n";
temp->node=head; 
cout<<"insertion at the beginging seccussfull \n";
return temp;
} 

if (position>1){
cout<<"\ninsertion at specific position \n";

int count = 1 ; //to keep track of position for iterations till position-1;
while (count<position-1 && current->node!=nullptr){
current=current->node ;
count++;
}
 
 if (current->node==nullptr)   //case for inserting at the end;
 {
current->node=temp;
return head; 
 } else  { 
    temp->node=current->node;  //points to the next of current 
current->node=temp;     //current node 

return head; 
 }
  

 

}


}
