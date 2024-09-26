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

void trarverse(Node* a );
 
 bool search(Node*head , int target); 

int length(Node* head);

Node*  insertAtBeginning(Node* head , int value);

Node* insertAtEnd(Node* head, int value ); 



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