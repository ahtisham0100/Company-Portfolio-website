#include <iostream>
#include <string>
#include <vector>
using namespace std;

class node {
public:
    char data;
    node* next;
    node() {}
    node(char data) {
        this->data = data;
        this->next = nullptr;
    }
};

class Queue {
    node* front;
    node* rear;

public:
    Queue() {
        front = rear = nullptr;
    }

    void enQueue(char data) {
        node* new_node = new node(data);
        if (this->isEmpty()) {
            front = rear = new_node;
        } else {
            rear->next = new_node;
            rear = new_node;
        }
    }

    char deQueue() {
        if (isEmpty()) {
            cout << "Queue is empty\n";
            return '\0';
        }

        node* temp = front;
        char data = temp->data;
        front = front->next;
        if (!front) {
            rear = nullptr;
        }
        delete temp;
        return data;
    }

    bool isEmpty() {
        return front == nullptr;
    }

    void display() {
        node* temp = front;
        while (temp != nullptr) {
            cout << temp->data << " ";
            temp = temp->next;
        }
        cout << endl;
    }

    void concatenate(Queue& other) {
        if (other.isEmpty()) return;
        if (this->isEmpty()) {
            front = other.front;
            rear = other.rear;
        } else {
            rear->next = other.front;
            rear = other.rear;
        }
        other.front = other.rear = nullptr;
    }
};

int main() {
    string input;
    cout << "Enter a string: ";
    getline(cin, input);

    vector<Queue> queues;

    // Split input into words and create individual queues
    string word;
    for (char c : input) {
        if (c == ' ') {
            if (!word.empty()) {
                Queue q;
                for (char wc : word) {
                    q.enQueue(wc);
                }
                queues.push_back(q);
                word.clear();
            }
        } else {
            word += c;
        }
    }
    // Add the last word
    if (!word.empty()) {
        Queue q;
        for (char wc : word) {
            q.enQueue(wc);
        }
        queues.push_back(q);
    }

    // Display individual queues
    for (size_t i = 0; i < queues.size(); ++i) {
        cout << "Q" << i + 1 << " = ";
        queues[i].display();
    }

    // Concatenate all queues into a single queue
    Queue finalQueue;
    for (auto& q : queues) {
        finalQueue.concatenate(q);
    }

    // Display the concatenated queue
    cout << "Final concatenated queue: ";
    finalQueue.display();

    return 0;
}
