#include <bits/stdc++.h>
using namespace std; 


/**
 * declaring struct for a linkedlist node 
 */
 
  class eventData{ 
    string name, details; 

    public: 
    eventData(string name , string detail){
        this->details=detail; 
        this->name=name;
    } 
     
     void printData(){ 
        cout<<"Name  : "<<this->name<<"\nEvent title : "<<this->details<<endl;
     } 
      
      string getName(){
     return   this->name;
      }

      string getDetails(){
     return   this->details;
      }


  };

struct Node
{
   eventData data; 
   Node* node;
   /** Constructor of node */
   Node(eventData d):data(d), node(nullptr){ 
    // this->data= data; 
    // this->node=nullptr;
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
 bool search(Node*head , eventData target); 
//lenght of linked list;
int length(Node* head);
//inserting at the begining;
Node*  insertAtBeginning(Node* head , eventData value);
//inserting at the end 
Node* insertAtEnd(Node* head, eventData value ); 
//insering at the specific position;
Node*  insertAtPosition(Node* head , int position, eventData value) ;












int main(){



eventData e1= eventData("event name" , "event 1");
eventData e2= eventData("event name" , "event 2");
eventData e3= eventData("event name" , "event 3");
eventData e4= eventData("event name" , "event 4");

Node* a= new Node(e1);

Node* b =new Node(e2);
a->node=b;   /*assigned the ptr here because b wasnt declared early*/
Node *C  =  new Node(e3); 
b->node = C; 
Node *d = new Node(e4);
C->node=d;

//traversing through singleLinkedList;
trarverse(a);

// //searching through Single LinkedList
cout<<"\nDoes a contain 3 : "<<search(a ,e3)<<endl;

// //length of Single LinkedList
cout<<"Length of event list is :"<<length(a)<<endl;

//inserting at the begining of single LinkedList 
 

a=insertAtBeginning(a , e4); 
a =  insertAtBeginning(a,e3);
a =  insertAtBeginning(a,e2);
 
 cout<<"\n\nAfter inserting at the beginning the list is:\n\n";
trarverse(a);


// //now inserting at the end ; 
a=insertAtEnd(a,e1);
a=insertAtEnd(a,e2);
a=insertAtEnd(a,e3);

 cout<<"\n\nAfter inserting at the end the list is:\n\n";
trarverse(a);

//inserting a specific position
a = insertAtPosition(a,4,e1);
a = insertAtPosition(a,4,e1);
a = insertAtPosition(a,4,e1);


 cout<<"\n\nAfter inserting at the specific postion of the list is:\n\n";
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
current->data.printData(); 
current=current->node;
   }
   } 
/**Traversing functione ended  */

bool search(Node* head ,eventData target){ 
cout<<"searching !"<<endl;
Node* current =  head; 

while(current!=nullptr){
    if (current->data.getName()==target.getName() && current->data.getDetails()==target.getDetails())
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
  
Node*  insertAtBeginning(Node* head , eventData value){ 

Node* newNode = new Node(value);
newNode->node=head; 
head=newNode;

    return head; 
  }



// //inserting at the end of Single LinkedList; 

  Node* insertAtEnd(Node* head, eventData value ){  
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
   

// /**
//  * 
//  * inserting at the specific position  
//  * 
//  * ***logic: 
//  * for nth position iteration till n-1 and link n-1.th node to new nodes' address and new nodes' address to n-1 . next
//  * node adreess 
//  * 
//  *  */     


Node*  insertAtPosition(Node* head , int position, eventData value) { 

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
