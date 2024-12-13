#include <iostream>
#include <string>
using namespace std;

class PrintJob {
public:
    string name;
    int priority;
    int order;
    PrintJob* next;

    PrintJob(string name, int priority, int order) {
        this->name = name;
        this->priority = priority;
        this->order = order;
        this->next = nullptr;
    }
};

class CustomQueue {
private:
    PrintJob* front;
    PrintJob* rear;

public:
    CustomQueue() {
        front = rear = nullptr;
    }

    void enQueue(string name, int priority, int order) {
        PrintJob* newJob = new PrintJob(name, priority, order);
        if (isEmpty()) {
            front = rear = newJob;
            return;
        }

        // Insert based on priority
        if (front->priority > priority || (front->priority == priority && front->order > order)) {
            newJob->next = front;
            front = newJob;
            return;
        }

        PrintJob* current = front;
        while (current->next && (current->next->priority < priority || (current->next->priority == priority && current->next->order <= order))) {
            current = current->next;
        }

        newJob->next = current->next;
        current->next = newJob;
        if (current == rear) {
            rear = newJob;
        }
    }

    PrintJob* deQueue() {
        if (isEmpty()) {
            cout << "No jobs in the queue.\n";
            return nullptr;
        }

        PrintJob* temp = front;
        front = front->next;
        if (!front) {
            rear = nullptr;
        }
        return temp;
    }

    bool isEmpty() {
        return front == nullptr;
    }

    void display() {
        if (isEmpty()) {
            cout << "No pending jobs.\n";
            return;
        }

        PrintJob* current = front;
        cout << "Pending jobs:\n";
        while (current) {
            cout << "Job Name: " << current->name << ", Priority: " << current->priority << "\n";
            current = current->next;
        }
    }
};

int main() {
    CustomQueue printerQueue;
    int jobCount = 0; // To maintain order of job arrival

    // Menu-driven interface
    while (true) {
        cout << "\nPrinter Queue Management:\n";
        cout << "1. Add Job\n";
        cout << "2. Process Job\n";
        cout << "3. Display Jobs\n";
        cout << "4. Exit\n";
        cout << "Enter your choice: ";

        int choice;
        cin >> choice;

        switch (choice) {
            case 1: {
                string jobName;
                int priority;
                cout << "Enter job name: ";
                cin >> jobName;
                cout << "Enter priority (1=High, 2=Medium, 3=Low): ";
                cin >> priority;
                printerQueue.enQueue(jobName, priority, jobCount++);
                cout << "Job added successfully.\n";
                break;
            }
            case 2: {
                PrintJob* job = printerQueue.deQueue();
                if (job) {
                    cout << "Job: " << job->name << " (Priority: " << job->priority << ")\n";
                    delete job;
                }
                break;
            }
            case 3: {
                printerQueue.display();
                break;
            }
            case 4:
                cout << "Exiting...\n";
                return 0;
            default:
                cout << "Invalid choice. Please try again.\n";
        }
    }
}
