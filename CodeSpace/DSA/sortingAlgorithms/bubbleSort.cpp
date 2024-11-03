#include <bits/stdc++.h>
using namespace std;

struct Node{ 
    int data;
    Node* next;

    Node(int data){
        this->data=data; 
        this->next=nullptr; 
    }
};



void printArray(vector<int> a);
 
 void bubbleSort(vector<int> &a );
 


int listLength(Node* head) { 
    Node* temp = head; 
    int len = 0;
    while (temp != nullptr) {
        temp = temp->next;
        ++len;
    }
    return len;
}

// int listLength(Node* head){ 
//     int len=0; 
// Node* copy=head;

// while (copy!=nullptr){
//     copy= copy->next; 
//     len++;
// }

// return len;

// } ;
 
  void printList(Node* head){ 

Node* temp=head; 
while (temp!=nullptr)
{
    cout<<temp->data<<" "; 
    temp=temp->next;
}

  } ;

 //bubble sort for LinkedList 
  
Node* bubbleSort(Node* head){
 
int len = listLength(head);
cout<<"\nlength inside the sort al is : " <<len<<endl;

Node* current =  head;  
    for(int i= 0;  i<len-1; i++){

        Node* Next= current->next;

int iterations=0;
while (Next!=nullptr && iterations<len-1-i){

if (current->data>Next->data)
{
     int data = current->data; 
     current->data=Next->data; 
     Next->data=data;
}

Next=Next->next;
}

//moving the current to  next;  
current=current->next;
      
        
    }
return head;
}




int main(){ 
vector<int> a=  {9,8,7,5,6,4,2,3,1,0,3,1,4,8,4,2,1,1,0,3};
bubbleSort(a);
printArray(a);

Node* head = new Node(1);
    head->next = new Node(5);
    head->next->next = new Node(2);
    head->next->next->next = new Node(0);
    head->next->next->next->next = new Node(4);
    head->next->next->next->next->next = new Node(10);
        head->next->next->next->next->next->next = new Node(15);
        head->next->next->next->next->next->next->next = new Node(15);
        head->next->next->next->next->next->next->next->next= new Node(0);


    // Calculate the length of the list
    int length = listLength(head);
    
    // Print the length
    std::cout << "\nLength of the list is: " << length << std::endl;
head=bubbleSort(head);
cout<<"\nPrinting the list "<<endl;
printList(head);
    return 0;
} 
 
//bubble sort algorithm 
void bubbleSort(vector<int> &a ){ 
int size= a.size(); 

for (int  i = 0; i < size-1; i++){

 bool sorted=false; //if no swapping occurs during the any pass it means that array is already sorted so break 
 //the loop; 
    for (int j = 0; j <size-1-i ; j++) {
 if (a[j]>a[j+1]){
    int temp = a[j]; 
    a[j]=a[j+1]; 
    a[j+1]= temp; 
sorted=true;
 }
  }  
    
if(!sorted){
    break;
}
    
    }
} 

void printArray(vector<int>  a){
for (int  i = 0; i < a.size(); i++){
cout<<a[i]<<" ";
}  
}