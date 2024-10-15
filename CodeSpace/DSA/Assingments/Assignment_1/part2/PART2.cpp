#include <bits/stdc++.h>
using namespace std; 

class event
{
private:
string title , date; 


public:
    event(string title, string date){
        this->title=title;
        this->date=date;
    };
     
    string getTitle(){
        return this->title;
     } 
      
       void printDetails(){ 
        cout<<"Name: "<<this->title<<"\nDate:"<<this->date<<"\n";
       }

};

struct node{
   node* next;
   node* prev; 
    event evt;
   
//constructor;
   node (event e):evt(e), next(nullptr) ,prev(nullptr) {};

void setNext(node*  n){
    this->next=n;
}
void setPrev(node*  n){
    this->prev=n;
}


void traverseForward(){
    node*  temp = this;
    while (temp!=NULL)
    {
        temp->evt.printDetails();
        temp=temp->next;
    }
}

void traverseBackward(){ 
        node* temp =this;
while (temp!=NULL)
{
    temp->evt.printDetails();
    temp=temp->prev;
}
   }



node* removeEvent(event e){

node*  current= this;

while (current!=NULL)
{
    if (current->evt.getTitle()==e.getTitle())
    {
       break;
    }
    current=current->next;
}

if (current==NULL)
{
    cout<<"Given event in not is the list \n";
}

node* temp=current->next;
current->prev->next=temp;
current->next->prev=temp;
current=current->next->next;
 delete temp;
 
 return this;   
}


};


int main(){

event a= event("event1", "12.1.2000");
event b= event("event2", "1.1.2011");
event c= event("event3", "11.2.2012");
event d= event("event4", "1.1.2023");

/*assinging the pointers*/
 node n1 = node(a); 
 node n2 = node(b); 
 node n3 = node(c); 
 node n4 = node(d); 

n1.setNext(&n2);
n2.setNext(&n3);
n3.setNext(&n4);

n2.setPrev(&n1);
n3.setPrev(&n2);
n4.setPrev(&n3);


// n1.evt.printDetails();
// n1.next->next->evt.printDetails();

// n1.traverseForward();
// n1.traverseBackward();

//removing the title 
n1.removeEvent(b);
n1.traverseForward();

    return  0; 
}