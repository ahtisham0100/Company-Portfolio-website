#include <bits/stdc++.h>
using namespace std; 



class Eventdata { 
    string name,title ; 
public: 
Eventdata(string name , string title){
    this->name=name; 
    this->title=title;
}

 
public:
void printEventDetails(){ 
cout<<"Event Name: " << this->name<<"\nEvent Title : "<<this->title<<endl;
  }

};


// Class to represent a single-day event (could be a node in a linked list)
class SingleDayEvent {
    Eventdata data;
    SingleDayEvent* next; // Pointer to the next event (for linked list structure)
    


public:
    // Constructor to initialize SingleDayEvent with Eventdata
    SingleDayEvent(Eventdata det) : data(det), next(nullptr) {}

    

    // Function to print the event data (calls the Eventdata class function)
    void printSingleDayEvent() {
        data.printEventDetails();
    } 
     
public:
     void setNext(SingleDayEvent* e){
        this->next=e;
     }
};


//  class SingleDayEvent{
// Eventdata data;
// SingleDayEvent* node;
// public:
//  SingleDayEvent(Eventdata det){

// this->data=det;
// this->node=nullptr;

// }

// };



  

int main(){ 
    
Eventdata e1 =  Eventdata("welcome" , "Freshies welcome");
Eventdata e2 =  Eventdata("welcome" , "Freshies welcome");
Eventdata e3 =  Eventdata("welcome" , "Freshies welcome");

e1.printEventDetails();
    return 0;
}