#include <iostream>
#include <queue>
using namespace std;

void displayQueue(queue<int> q) {
    if (q.empty()) {
        cout << "Queue is empty." << endl;
        return;
    }

    cout << "Queue elements: ";
    while (!q.empty()) {
        cout << q.front() << " ";
        q.pop();
    }
    cout << endl;
}

int main() {
    queue<int> q;
    int choice, value;

    do {
        cout << "\nQueue Operations Menu:" << endl;
        cout << "1. Enqueue (Insert)" << endl;
        cout << "2. Dequeue (Remove)" << endl;
        cout << "3. Display Queue" << endl;
        cout << "4. Exit" << endl;
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice) {
            case 1:
                cout << "Enter the value to enqueue: ";
                cin >> value;
                q.push(value);
                cout << value << " has been added to the queue." << endl;
                break;

            case 2:
                if (q.empty()) {
                    cout << "Queue is empty. Cannot dequeue." << endl;
                } else {
                    cout << q.front() << " has been removed from the queue." << endl;
                    q.pop();
                }
                break;

            case 3:
                displayQueue(q);
                break;

            case 4:
                cout << "Exiting the program." << endl;
                break;

            default:
                cout << "Invalid choice. Please try again." << endl;
        }
    } while (choice != 4);

    return 0;
}
